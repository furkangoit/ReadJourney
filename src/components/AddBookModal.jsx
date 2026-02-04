import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addBook } from '../redux/books/operations';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
};

const modalVariants = {
    hidden: { opacity: 0, y: -50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 }
};

const AddBookModal = ({ onClose }) => {
    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        dispatch(addBook(data))
            .unwrap()
            .then(() => {
                toast.success('Book added successfully');
                reset();
                onClose();
            })
            .catch((err) => toast.error('Failed to add book'));
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
                    width: '90%', maxWidth: '400px', border: '1px solid #333',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '600' }}>Add Book</h2>
                    <button
                        onClick={onClose}
                        style={{ background: 'transparent', border: 'none', color: '#888', fontSize: '1.5rem', cursor: 'pointer' }}
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ fontSize: '0.85rem', color: '#A0A0A0', marginBottom: '0.4rem' }}>Title</label>
                        <input {...register('title', { required: true })} placeholder="e.g. Dune" style={inputStyle} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ fontSize: '0.85rem', color: '#A0A0A0', marginBottom: '0.4rem' }}>Author</label>
                        <input {...register('author', { required: true })} placeholder="e.g. Frank Herbert" style={inputStyle} />
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                            <label style={{ fontSize: '0.85rem', color: '#A0A0A0', marginBottom: '0.4rem' }}>Year</label>
                            <input {...register('publishYear', { required: true })} placeholder="1965" type="number" style={inputStyle} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                            <label style={{ fontSize: '0.85rem', color: '#A0A0A0', marginBottom: '0.4rem' }}>Pages</label>
                            <input {...register('totalPages', { required: true })} placeholder="412" type="number" style={inputStyle} />
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        style={buttonStyle}
                    >
                        Add Book
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
    width: '100%'
};

const buttonStyle = {
    marginTop: '0.5rem',
    padding: '0.9rem',
    backgroundColor: 'var(--color-white)',
    color: 'var(--color-black)',
    border: 'none',
    borderRadius: '30px',
    fontSize: '1rem',
    fontWeight: '700',
    cursor: 'pointer',
    width: '100%'
};

export default AddBookModal;
