import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './screens/Home/Home';
import SignIn from './screens/Registration/SignIn';
import SignUp from './screens/Registration/SignUp';
import { Provider } from 'react-redux';
import store from './store';

const router = createBrowserRouter([
  {
    path: "/Signin",
    element: <Home />,
  },
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/Registration",
    element: <SignUp />,
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);