import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSinglePersonWishes } from "../utils/api-utils";
import { getToken } from "../utils/storage-utills";
import EachWishCard from "./EachWishCard";

export default function WishCard() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [list, setList] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        if (!getToken()) return navigate("../../login");

        getSinglePersonWishes(id)
            .then(res => {
                if (res.status === "Success") {
                    setLoader(false);
                    setList(res.wishes)
                } else {
                    alert(res.message);
                }
            })
            .catch(err => alert(err.message))
    }, []);

    return <>
        {
            loader ?
                <div className="loader"></div>
                :
                <>
                    <div className="msg">
                        <p className="from">from (Nick Name Of Wisher) ;</p>
                        <section>
                            <div>
                                <p className="to">hey (Nick Name Of Birthday Person),</p>
                                <em>" This is sample card ( Greeting )"</em>
                                <p className="by">- (Real Name Of Wisher)</p>
                            </div>
                        </section>
                    </div>
                    {list.map((each) => {
                        return <EachWishCard greeting={each}
                            onGreetingDelete={(id) => {
                                setList(pre => {
                                    return pre.filter(({ _id }) => _id !== id);
                                })
                            }
                            } />
                    })}
                </>
        }
    </>
}