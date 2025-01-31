import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Landing from './pages/landing';
import FormComponent from './pages/formComponent';
import React from 'react';
import SongComponent from './pages/songComponent';
import EditSong from './pages/editSong';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/songs/create',
    element: <FormComponent />,
  },
  {
    path: '/songs/:id',
    element: <SongComponent />,
  },
  {
    path: '/songs/:id/edit',
    element: <EditSong />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;