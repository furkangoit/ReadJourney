import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecommendedBooks, addFromRecommended } from '../redux/books/operations';
import { selectRecommendedBooks } from '../redux/books/selectors';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../pages/Dashboard.module.css';

const RecommendedBooks = () => {
    const dispatch = useDispatch();
    const recommendedData = useSelector(selectRecommendedBooks);
    // Assuming recommendedData structure based on typical Paginated responses: { results: [], totalPages: 10, page: 1, ... }

    const [page, setPage] = useState(1);
    const limit = 4;

    useEffect(() => {
        dispatch(fetchRecommendedBooks({ page, limit }));
    }, [dispatch, page]);

    const handleAddToLibrary = (id) => {
        dispatch(addFromRecommended(id))
            .unwrap()
            .then(() => toast.success('Book added to library'))
            .catch(() => toast.error('Failed to add book'));
    };

    const books = recommendedData.results || (Array.isArray(recommendedData) ? recommendedData : []);

    return (
        <div style={{ marginTop: '4rem', marginBottom: '2rem' }}>
            <div className={styles.header} style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)' }}>
                    Recommended for you
                </h2>
                <div className={styles.controls} style={{ gap: '0.5rem' }}>
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className={styles.secondaryBtn}
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', opacity: page === 1 ? 0.5 : 1 }}
                    >
                        ← Prev
                    </button>
                    <span style={{ color: 'var(--text-muted)', alignSelf: 'center', fontSize: '0.9rem' }}>Page {page}</span>
                    <button
                        onClick={() => setPage(p => p + 1)}
                        disabled={books.length < limit}
                        className={styles.secondaryBtn}
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', opacity: books.length < limit ? 0.5 : 1 }}
                    >
                        Next →
                    </button>
                </div>
            </div>

            <motion.div
                layout
                className={styles.grid}
            >
                <AnimatePresence mode='wait'>
                    {books.map((book) => (
                        <motion.div
                            key={book._id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            className={styles.card}
                        >
                            <div>
                                <h3 className={styles.bookTitle} title={book.title}>{book.title.length > 25 ? book.title.substring(0, 25) + '...' : book.title}</h3>
                                <p className={styles.bookAuthor}>{book.author}</p>
                            </div>

                            <div className={styles.cardFooter}>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleAddToLibrary(book._id)}
                                    className={styles.actionBtn}
                                    style={{ width: '100%', backgroundColor: 'var(--color-white)', color: 'var(--color-black)' }}
                                >
                                    Add to Library
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default RecommendedBooks;
