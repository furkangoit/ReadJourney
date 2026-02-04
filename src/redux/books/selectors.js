import { createSelector } from '@reduxjs/toolkit';

export const selectBooks = (state) => state.books.items;
export const selectIsBooksLoading = (state) => state.books.isLoading;
export const selectBooksError = (state) => state.books.error;
export const selectRecommendedBooks = (state) => state.books.recommended;
export const selectBooksFilter = (state) => state.books.filter;

// Memoized selector for filtering if needed locally, though API does it too.
export const selectVisibleBooks = createSelector(
    [selectBooks, selectBooksFilter],
    (books, filter) => {
        if (!filter) return books;
        // Assuming book object has a 'status' field matching the filter
        return books.filter(book => book.status === filter);
    }
);
