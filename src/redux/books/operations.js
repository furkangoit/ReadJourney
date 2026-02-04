import { createAsyncThunk } from '@reduxjs/toolkit';
import { booksApi } from '../../services/booksApi';

// Fetch user's library (own books)
export const fetchUserBooks = createAsyncThunk(
    'books/fetchUserBooks',
    async (status, thunkAPI) => {
        try {
            const data = await booksApi.getUserBooks(status);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Add a book manually
export const addBook = createAsyncThunk(
    'books/addBook',
    async (bookData, thunkAPI) => {
        try {
            const data = await booksApi.addBook(bookData);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Remove a book
export const removeBook = createAsyncThunk(
    'books/removeBook',
    async (bookId, thunkAPI) => {
        try {
            const data = await booksApi.removeBook(bookId);
            return { id: bookId, ...data };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Fetch recommended books
export const fetchRecommendedBooks = createAsyncThunk(
    'books/fetchRecommended',
    async (params, thunkAPI) => {
        try {
            const data = await booksApi.getRecommendBooks(params);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Add from recommended
export const addFromRecommended = createAsyncThunk(
    'books/addFromRecommended',
    async (bookId, thunkAPI) => {
        try {
            const data = await booksApi.addBookFromRecommend(bookId);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Start Reading
export const startReading = createAsyncThunk(
    'books/startReading',
    async (readingData, thunkAPI) => {
        // readingData: { id, page }
        try {
            const data = await booksApi.startReading(readingData);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Finish Reading
export const finishReading = createAsyncThunk(
    'books/finishReading',
    async (readingData, thunkAPI) => {
        // readingData: { id, page }
        try {
            const data = await booksApi.finishReading(readingData);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);
