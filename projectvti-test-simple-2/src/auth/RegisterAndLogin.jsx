import React, { useState } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";

import { database } from '../firebaseConfig';

import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword} from "firebase/auth";

import {useAuth} from './../main';

function RegisterAndLogin() {
  const [login, setLogin] = useState(false);
  let navigate = useNavigate();
  let location = useLocation();

  const history = useNavigate();

  let authStore = useAuth();

  const handleSubmit = (e, type) => {


    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (type == "signup") {
      createUserWithEmailAndPassword(database, email, password)
        .then((data) => {
          console.log(data, "authData");
          // auth.signin()
          history("/data");
        })
        .catch((err) => {
          alert(err.code);
          setLogin(true);
        });
    } else {
      signInWithEmailAndPassword(database, email, password)
        .then((data) => {
          console.log(data, "authData");
          authStore.signin(data.user.email, navigate("/", { replace: true }));
        })
        .catch((err) => {
          alert(err.code);
        });
    }
  };

  const handleReset = () => {
    history("/reset");
  }
  return (
    <div className="App">
      {/* Registration and login Screen */}
      <div className="row">
        <div
          className={login == false ? "activeColor" : "pointer"}
          onClick={() => setLogin(false)}
        >
          SignUp
        </div>
        <div
          className={login == true ? "activeColor" : "pointer"}
          onClick={() => setLogin(true)}
        >
          SignIn
        </div>
      </div>
      <h1>{login ? "SignIn" : "SignUp"}</h1>
      <form onSubmit={(e) => handleSubmit(e, login ? "signin" : "signup")}>
        <input name="email" placeholder="Email" />
        <br />
        <input name="password" type="text" placeholder="Password" />
        <br />
        <p onClick={handleReset}>Forgot Password?</p>
        <br />
        <button>{login ? "SignIn" : "SignUp"}</button>
      </form>
    </div>
  );
}
export default RegisterAndLogin;