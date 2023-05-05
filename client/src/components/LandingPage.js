import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, getToken } from "../utils/storage-utills";

export default function LandingPage() {

    const navigate = useNavigate();

    useEffect(() => {
        if (getToken()) return navigate(`/events/${getCurrentUser().name}`);
    }, []);

    return <>
    <div className="main-container">
        <div className="landing-page">
            <span className="logo-img-container"><img src={require("../images/logo.png")} /></span>
            <h1 className="logo">MAKE-A-WISH</h1>
            <p className="landing-text">Here, you can gather birthday greetings for a loved one from your friends and family. To continue...<br/><Link to={"/login"}>Log-In</Link> Or <Link to={"/register"}>Register</Link></p>
        </div>
    </div>
    </>
}