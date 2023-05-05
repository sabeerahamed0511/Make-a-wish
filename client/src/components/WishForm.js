import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Wish } from "../contexts/WishContext";
import { addWish, getSinglePerson } from "../utils/api-utils";
import Thanks from "./Thanks";



export default function WishForm({id, currPerson}) {

    const { addName } = useContext(Wish);
    const [save, setSave] = useState("");
    const [boo, setBoo] = useState(true);
    const [loader, setLoader] = useState(false);
    const [showThanks, setShowThanks] = useState(false);

    const [wisherName, setWisherName] = useState("")
    const [data, setData] = useState({
        realName: "",
        nickNameOfWisher: "",
        nickNameOfReciever: "",
        message: "",
        personId: id
    })

    function formValidation(e) {
        e.preventDefault();
        setWisherName(data.realName);
        setLoader(true);
        addName(data.realName);
        addWish(data)
            .then(res => {
                if (res.status === "Success") {
                    setData({
                        realName: "",
                        nickNameOfWisher: "",
                        nickNameOfReciever: "",
                        message: ""
                    });

                    setSave("save");
                    setTimeout(() => {
                        setBoo(false)
                        setTimeout(() => {
                            setLoader(false);
                            setBoo(true);
                            setSave("");
                            setShowThanks(true)
                        }, 1500);
                    }, 500);
                } else {
                    alert(res.message);
                }
            })
            .catch(err => alert(err.message))
    }
    return <>
        {
            !showThanks ?
                <div id="form-container" >
                    {
                        (currPerson &&
                            (boo ?
                                <form id="form" className={save} onSubmit={formValidation}>
                                    <div className="field-container" >
                                        <input type="text" id="realName" name="realName" required
                                            value={data.realName}
                                            onChange={(e) => setData(pre => ({ ...pre, realName: e.target.value }))} />
                                        <label htmlFor="realName" >Your Name...</label>
                                    </div>
                                    <div className="field-container" >
                                        <input type="text" id="nickNameOfWisher" name="nickNameOfWisher" required
                                            value={data.nickNameOfWisher}
                                            onChange={(e) => setData(pre => ({ ...pre, nickNameOfWisher: e.target.value }))} />
                                        <label htmlFor="nickNameOfWisher" >How {currPerson.gender === "Male" ? "he" : "she"} call you...</label>
                                    </div>
                                    <div className="field-container" >
                                        <input type="text" id="nickNameOfReciever" name="nickNameOfReciever" required
                                            value={data.nickNameOfReciever}
                                            onChange={(e) => setData(pre => ({ ...pre, nickNameOfReciever: e.target.value }))} />
                                        <label htmlFor="nickNameOfReciever" >How you call {currPerson.gender === "Male" ? "him" : "her"}...</label>
                                    </div>
                                    <div className="textarea-container" >
                                        <textarea type={"textarea"} id="message" name="message" required
                                            value={data.message}
                                            onChange={(e) => setData(pre => ({ ...pre, message: e.target.value }))} />
                                        <label htmlFor="message" >Wish {currPerson.gender === "Male" ? "him" : "her"}...</label>
                                    </div>
                                    {!loader ?
                                        <div className="submit-btn" >
                                            <button type="submit" >Send</button>
                                        </div> :
                                        <div id="loader-preview">
                                            <div id="loader-container">
                                                <span id="loader"></span>
                                            </div>
                                        </div>
                                    }
                                </form> :
                                <div id="rocket">
                                   <span><img src={require("../images/rocket.webp")} /></span>
                                </div>))

                    }
                </div>
                :
                <Thanks wisherName={wisherName} currPerson={currPerson} />
        }
    </>
}