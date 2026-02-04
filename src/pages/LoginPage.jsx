import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { logIn } from '../redux/auth/operations';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './Auth.module.css';

const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
});

const LoginPage = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        dispatch(logIn(data))
            .unwrap()
            .then(() => toast.success('Welcome back!'))
            .catch((err) => toast.error(typeof err === 'string' ? err : 'Login failed'));
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <h2>Log In</h2>
                <div className={styles.field}>
                    <label>Mail</label>
                    <div className={styles.inputWrapper}>
                        <input
                            {...register('email')}
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
                            {...register('password')}
                            className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                            type="password"
                            placeholder="Yourpasswordhere"
                        />
                    </div>
                    {errors.password && <p className={styles.errorMsg}>{errors.password.message}</p>}
                </div>
                <button type="submit" className={styles.button}>Log In</button>
                <div className={styles.link}>
                    <Link to="/register">Don't have an account?</Link>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
