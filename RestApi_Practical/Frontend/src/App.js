import React, { useState, useEffect, Fragment } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import Layout from "./components/Layout/Layout";
import Backdrop from "./components/Backdrop/Backdrop";
import Toolbar from "./components/Toolbar/Toolbar";
import MainNavigation from "./components/Navigation/MainNavigation/MainNavigation";
import MobileNavigation from "./components/Navigation/MobileNavigation/MobileNavigation";
import ErrorHandler from "./components/ErrorHandler/ErrorHandler";
import FeedPage from "./pages/Feed/Feed";
import SinglePostPage from "./pages/Feed/SinglePost/SinglePost";
import LoginPage from "./pages/Auth/Login";
import SignupPage from "./pages/Auth/Signup";
import "./App.css";

const App = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [showBackdrop, setShowBackdrop] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [authState, setAuthState] = useState({
    isAuth: false,
    token: null,
    userId: null,
    authLoading: false,
    error: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiryDate = localStorage.getItem("expiryDate");

    if (token && expiryDate) {
      if (new Date(expiryDate) <= new Date()) {
        logoutHandler();
      } else {
        const userId = localStorage.getItem("userId");
        const remainingMilliseconds =
          new Date(expiryDate).getTime() - new Date().getTime();
        setAuthState({
          isAuth: true,
          token: token,
          userId: userId,
          authLoading: false,
          error: null,
        });
        setAutoLogout(remainingMilliseconds);
      }
    }
  }, []);

  const mobileNavHandler = (isOpen) => {
    setShowMobileNav(isOpen);
    setShowBackdrop(isOpen);
  };

  const backdropClickHandler = () => {
    setShowBackdrop(false);
    setShowMobileNav(false);
    clearError();
  };

  const clearError = () => {
    setAuthState((prevState) => ({
      ...prevState,
      error: null,
    }));
  };

  const logoutHandler = () => {
    setAuthState({
      isAuth: false,
      token: null,
      userId: null,
      authLoading: false,
      error: null,
    });
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
  };

  const loginHandler = async (event, authData) => {
    event.preventDefault();
    console.log("Login submitted:", authData); // Debug statement

    setAuthState({
      ...authState,
      authLoading: true,
    });

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: authData.email,
          password: authData.password,
        }),
      });

      console.log("Login response:", response); // Debug statement

      if (response.status === 401) {
        throw new Error("Invalid email or password. Please try again.");
      }

      if (!response.ok) {
        let errorMessage = "Authentication failed!";
        if (response.status === 422) {
          errorMessage = "Validation failed.";
        }
        throw new Error(errorMessage);
      }

      const resData = await response.json();
      console.log("Login response data:", resData); // Debug statement

      setAuthState({
        isAuth: true,
        token: resData.token,
        userId: resData.userId,
        authLoading: false,
        error: null,
      });

      localStorage.setItem("token", resData.token);
      localStorage.setItem("userId", resData.userId);
      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
      localStorage.setItem("expiryDate", expiryDate.toISOString());

      setAutoLogout(remainingMilliseconds);
      // Redirect to feed page after successful login
      navigate("/");
    } catch (err) {
      console.error("Login error:", err); // Debug statement
      setAuthState({
        isAuth: false,
        token: null,
        userId: null,
        authLoading: false,
        error: err.message || "Something went wrong. Please try again.",
      });
    }
  };

  const signupHandler = async (event, authData) => {
    event.preventDefault();
    console.log("Signup submitted:", authData); // Debug statement

    setAuthState({
      ...authState,
      authLoading: true,
    });

    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: authData.signupForm.email.value,
          password: authData.signupForm.password.value,
          name: authData.signupForm.name.value,
        }),
      });

      console.log("Signup response:", response); // Debug statement

      if (response.status === 422) {
        throw new Error(
          "Validation failed. Make sure the email address isn't used yet!"
        );
      }
      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Creating a user failed!");
      }

      const resData = await response.json();
      console.log("Signup response data:", resData); // Debug statement

      setAuthState({
        ...authState,
        authLoading: false,
      });

      // Redirect to login page after successful signup
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err); // Debug statement
      setAuthState({
        isAuth: false,
        token: null,
        userId: null,
        authLoading: false,
        error: err.message || "Something went wrong. Please try again.",
      });
    }
  };

  const setAutoLogout = (milliseconds) => {
    setTimeout(() => {
      logoutHandler();
    }, milliseconds);
  };

  return (
    <Fragment>
      {showBackdrop && <Backdrop onClick={backdropClickHandler} />}
      <ErrorHandler error={authState.error} onHandle={clearError} />
      <Layout
        header={
          <Toolbar>
            <MainNavigation
              onOpenMobileNav={() => mobileNavHandler(true)}
              onLogout={logoutHandler}
              isAuth={authState.isAuth}
            />
          </Toolbar>
        }
        mobileNav={
          <MobileNavigation
            open={showMobileNav}
            mobile
            onChooseItem={() => mobileNavHandler(false)}
            onLogout={logoutHandler}
            isAuth={authState.isAuth}
          />
        }
      />
      <Routes>
        <Route
          path="/"
          element={
            authState.isAuth ? (
              <FeedPage userId={authState.userId} token={authState.token} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/:postId"
          element={
            authState.isAuth ? (
              <SinglePostPage
                userId={authState.userId}
                token={authState.token}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={
            <LoginPage onLogin={loginHandler} loading={authState.authLoading} />
          }
        />
        <Route
          path="/signup"
          element={
            <SignupPage
              onSignup={signupHandler}
              loading={authState.authLoading}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Fragment>
  );
};

export default App;
