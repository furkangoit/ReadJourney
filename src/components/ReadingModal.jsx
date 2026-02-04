import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { startReading, finishReading } from '../redux/books/operations';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
};

const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 }
};

const ReadingModal = ({ book, onClose }) => {
    const dispatch = useDispatch();
    const [page, setPage] = useState('');

    const isStarting = book.status === 'unread';

    const handleSubmit = (e) => {
        e.preventDefault();
        const action = isStarting ? startReading : finishReading;
        dispatch(action({ id: book._id, page: Number(page) }))
            .unwrap()
            .then(() => {
                toast.success(isStarting ? 'Reading started' : 'Reading finished');
                onClose();
            })
            .catch((err) => toast.error('Action failed'));
    };

    return (
        <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={{
                position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(5px)',
                display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
            }}
            onClick={onClose}
        >
            <motion.div
                variants={modalVariants}
                onClick={(e) => e.stopPropagation()}
                style={{
                    backgroundColor: '#1E1E1E', padding: '2rem', borderRadius: '16px',
                    width: '90%', maxWidth: '350px', border: '1px solid #333',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.5)', textAlign: 'center'
                }}
            >
                <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.3rem', fontWeight: '600' }}>
                    {isStarting ? 'Start Reading' : 'Finish Reading'}
                </h2>
                <p style={{ marginBottom: '1.5rem', color: '#A0A0A0', fontSize: '0.9rem' }}>{book.title}</p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                        <label style={{ fontSize: '0.85rem', color: '#A0A0A0', marginBottom: '0.4rem' }}>
                            {isStarting ? 'Start Page' : 'Finish Page'}
                        </label>
                        <input
                            type="number"
                            value={page}
                            onChange={(e) => setPage(e.target.value)}
                            required
                            min="1"
                            placeholder="Enter page number"
                            style={inputStyle}
                        />
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        style={{
                            ...buttonStyle,
                            backgroundColor: isStarting ? '#10B981' : '#F59E0B',
                        }}
                    >
                        {isStarting ? 'Let\'s Go' : 'Complete Book'}
                    </motion.button>
                </form>
            </motion.div>
        </motion.div>
    );
};

const inputStyle = {
    padding: '0.8rem',
    borderRadius: '12px',
    border: 'none',
    backgroundColor: 'var(--color-dark-gray)',
    color: 'var(--text-main)',
    fontSize: '0.95rem',
    boxSizing: 'border-box',
    textAlign: 'center',
    width: '100%'
};

const buttonStyle = {
    marginTop: '0.5rem',
    padding: '0.9rem',
    color: 'var(--color-white)',
    border: 'none',
    borderRadius: '30px',
    fontSize: '1rem',
    fontWeight: '700',
    cursor: 'pointer',
    width: '100%'
};

export default ReadingModal;
