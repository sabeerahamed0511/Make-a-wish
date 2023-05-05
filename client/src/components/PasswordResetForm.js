import React, { useEffect, useState } from "react";
import {
  getCurrentUser,
  getToken,
  setCurrentUser,
  setToken,
} from "../utils/storage-utills";
import { useNavigate } from "react-router-dom";
import {
  loginToAccount,
  passwordReset,
  secretCheck,
} from "../utils/api-utils";
// import { toast } from "react-toastify";
export default function PasswordResetForm() {
  const navigate = useNavigate();
  const [isCheck, setIsCheck] = useState(false);
  const [error, setError] = useState({
    email: "",
    secret: "",
    password: "",
  });
  const [boo, setBoo] = useState(true);
  const [loginUser, setLoginUser] = useState({
    email: "",
    secret: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (getToken() && getCurrentUser().isVendor)
      return navigate("/vendor/proposals");
    if (getToken() && getCurrentUser().isUser)
      return navigate("/user/proposals");
  }, []);

  function onFormSubmit(e) {
    e.preventDefault();

    setBoo(false);
    secretCheck(loginUser)
      .then((res) => {
        if (res.status === "Success") {
          setBoo(true);
          setIsCheck(true);
        } else {
          setBoo(true);
          if (res.field) setError((ex) => ({ ...ex, [res.field]: res.message }));
          else alert("Failed to check, try again!!");
        }
      });
  }

  function onPasswordResetSubmit(e) {
    e.preventDefault();
    if (loginUser.password !== loginUser.confirmPassword) {
      return setError((ex) => ({
        ...ex,
        password: "Password & confirm password doesn't match!",
      }));
    }
    setBoo(false);
    passwordReset(loginUser)
      .then((res) => {
        if (res.status === "Success") {
          setLoginUser({
            email: "",
            secret: "",
            password: "",
            confirmPassword: "",
          });

          setBoo(true);
          setIsCheck(false);
          navigate("/login");
        } else {
          setBoo(true);
          if (res.field) setError((ex) => ({ ...ex, [res.field]: res.message }));
          else alert(res.message);
        }
      });
  }

  return (
    <>
      {!isCheck ? (
        <div className="signin-form-container">
          <form onSubmit={onFormSubmit}>
            <h1 className="logo">MAKE-A-WISH</h1>
            <p className="heading">Reset your password</p>
            <div className="field-container margin">
              <input
                type="email"
                id="email"
                placeholder="Email"
                style={error.email ? { border: "1px solid red" } : {}}
                required
                value={loginUser.email}
                onChange={(e) => {
                  setLoginUser((ex) => ({ ...ex, email: e.target.value }));
                  setError((ex) => ({ ...ex, email: "" }));
                }}
              />
            </div>
            {error.email && <span className="error">*{error.email}</span>}
            <div className="field-container">
              <input
                type="text"
                id="secret"
                placeholder="Secret word for password reset"
                style={error.secret ? { border: "1px solid red" } : {}}
                required
                value={loginUser.secret}
                onChange={(e) => {
                  setLoginUser((ex) => ({ ...ex, secret: e.target.value }));
                  setError((ex) => ({ ...ex, secret: "" }));
                }}
              />
            </div>
            {error.secret && <span className="error">*{error.secret}</span>}
            <div className="btn-link-container margin">
              <p className="createLink" onClick={() => navigate("/login")}>
                Sign In
              </p>
              <button type="submit">
                {boo ? "NEXT" : <span className="loader"></span>}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="signin-form-container">
          <form onSubmit={onPasswordResetSubmit}>
            <h1 className="logo">MAKE-A-WISH</h1>
            <p className="heading">Reset your password</p>
            <div className="field-container margin">
              <input
                type="password"
                id="password"
                placeholder="New password"
                minLength={8}
                style={error.password ? { border: "1px solid red" } : {}}
                required
                value={loginUser.password}
                onChange={(e) => {
                  setLoginUser((ex) => ({ ...ex, password: e.target.value }));
                  setError((ex) => ({ ...ex, password: "" }));
                }}
              />
            </div>
            {error.password && <span className="error">*{error.password}</span>}
            <div className="field-container margin">
              <input
                type="password"
                id="confirmpassword"
                placeholder="Confirm password"
                minLength={8}
                style={error.password ? { border: "1px solid red" } : {}}
                required
                value={loginUser.confirmPassword}
                onChange={(e) => {
                  setLoginUser((ex) => ({
                    ...ex,
                    confirmPassword: e.target.value,
                  }));
                  setError((ex) => ({ ...ex, password: "" }));
                }}
              />
            </div>
            <div className="btn-link-container margin">
              <p className="createLink" onClick={() => navigate("/login")}>
                Sign In
              </p>
              <button type="submit">
                {boo ? "SAVE" : <span className="loader"></span>}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
