import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, Link } from 'react-router-dom'
import { refreshUser } from './redux/auth/operations'
import { selectIsRefreshing } from './redux/auth/selectors'
import { RestrictedRoute } from './components/RestrictedRoute'
import { PrivateRoute } from './components/PrivateRoute'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'

function App() {
    const dispatch = useDispatch()
    const isRefreshing = useSelector(selectIsRefreshing)

    useEffect(() => {
        dispatch(refreshUser())
    }, [dispatch])

    return isRefreshing ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            Loading...
        </div>
    ) : (
        <div className="app-container">
            <Routes>
                <Route path="/" element={<p>Home Page (Public) - <Link to="/login">Login</Link></p>} />
                <Route
                    path="/register"
                    element={<RestrictedRoute redirectTo="/dashboard" component={<RegisterPage />} />}
                />
                <Route
                    path="/login"
                    element={<RestrictedRoute redirectTo="/dashboard" component={<LoginPage />} />}
                />
                <Route
                    path="/dashboard"
                    element={<PrivateRoute redirectTo="/login" component={<DashboardPage />} />}
                />
            </Routes>
        </div>
    )
}

export default App
