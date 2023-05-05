import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import WishForm from "../components/WishForm";
import Thanks from "../components/Thanks";
import Wishes from "../components/Wishes";
import LandingPage from "../components/LandingPage";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import PasswordResetForm from "../components/PasswordResetForm";
import UserLandingPage from "../components/UserLandingPage";
import EventCard from "../components/EventCard";
import WishCard from "../components/WishCard";

export default function AppRouter() {

    return <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/password-reset" element={<PasswordResetForm />} />
                <Route path="/events" element={<UserLandingPage />} >
                    <Route path=":name" element={<EventCard />} />
                    <Route path=":name/check/:id" element={<WishCard />} />
                </Route>

                <Route path="/events/:name/:id" element={<Home />} />

                <Route path="/wishes/:id" element={<Wishes />} />
    
                {/* <Route path="/" element={<Home />} />
            <Route path="/form" element={<WishForm />} />
            <Route path="/thanks" element={<Thanks />} />
            <Route path="/wishes" element={<Wishes />} /> */}
            </Routes>
        </BrowserRouter>
    </>
}