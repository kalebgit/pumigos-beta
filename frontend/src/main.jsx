import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import './index.css'
import Root from './pages/Root'
import Signup from './pages/Signup'

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index:true,
        element: <Root/>
      }, 
      {
        path: 'signup', 
        element: <Signup/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
