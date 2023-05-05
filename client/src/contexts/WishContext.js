import React, { createContext, useState } from "react";

export const Wish = createContext();

export default function WishContext({children}) {
    const [name, setName] = useState("");
    const [events, setEvents] = useState([]);



    return <>
    <Wish.Provider value={{
        name,
        addName : (e) => setName(e),
        events,
        onAddEvents : (data) => {
            setEvents(pre => ([data, ...pre]));
        },
        onInitialAddEvents : (data) => {
            setEvents(data);
        },
        onDeleteEvent : (id) => {
            setEvents(pre => {
                return pre.filter(({_id}) => _id !== id);
            })
        }
    }} >
        {children}
    </Wish.Provider>
    </>
}