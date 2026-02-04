import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../redux/auth/operations';
import { fetchUserBooks, removeBook } from '../redux/books/operations';
import { selectBooks, selectIsBooksLoading } from '../redux/books/selectors';
import { toast } from 'react-toastify';
import AddBookModal from '../components/AddBookModal';
import ReadingModal from '../components/ReadingModal';
import RecommendedBooks from '../components/RecommendedBooks';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Dashboard.module.css';
import { RiDeleteBin6Line } from 'react-icons/ri'; // Assumed installed, if not we fallback

const FILTER_TABS = [
    { id: 'all', label: 'All Books' },
    { id: 'unread', label: 'Unread' },
    { id: 'in-progress', label: 'In progress' },
    { id: 'done', label: 'Done' }
];

const DashboardPage = () => {
    const dispatch = useDispatch();
    const books = useSelector(selectBooks);
    const isLoading = useSelector(selectIsBooksLoading);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        dispatch(fetchUserBooks());
    }, [dispatch]);

    const filteredBooks = useMemo(() => {
        if (filter === 'all') return books;
        return books.filter(book => book.status === filter);
    }, [books, filter]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you delete this book?')) {
            dispatch(removeBook(id))
                .unwrap()
                .then(() => toast.success('Book deleted'))
                .catch(() => toast.error('Delete failed'));
        }
    };

    const handleReadingAction = (book) => {
        setSelectedBook(book);
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.logo}>
                    📚 READ JOURNEY
                </div>
                <div className={styles.controls}>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsAddModalOpen(true)}
                        className={styles.primaryBtn}
                    >
                        Add Book
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => dispatch(logOut())}
                        className={styles.secondaryBtn}
                    >
                        Log Out
                    </motion.button>
                </div>
            </header>

            {/* Tabs */}
            <div className={styles.tabs}>
                {FILTER_TABS.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setFilter(tab.id)}
                        className={`${styles.tab} ${filter === tab.id ? styles.tabActive : ''}`}
                    >
                        {tab.label}
                        {filter === tab.id && (
                            <motion.div
                                layoutId="activeTab"
                                className={styles.activeLine}
                            />
                        )}
                    </button>
                ))}
            </div>

            {isLoading && <p style={{ color: 'var(--text-muted)' }}>Loading books...</p>}

            {!isLoading && filteredBooks.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ textAlign: 'center', padding: '4rem 0', color: '#666' }}
                >
                    <p>No books found in this category.</p>
                </motion.div>
            )}

            <motion.div
                layout
                className={styles.grid}
            >
                <AnimatePresence>
                    {filteredBooks.map((book) => (
                        <motion.div
                            layout
                            key={book._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className={styles.card}
                        >
                            <div>
                                <div className={styles.cardHeader}>
                                    <h3 className={styles.bookTitle} title={book.title}>{book.title.length > 30 ? book.title.substring(0, 30) + '...' : book.title}</h3>
                                    <span className={`${styles.statusBadge} ${book.status === 'done' ? styles.statusDone : book.status === 'in-progress' ? styles.statusProgress : styles.statusUnread}`}>
                                        {book.status === 'unread' ? 'UNREAD' : book.status === 'in-progress' ? 'IN PROGRESS' : 'DONE'}
                                    </span>
                                </div>
                                <p className={styles.bookAuthor}>{book.author}</p>
                            </div>

                            <div className={styles.cardFooter}>
                                <span className={styles.pages}>{book.totalPages} pages</span>
                                <div className={styles.actions}>
                                    {book.status !== 'done' && (
                                        <button
                                            onClick={() => handleReadingAction(book)}
                                            className={styles.actionBtn}
                                        >
                                            {book.status === 'unread' ? 'Start Reading' : 'Finish Reading'}
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(book._id)}
                                        className={styles.deleteBtn}
                                        title="Delete"
                                    >
                                        🗑
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            <RecommendedBooks />

            {isAddModalOpen && <AddBookModal onClose={() => setIsAddModalOpen(false)} />}
            {selectedBook && <ReadingModal book={selectedBook} onClose={() => setSelectedBook(null)} />}
        </div>
    );
};

export default DashboardPage;
