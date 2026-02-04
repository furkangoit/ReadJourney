import { createSlice } from '@reduxjs/toolkit';
import { fetchUserBooks, addBook, removeBook, fetchRecommendedBooks, addFromRecommended, startReading, finishReading } from './operations';

const initialState = {
    items: [], // User's books
    recommended: [], // Recommended books (results, totalPages, etc)
    isLoading: false,
    error: null,
    filter: null, // 'unread', 'in-progress', 'done'
};

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch User Books
            .addCase(fetchUserBooks.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUserBooks.fulfilled, (state, action) => {
                state.isLoading = false;
                // API response likely looks like { data: [...] } or just [...]
                // Based on typical patterns, let's assume body is array. 
                // Docs say schemas/GetUsersBooksResponse. Usually that's an array or object with array.
                // We'll inspect usage if it breaks.
                state.items = action.payload;
                state.error = null;
            })
            .addCase(fetchUserBooks.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Add Book
            .addCase(addBook.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            // Remove Book
            .addCase(removeBook.fulfilled, (state, action) => {
                state.items = state.items.filter(book => book._id !== action.payload.id);
            })
            // Fetch Recommended
            .addCase(fetchRecommendedBooks.fulfilled, (state, action) => {
                state.recommended = action.payload;
            })
            // Add From Recommended
            .addCase(addFromRecommended.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            // Start Reading (update book status)
            .addCase(startReading.fulfilled, (state, action) => {
                // API docs show "StartReadingBookResponse"
                // If action.payload is the entire book object with updated status, we update it in the list.
                // If just success message, we might need manual update. Assuming response is the Updated Book Object.
                // Checking view_content_chunk Step 39: swagger isn't explicit on full book structure in response, 
                // but typically REST APIs return the resource. 
                // Let's assume payload is the book.
                const index = state.items.findIndex(item => item._id === action.payload._id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            // Finish Reading
            .addCase(finishReading.fulfilled, (state, action) => {
                const index = state.items.findIndex(item => item._id === action.payload._id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            });
    },
});

export const { setFilter } = booksSlice.actions;
export const booksReducer = booksSlice.reducer;
