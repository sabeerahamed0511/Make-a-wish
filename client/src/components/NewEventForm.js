import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../utils/storage-utills";
import { addNewPerson } from "../utils/api-utils";
import { Wish } from "../contexts/WishContext";

export default function NewEventForm({setShowCreateForm}) {

    const {onAddEvents} = useContext(Wish);
    const { _id } = getCurrentUser();

    const navigate = useNavigate();
    const [boo, setBoo] = useState(true);
    const [person, setPerson] = useState({
        name : "",
        gender : "Male",
        notes : "",
        creatorId : _id
    })

    function handleSubmit(e) {
        e.preventDefault();

        setBoo(false);
        addNewPerson(person, _id)
        .then(res => {
            if(res.status === "Success") {
                setBoo(true);
                onAddEvents(res.person);
                setPerson(pre => ({...pre, name : "", notes : ""}));
                setShowCreateForm(false)
            } else {
                alert(res.message)
            }
        })
        .catch(err => alert(err.message))
    }

    return <>
        <div className="new-event-form">
            <span className="cancel-icon" onClick={() => {
                setShowCreateForm(false);
            }}>
                <ion-icon name="close"></ion-icon>
                </span>
            <form onSubmit={handleSubmit} className="form" >
                <label>Enter birthday person name :</label>
                <div className="field-container">
                    <input type="text" id="name" placeholder="Birthday person name..." value={person.name} required onChange={(e) => {
                        setPerson(pre => ({...pre, name : e.target.value}));
                    }} />
                </div>
                <span className="note">* short name recommended!</span>
                <label>Select birthday person gender :</label>
                <div className="field-container">
                    <select id="gender"  value={person.gender} required onChange={(e) => {
                        setPerson(pre => ({...pre, gender : e.target.value}));
                    }} >
                        <option value={"Male"}>Male</option>
                        <option value={"Female"}>Female</option>
                    </select>
                </div>
                <div className="text-area-container">
                    <textarea id="notes" placeholder="Your greetings for that person..." value={person.notes} required onChange={(e) => {
                        setPerson(pre => ({...pre, notes : e.target.value}));
                    }} />
                </div>
                <div className="btn-container">
                    <button type="submit">{boo ? "CREATE" : <span className="loader"></span>}</button>
                </div>
            </form>
        </div>
    </>
}