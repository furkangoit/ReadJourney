# ReadJourney

ReadJourney is a comprehensive reading tracking application built with **React**, **Vite**, and **Redux Toolkit**. It offers a premium, modern interface for managing your personal library and tracking your reading progress.

## Features

-   **User Authentication**: Secure Signup and Login with JWT persistence.
-   **Dashboard**:
    -   View "My Library" with filtering (All, To Read, Reading, Done).
    -   "Recommended Books" section with pagination.
-   **Book Management**:
    -   Add books manually.
    -   Add books from recommendations with one click.
    -   Delete books.
-   **Reading Tracking**:
    -   Start Reading (Logs start page).
    -   Finish Reading (Logs finish page).
    -   Visual status badges (Unread, In Progress, Done).
-   **Premium UI**:
    -   Dark Mode aesthetic.
    -   Smooth animations using `framer-motion`.
    -   Responsive and interactive elements.

## Tech Stack

-   **Frontend**: React, Vite
-   **State Management**: Redux Toolkit
-   **Routing**: React Router DOM (with Protected Routes)
-   **Styling**: CSS Modules, Framer Motion
-   **API Client**: Axios

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```

3.  **Build for Production**:
    ```bash
    npm run build
    ```

## Project Structure

-   `/src/components`: Reusable UI components (Modals, Lists).
-   `/src/pages`: Application pages (Login, Register, Dashboard).
-   `/src/redux`: Redux slices and async thunks.
-   `/src/services`: Axios API configuration and endpoint definitions.

---
*Created by Antigravity*
