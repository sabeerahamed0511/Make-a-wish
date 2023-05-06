import React, { useContext, useEffect, useState } from "react";
import { Wish } from "../contexts/WishContext";
import { getAllPerson } from "../utils/api-utils";
import { getCurrentUser, getToken } from "../utils/storage-utills";
import { useNavigate } from "react-router-dom";
import EachEventCard from "./EachEventCard";

export default function EventCard() {

    const { events, onInitialAddEvents } = useContext(Wish);
    const navigate = useNavigate();

    const [loader, setLoader] = useState(true);

    useEffect(() => {

        if (!getToken()) return navigate("../login");

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

    return <>
        {loader ?
            <div className="loader"></div>
            :
            (
                events.length === 0 ?
                    <h3 style={{ color: "grey" }}>No events to display!&#9785;<br />Please add some events&#9996;</h3>
                    :
                    <>
                        {
                            events.map(each => {
                                return <EachEventCard key={each._id} each={each} />
                            })
                        }

                    </>
            )
        }
    </>
}