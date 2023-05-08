import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getSinglePerson } from "../utils/api-utils";
import WishForm from "./WishForm";

export default function Home() {
    const { id, name } = useParams();

    const [anime, setAnime] = useState("");
    const [currPerson, setCurrPerson] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState(false);


    useEffect(() => {
        getSinglePerson(id)
            .then(res => {
                if (res.status === "Success") {
                    setLoader(false);
                    setCurrPerson(res.person);
                } else {
                    setLoader(false);
                    setError(true);
                }
            })
            .catch(err => alert(err.message))
    }, []);

    function AddAnime() {
        setAnime("homeAnime");
        setTimeout(() => setShowForm(true), 200);
    }

    return <>
        {
            loader ?
                <div className="waiting-loader-container"><div className="loader"></div></div>
                :
                error ?
                    <p className="error-text-container">
                        Please check the URL!<br />Or<br />Link may be expired!<br />&#9785;
                    </p>
                    :
                    (<div className="lap-container">
                        {
                            !showForm ?
                                (currPerson &&
                                    <div id="home-wrapper" >
                                        <div id="container" className={anime}>
                                            <p>
                                                Hello, this is make-a-wish. I'm here to remind you that <em>{currPerson.name}'s birthday</em> is comming soon, so because of our busy schedules, we may forget to wish on time. Nevertheless, you can share your wishes here, and I'll share them with {currPerson.gender === "Male" ? "him" : "her"} at the appropriate time and day <span>&#10083;</span>
                                            </p>
                                            <div id="btn-container">
                                                <button onClick={AddAnime}>Wish here &#9755;</button>
                                            </div>
                                        </div>
                                    </div>)
                                :
                                <WishForm id={id} currPerson={currPerson} />
                        }
                    </div>
                    )
        }
    </>
}