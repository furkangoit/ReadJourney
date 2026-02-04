import api from './api';

export const booksApi = {
    getRecommendBooks: async (params) => {
        // params: { title, author, page, limit }
        const response = await api.get('/books/recommend', { params });
        return response.data;
    },
    addBook: async (data) => {
        const response = await api.post('/books/add', data);
        return response.data;
    },
    addBookFromRecommend: async (id) => {
        const response = await api.post(`/books/add/${id}`);
        return response.data;
    },
    removeBook: async (id) => {
        const response = await api.delete(`/books/remove/${id}`);
        return response.data;
    },
    getUserBooks: async (status) => {
        // status: unread, in-progress, done
        const response = await api.get('/books/own', { params: { status } });
        return response.data;
    },
    startReading: async (data) => {
        // data: { id, page }
        const response = await api.post('/books/reading/start', data);
        return response.data;
    },
    finishReading: async (data) => {
        // data: { id, page }
        const response = await api.post('/books/reading/finish', data);
        return response.data;
    },
    deleteReading: async (bookId, readingId) => {
        const response = await api.delete('/books/reading', { params: { bookId, readingId } });
        return response.data;
    },
};
