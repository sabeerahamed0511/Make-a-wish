import React, { useEffect, useState } from "react";
import { BASE_URL, getSinglePerson, getSinglePersonWishes } from "../utils/api-utils";
import { useParams } from "react-router-dom";

export default function Wishes() {

    const { id } = useParams();

    const [currPerson, setCurrPerson] = useState(null);
    const [list, setList] = useState([]);
    const [boo, setBoo] = useState(true);

    useEffect(() => {

        getSinglePerson(id)
            .then(res => {
                if (res.status === "Success") {
                    setCurrPerson(res.person);

                    getSinglePersonWishes(id)
                        .then(res => {
                            if (res.status === "Success") {
                                setList(res.wishes)
                            } else {
                                alert(res.message);
                            }
                        })
                        .catch(err => alert(err.message))

                } else {
                    alert(res.message);
                }
            })
            .catch(err => alert(err.message))

    }, []);

    return <>
        {
            !currPerson ? 
            <div className="waiting-loader-container"><div className="loader"></div></div> :
            (boo ?
                <div className="my-wish">
                    <blockquote>
                        Hey {currPerson.name},
                        <p>
                            {`${currPerson.notes} `} 
                             And I've received notes from your closest friends and family. I hope you like it!
                        </p>
                        <div>
                            <button onClick={() => setBoo(false)}>Show!</button>
                        </div>
                    </blockquote>
                </div> :
                <div className="notes">
                    {/* <audio src={require("../images/Yen-Endral-Un-Piranthanal(PagalWorldl).mp3")} autoPlay onLoad={(e) => e.target.load()} /> */}
                    {list.map(({ _id, realName, nickNameOfWisher, nickNameOfReciever, message }) => {
                        return <div className="msg" key={_id}>
                            <p className="from">from {nickNameOfWisher} ;</p>
                            <section>
                                <div className="msg-container">
                                    <p className="to">hey {nickNameOfReciever},</p>
                                    <em>"{message}"</em>
                                    <p className="by">- {realName}</p>
                                </div>
                            </section>
                        </div>
                    })}
                </div>)
        }
    </>
}