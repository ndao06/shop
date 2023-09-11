import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root, {
  loader as rootLoader, action as rootAction,
} from "./routes/root";
import ErrorPage from "./error-page";
import Contact, { loader as contactLoader } from "./routes/contact";

import { action as editAction } from "./routes/edit"

import EditContact from "./routes/edit";

import { action as destroyAction } from './routes/destroy';
import Index from "./routes";

// data res
import DataRes from "./component/routes/dataRes";
import DataEditComponent from "./component/routes/dataEdit";

import RegisterAndLogin from './auth/RegisterAndLogin';
import RequireAuth from './auth/RequireAuth';
import {fakeAuthProvider} from './auth/auth';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RequireAuth>
      <Root />
    </RequireAuth>,
    errorElement: <ErrorPage />,
    // call và load data từ bên contact
    loader: rootLoader,
    action: rootAction,
    children: [
      { index: true, element: <Index /> },
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: contactLoader,
        action: editAction
      },
      {
        path: "contacts/:contactId/destroy",
        action: destroyAction,
      },
      {
        path: "data",
        element: <DataRes />
      },
      {
        path: "data/dataDeatail/:dataId",
        element: <DataEditComponent />
      }
    ],

  },
  // {
  //   path: "contacts/:contactId",
  //   element: <Contact />,
  // },
  {
    path: "/login",
    element: <RegisterAndLogin />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);


let AuthContext = React.createContext(null);

export const useAuth = () => {
  return React.useContext(AuthContext);
}

function AuthProvider({ children }) {
  let [user, setUser] = React.useState(null);

  let signin = (newUser, callback) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      callback;
    });
  };

  let signout = (callback) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback;
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}