import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// react-router
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

// pages
import Home from './pages/Home/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

// router
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
