import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NewEventForm from "./NewEventForm";
import { deleteCurrentUser, deleteToken, getCurrentUser, getToken } from "../utils/storage-utills";

export default function UserLandingPage() {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);

    useEffect(() => {
        if (!getToken()) return navigate("/login");
    }, []);

    return <>
        <div className="user-page-container">
            <header className="user-header">
                <h1 className="logo">MAKE-A-WISH</h1>
                <nav className="user-navbar" onClick={() => setShowMenu(!showMenu)}>
                    <p className="user-name">
                        <ion-icon name="menu-outline"></ion-icon>
                    </p>
                    {
                        showMenu &&
                        <ul className="nav-items">
                            <li onClick={() => {
                                navigate(`instruction`);
                            }}>
                                <ion-icon name="information-circle"></ion-icon>
                            </li>
                            <li onClick={() => {
                                setShowCreateForm(true);
                                setShowMenu(false);
                            }}>
                                <ion-icon name="add-circle"></ion-icon>
                            </li>
                            <li onClick={() => {
                                navigate(`${getCurrentUser().name}`);
                            }}>
                                <ion-icon name="home"></ion-icon>
                            </li>
                            <li onClick={() => {
                                deleteToken();
                                deleteCurrentUser();
                                navigate("../login");
                            }}>
                                <ion-icon name="log-out-outline"></ion-icon>
                            </li>
                        </ul>
                    }
                </nav>
                <ul className="nav-items-tab">
                    <li className="logo-li">
                        <div className="logo-li-container">
                            <img src={require("../images/logo.png")} />
                        </div>
                        <p className="icon-name">Make-A-Wish</p>
                    </li>
                    <li className="icon-li" onClick={() => {
                        navigate(`instruction`);
                    }}>
                        <ion-icon name="information-circle"></ion-icon>
                        <p className="icon-name">Instruction</p>
                    </li>
                    <li className="icon-li" onClick={() => {
                        setShowCreateForm(true);
                    }}>
                        <ion-icon name="add-circle"></ion-icon>
                        <p className="icon-name">New Event</p>
                    </li>
                    <li className="icon-li" onClick={() => {
                        navigate(`${getCurrentUser().name}`);
                    }}>
                        <ion-icon name="home"></ion-icon>
                        <p className="icon-name">Home</p>
                    </li>
                </ul>
                <div className="logout-li" onClick={() => {
                    deleteToken();
                    deleteCurrentUser();
                    navigate("../login");
                }}>
                    <ion-icon name="log-out-outline"></ion-icon>
                    <p className="icon-name">Log out</p>
                </div>
            </header>
            <div className="outlet-container">
                <Outlet context={{
                    setShowCreateForm,
                    setShowMenu
                }} />
            </div>
        </div>
        {showCreateForm && <NewEventForm setShowCreateForm={setShowCreateForm} />}
    </>
}