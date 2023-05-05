import React, { useEffect, useState } from "react";
import { getCurrentUser, getToken, setCurrentUser, setToken } from "../utils/storage-utills";
import { useNavigate } from "react-router-dom";
import { loginToAccount } from "../utils/api-utils";
// import { toast } from "react-toastify";
export default function LoginForm() {
    const navigate = useNavigate();
    const [error, setError] = useState({
        email: "",
        password: ""
    });
    const [boo, setBoo] = useState(true);
    const [loginUser, setLoginUser] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        if (getToken()) return navigate(`events/${getCurrentUser().name}`);
    }, []);

    function onFormSubmit(e) {
        e.preventDefault();

        setBoo(false);
        loginToAccount(loginUser)
            .then(res => {
                if (res.status === "Success") {
                    setToken(res.token);
                    setCurrentUser(res.user);
                    setLoginUser({
                        email: "",
                        password: ""
                    });
                    setBoo(true);
                    navigate(`/events/${res.user.name}`)
                }
                else {
                    setBoo(true);
                    if (res.field) setError(ex => ({ ...ex, [res.field]: res.message }));
                    else alert(res.message);
                }
            })
            .catch(res => alert(res.message))
    }

    return <>
        <div className="signin-form-container">
            <form onSubmit={onFormSubmit}>
                <h1 className="logo">MAKE-A-WISH</h1>
                <p className="heading">
                    Sign in your Account
                </p>
                <div className="field-container margin">
                    <input type="email" id="email" placeholder="Email" style={error.email ? { border: "1px solid red" } : {}} required onChange={e => {
                        setLoginUser(ex => ({ ...ex, email: e.target.value }));
                        setError(ex => ({ ...ex, email: "" }));
                    }} />
                </div>
                {error.email && <span className="error">*{error.email}</span>}
                <div className="field-container">
                    <input type="password" id="password" placeholder="Password" minLength={8} style={error.password ? { border: "1px solid red" } : {}} required onChange={e => {
                        setLoginUser(ex => ({ ...ex, password: e.target.value }));
                        setError(ex => ({ ...ex, password: "" }));
                    }} />
                </div>
                <p className="forget" onClick={() => navigate("/password-reset")}>Forget Password?</p>
                {error.password && <span className="error">*{error.password}</span>}
                <div className="btn-link-container margin">
                    <p className="createLink" onClick={() => navigate("/register")}>Create Account</p>
                    <button type="submit">{boo ? "SIGN IN" : <span className="loader"></span>}</button>
                </div>
            </form>
        </div>
    </>
}