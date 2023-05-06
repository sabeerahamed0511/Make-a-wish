import React from "react";

export default function Instruction() {

    return <>
    <h2 className="ins-title">Instructions :</h2>
    <div className="instruction-container">
        <div className="ins-icon-container">
        <ion-icon name="add-circle"></ion-icon>
        </div>
        <div className="ins-note">
        By clicking on this icon, it will open pop-up for create new event.
        </div>
    </div>

    <div className="instruction-container">
        <div className="ins-icon-container">
        <ion-icon name="home"></ion-icon>
        </div>
        <div className="ins-note">
        By clicking on this icon, it will re-direct you to home page.
        </div>
    </div>

    <div className="instruction-container">
        <div className="ins-icon-container">
        <ion-icon name="log-out-outline"></ion-icon>
        </div>
        <div className="ins-note">
        By clicking on this icon, it will logout from account.
        </div>
    </div>

    <div className="instruction-container">
        <div className="ins-icon-container">
        <span className="ins-icon-text">Add-a-wish</span>
        </div>
        <div className="ins-note">
        By clicking on this link, it will open new window, there you can add greetings for the birthday person. Copy the URL and share with friends & family, from whom you want to gather greetings. 
        </div>
    </div>

    <div className="instruction-container">
        <div className="ins-icon-container">
        <ion-icon name="eye"></ion-icon>
        </div>
        <div className="ins-note">
        By clicking on this icon, it will show all the greetings gathered for that person. If you see any greetings having foul language or inappropriate message, you can delete that particular greeting.
        </div>
    </div>

    <div className="instruction-container">
        <div className="ins-icon-container">
        <ion-icon name="link"></ion-icon>
        </div>
        <div className="ins-note">
        By clicking on this icon, it will copy the URL to your clipboard. In case your browser not support this function, it will open pop-up there u can copy the URL. ( This is the URL, u have to share with the birthday person on appropriate day & time.)
        </div>
    </div>

    <div className="instruction-container">
        <div className="ins-icon-container">
        <ion-icon name="trash"></ion-icon>
        </div>
        <div className="ins-note">
        By clicking on this icon, it will delete the greetings.
        </div>
    </div>


    </>
}