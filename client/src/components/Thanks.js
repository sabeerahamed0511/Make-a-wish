import React from "react";


export default function Thanks({wisherName, currPerson}) {
    
    return <>
    <div id="thanks-wrapper">
        <div id="thanks-container" >
            <p>
                Thank's <em>{wisherName}</em>, for your response. I will be sure to let <i>{currPerson.name}</i> know what you said.
            </p>
            <div id="disclaimer" >
                    <p>
                        <sup>&#9733;</sup>Hope {currPerson.gender === "Male" ? "his" : "her"} reaction is not like this after seeing your message!!
                    </p>
                    <div id="disclaimer-img">
                        <img src={require("../images/vadivel-Shock.gif")} />
                    </div>
                </div> 
        </div>
    </div>
    </>
}