import React, { useState, useContext } from "react";
import classes from "./Auth.module.css";
import { Link } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { ClipLoader } from "react-spinners";
import { useNavigate, useLocation } from "react-router-dom";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({ signIn: false, signUp: false });
  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const navStateData = useLocation();
  // console.log(navStateData);

  const authHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    const redirectPath = navStateData?.state?.redirect || "/";

    if (e.target.name === "signin") {
      setLoading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: "Type.SET_USER",
            user: userInfo.user,
          });
          setLoading({ ...loading, signIn: false });
          navigate(redirectPath);
        })
        .catch((error) => {
          setError(error.message);
          setLoading({ ...loading, signIn: false });
        });
    } else {
      setLoading({ ...loading, signUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: "Type.SET_USER",
            user: userInfo.user,
          });
          setLoading({ ...loading, signUp: false });
          navigate(redirectPath);
        })
        .catch((error) => {
          setError(error.message);
          setLoading({ ...loading, signUp: false });
        });
    }
  };

  return (
    <section className={classes.logIn}>
      {/* logo */}
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/06/Amazon_2024.svg"
          alt="amazon logo"
        />
      </Link>

      {/* SignUp Form */}
      <div className={classes.logIn__container}>
        <h1>Sign In</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData?.state?.msg}
          </small>
        )}
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button
            type="submit"
            onClick={authHandler}
            name="signin"
            className={classes.logIn__signInButton}
          >
            {loading.signIn ? (
              <ClipLoader size={15} color="#00ffff" />
            ) : (
              "SignIn"
            )}
          </button>
        </form>
        {/*Agreement  */}
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of use &
          SALE. Please, see our Privacy Notice, ou Cookies Notice and our
          Interest-Based ads Notice
        </p>
        {/* Create account btn */}
        <button
          type="submit"
          onClick={authHandler}
          name="signup"
          className={classes.logIn__registerButton}
        >
          {loading.signUp ? (
            <ClipLoader size={15} color="#00ffff" />
          ) : (
            "Create Your Amazon Account"
          )}
        </button>
        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
};

export default Auth;
