import React, { useState } from "react";
import { deleteSingleWish } from "../utils/api-utils";

export default function EachWishCard({ greeting, onGreetingDelete }) {
    const { _id, realName, nickNameOfWisher, nickNameOfReciever, message } = greeting;

    const [showDelete, setShowDelete] = useState(false);

    function handleDelete(id) {
        deleteSingleWish(id)
            .then(res => {
                if (res.status === "Success") {
                    onGreetingDelete(id);
                    setShowDelete(false);
                } else {
                    alert(res.message);
                }
            })
            .catch(err => alert(err.message))
    }

    return <>
        <div className="msg" key={_id}>
            <p className="from">
                <span>
                    from {nickNameOfWisher} ;
                </span>
                <div className="icon-container" >
                    <span onClick={() => {
                        setShowDelete(true);
                    }}><ion-icon name="trash"></ion-icon></span>
                    {
                        showDelete &&
                        <div className="delete-confirmation" >
                            Are u sure?<br />Deleteing may leads to remove this greeting permanently!
                            <div className="delete-btn-container" >
                                <button onClick={() => {
                                    handleDelete(_id);
                                }}><ion-icon name="checkmark-done"></ion-icon></button>
                                <button onClick={() => {
                                    setShowDelete(false);
                                }}><ion-icon name="close"></ion-icon></button>
                            </div>
                        </div>
                    }
                </div>
            </p>
            <section>
                <div className="msg-container">
                    <p className="to">hey {nickNameOfReciever},</p>
                    <em>"{message}"</em>
                    <p className="by">- {realName}</p>
                </div>
            </section>
        </div>
    </>
}