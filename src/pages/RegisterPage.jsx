import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { register } from '../redux/auth/operations';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './Auth.module.css'; // I'll create this CSS module

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(7, 'Password must be at least 7 characters').required('Password is required'),
});

const RegisterPage = () => {
    const dispatch = useDispatch();
    const { register: formRegister, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        dispatch(register(data))
            .unwrap()
            .then(() => toast.success('Registration successful!'))
            .catch((err) => toast.error(typeof err === 'string' ? err : 'Registration failed'));
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <h2>Registration</h2>
                <div className={styles.field}>
                    <label>Name</label>
                    <div className={styles.inputWrapper}>
                        <input
                            {...formRegister('name')}
                            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                            type="text"
                            placeholder="Ilona Ratushniak"
                        />
                    </div>
                    {errors.name && <p className={styles.errorMsg}>{errors.name.message}</p>}
                </div>
                <div className={styles.field}>
                    <label>Mail</label>
                    <div className={styles.inputWrapper}>
                        <input
                            {...formRegister('email')}
                            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                            type="email"
                            placeholder="ilona@mail.com"
                        />
                    </div>
                    {errors.email && <p className={styles.errorMsg}>{errors.email.message}</p>}
                </div>
                <div className={styles.field}>
                    <label>Password</label>
                    <div className={styles.inputWrapper}>
                        <input
                            {...formRegister('password')}
                            className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                            type="password"
                            placeholder="Yourpasswordhere"
                        />
                    </div>
                    {errors.password && <p className={styles.errorMsg}>{errors.password.message}</p>}
                </div>
                <button type="submit" className={styles.button}>Registration</button>
                <div className={styles.link}>
                    <Link to="/login">Already have an account?</Link>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;
