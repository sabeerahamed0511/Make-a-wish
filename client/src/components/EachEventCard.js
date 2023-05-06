import React, { useContext, useEffect, useState } from "react";
import { Wish } from "../contexts/WishContext";
import { deleteSinglePerson, getAllPerson } from "../utils/api-utils";
import { getCurrentUser, getToken } from "../utils/storage-utills";
import { useNavigate } from "react-router-dom";

export default function EachEventCard({ each }) {

    const { onDeleteEvent } = useContext(Wish);
    const navigate = useNavigate();

    const [showDelete, setShowDelete] = useState(false);
    const [showCopyText, setShowCopyText] = useState(false);
    const [showLinkPopup, setShowLinkPopup] = useState(false);

    let path = window.location.href;
    let domain = path.split("events")[0];

    function handleDelete(id) {
        deleteSinglePerson(id)
            .then(res => {
                if (res.status === "Success") {
                    onDeleteEvent(id);
                    setShowDelete(false);
                } else {
                    alert(res.message);
                }
            })
            .catch(err => alert(err.message))
    }

    return <>

        <div className="event-card-container">
            <div className="event-card-left">
                <h1 className="event-name">{each.name}</h1>
                <a href="#" onClick={(e) => {
                    e.preventDefault();
                    navigate(`${each._id}`);
                }}>Add-a-wish</a>
            </div>
            <div className="event-card-right">
                <div className="icon-container" onClick={() => {
                    navigate(`check/${each._id}`);
                }}>
                    <ion-icon name="eye"></ion-icon>
                </div>
                <div className="icon-container" onClick={async () => {
                    try {
                        await navigator.clipboard.writeText(`${domain}wishes/${each._id}`);
                        setShowCopyText(true);
                        setTimeout(() => setShowCopyText(false), 2000);
                    } catch (err) {
                        setShowLinkPopup(true)
                    }
                }}>
                    <ion-icon name="link"></ion-icon>
                    {showCopyText && <span className="copy-note">Link copied</span>}
                </div>

                {
                    showLinkPopup &&
                    <div className="link-popup" onClick={() => setShowLinkPopup(false)}>
                        <p>Browser not support, copy from here.
                            <a className="wish-link" href={`${domain}wishes/${each._id}`} target="_blank">LINK</a></p>
                    </div>
                }

                <div className="icon-container" >
                    <span onClick={() => {
                        setShowDelete(true);
                    }}><ion-icon name="trash"></ion-icon></span>
                    {
                        showDelete &&
                        <div className="delete-confirmation" >
                            Are u sure?<br />Deleteing may leads to clear all the greetings gathered for this person!
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
    </>
}