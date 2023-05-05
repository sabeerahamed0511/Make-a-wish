import React, { useContext, useEffect, useState } from "react";
import { Wish } from "../contexts/WishContext";
import { BASE_URL, deleteSinglePerson, getAllPerson } from "../utils/api-utils";
import { getCurrentUser, getToken } from "../utils/storage-utills";
import { useNavigate } from "react-router-dom";

export default function EventCard() {

    const { events, onDeleteEvent, onInitialAddEvents } = useContext(Wish);
    const navigate = useNavigate();

    const [loader, setLoader] = useState(true);
    const [showDelete, setShowDelete] = useState(false);
    const [showCopyText, setShowCopyText] = useState(false);

    useEffect(() => {

        if (!getToken()) return navigate("../../login");

        getAllPerson(getCurrentUser()._id)
            .then(res => {
                if (res.status === "Success") {
                    setLoader(false);
                    onInitialAddEvents(res.persons);
                } else {
                    alert(res.message);
                }
            })
            .catch(err => alert(err.message))
    }, []);

    function handleDelete(id) {
        deleteSinglePerson(id)
            .then(res => {
                if (res.status === "Success") {
                    onDeleteEvent(id);
                } else {
                    alert(res.message);
                }
            })
            .catch(err => alert(err.message))
    }

    return <>
        {loader ?
            <div className="loader"></div>
            :
            (
                events.length === 0 ?
                    <h3 style={{ color: "grey" }}>No events to display!&#9785;<br />Please add some events&#9996;</h3>
                    :
                    events.map(each => {
                        return <div className="event-card-container" key={each._id}>
                            <div className="event-card-left">
                                <h1 className="event-name">{each.name}</h1>
                                <a href="#" onClick={(e) => {
                                    e.preventDefault();
                                    navigate(`../../events/${getCurrentUser().name}/${each._id}`);
                                }}>Add-a-wish</a>
                            </div>
                            <div className="event-card-right">
                                <div className="icon-container">
                                    <ion-icon name="eye"></ion-icon>
                                </div>
                                <div className="icon-container" onClick={() => {
                                    navigator.clipboard.writeText(`http://localhost:3000/wishes/${each._id}`);
                                    setShowCopyText(true);
                                    setTimeout(() => setShowCopyText(false), 2000);
                                }}>
                                    <ion-icon name="link"></ion-icon>
                                    { showCopyText && <span className="copy-note">Link copied</span>}
                                </div>
                                <div className="icon-container" >
                                    <span onClick={() => {
                                        setShowDelete(true);
                                    }}><ion-icon name="trash"></ion-icon></span>
                                    {
                                        showDelete &&
                                        <div className="delete-confirmation" >
                                            Are u sure?<br />Deleteing may leads to clear all the wishes gathered for this person!
                                            <div className="delete-btn-container" >
                                                <button onClick={() => {
                                                    handleDelete(each._id);
                                                }}><ion-icon name="checkmark-done"></ion-icon></button>
                                                <button onClick={() => {
                                                    setShowDelete(false);
                                                }}><ion-icon name="close"></ion-icon></button>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    }))
        }
    </>
}