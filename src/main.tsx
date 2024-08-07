import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './App.tsx'
import Novel from "./routes/Novel.tsx"
import Infoscreen from './routes/Infoscreen.tsx';
import Test from './components/Test.tsx';
import ReadChapter from './routes/ReadChapter.tsx';

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
    path: "/:type",
    element: <Novel/>,
  },
  {
    path: "/:type/:title",
    element: <Infoscreen/>,
  },
  {
    path: "/:type/:title/:chapterNumber",
    element: <ReadChapter/>,
  },
  {
    path: "/test",
    element: <Test/>,
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
