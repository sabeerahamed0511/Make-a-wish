import React, { useEffect, useState } from "react";
import { getCurrentUser, getToken, setCurrentUser, setToken } from "../utils/storage-utills";
import { useNavigate } from "react-router-dom";
import { loginToAccount, registerAnAccount } from "../utils/api-utils";
// import { toast } from "react-toastify";
export default function RegisterForm() {
    const navigate = useNavigate();
    const [error, setError] = useState({
        email: "",
        password: "",
        name: "",
        contact: ""
    });
    const [boo, setBoo] = useState(true);
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: "",
        contact: "",
        confirmPassword: "",
    })

    useEffect(() => {
        if (getToken()) return navigate(`/events/${getCurrentUser().name}`);
    }, []);

    function onFormSubmit(e) {
        e.preventDefault();

        if (! /^[a-zA-Z ]+$/.test(newUser.name)) {
            return setError(ex => ({ ...ex, name: "Name must contain alphabets only" }));
        }
        if (! /^[0-9]+$/.test(newUser.contact)) {
            return setError(ex => ({ ...ex, contact: "Contact must contain only numbers" }));
        }
        if (newUser.password !== newUser.confirmPassword) {
            return setError(ex => ({ ...ex, password: "Password & confirm password doesn't match!" }));
        }
        setBoo(false);

        registerAnAccount(newUser)
            .then(res => {
                if (res.status === "Success") {
                    setNewUser({
                        name: "",
                        email: "",
                        password: "",
                        contact: "",
                        confirmPassword: "",
                        secret: ""
                    });
                    setBoo(true);
                    navigate("/login")
                }
                else {
                    setBoo(true);
                    if (res.field) setError(ex => ({ ...ex, [res.field]: res.message }));
                    else alert(res.message);
                }
            })
    }

    return <>
        <div className="signin-form-container">
            <form onSubmit={onFormSubmit}>
                <h1 className="logo">MAKE-A-WISH</h1>
                <p className="heading">
                    Register in your Account
                </p>
                <div className="field-container reg">
                    <input type="text" id="name" placeholder="Name" required style={error.name ? { border: "1px solid red" } : {}} onChange={e => {
                        setNewUser(ex => ({ ...ex, name: e.target.value }));
                        setError(ex => ({ ...ex, name: "" }));
                    }} />
                </div>
                {error.name && <span className="error">*{error.name}</span>}
                <div className="field-container reg">
                    <input type="email" id="email" placeholder="Email" style={error.email ? { border: "1px solid red" } : {}} required onChange={e => {
                        setNewUser(ex => ({ ...ex, email: e.target.value }));
                        setError(ex => ({ ...ex, email: "" }));
                    }} />
                </div>
                {error.email && <span className="error">*{error.email}</span>}
                <div className="field-container reg">
                    <input type="text" id="number" placeholder="Contact" required minLength={10} maxLength={10} style={error.contact ? { border: "1px solid red" } : {}} onChange={e => {
                        setNewUser(ex => ({ ...ex, contact: e.target.value }));
                        setError(ex => ({ ...ex, contact: "" }));
                    }} />
                </div>
                {error.contact && <span className="error">*{error.contact}</span>}
                <div className="field-container reg">
                    <input type="password" id="password" placeholder="Password" minLength={8} style={error.password ? { border: "1px solid red" } : {}} required onChange={e => {
                        setNewUser(ex => ({ ...ex, password: e.target.value }));
                        setError(ex => ({ ...ex, password: "" }));
                    }} />
                </div>
                {error.password && <span className="error">*{error.password}</span>}
                <div className="field-container reg">
                    <input type="password" id="confirmPassword" placeholder="Confirm Password" minLength={8} style={error.password ? { border: "1px solid red" } : {}} required onChange={e => {
                        setNewUser(ex => ({ ...ex, confirmPassword: e.target.value }));
                        setError(ex => ({ ...ex, password: "" }));
                    }} />
                </div>
                <div className="field-container reg">
                    <input type="text" id="secret" placeholder="Secret word for password reset" required onChange={e => {
                        setNewUser(ex => ({ ...ex, secret: e.target.value }));
                    }} />
                </div>
                <div className="btn-link-container reg">
                    <p className="createLink" onClick={() => navigate("/login")}>Sign In</p>
                    <button type="submit">{boo ? "REGISTER" : <span className="loader"></span>}</button>
                </div>
            </form>
        </div>
    </>
}