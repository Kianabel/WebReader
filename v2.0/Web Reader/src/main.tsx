import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Novel from "./routes/Novel.tsx"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/download",
    element: <App/>,
  },
  {
    path: "/manga",
    element: <App/>,
  },
  {
    path: "/novel",
    element: <Novel/>,
  },
  {
    path: "/novel/:title",
    element: <App/>,
  },
  {
    path: "/novel/:title/chapter/:chapterNumber",
    element: <App/>,
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
