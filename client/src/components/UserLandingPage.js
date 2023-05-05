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
                                setShowCreateForm(true);
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

            </header>
            <div className="outlet-container">
                <Outlet />
            </div>
        </div>
        {showCreateForm && <NewEventForm setShowCreateForm={setShowCreateForm} />}
    </>
}