import { useState, useEffect } from "react";

import "./Card.css";
import dividerDesktop from "../images/pattern-divider-desktop.svg";
import dividerMobile from "../images/pattern-divider-mobile.svg";
import dice from "../images/icon-dice.svg";

export default function Card() {
    const [advice, setAdvice] = useState([]);
    const [id, setId] = useState([]);

    const fetchAdvice = async () => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        await fetch("https://api.adviceslip.com/advice", requestOptions)
            .then((response) => response.json())
            .then((res) => {
                console.log("testing the res: ", res.slip.advice);
                setAdvice(res.slip.advice);
                setId(res.slip.id);
            });
    };

    useEffect(() => {
        fetchAdvice();
    }, []);

    return (
        <div className="container">
            <h1>Advice #{id}</h1>

            <p>"{advice}"</p>

            <picture>
                <source media="(min-width: 768px)" srcSet={dividerDesktop} />
                <img src={dividerMobile} alt="" />
            </picture>

            <div>
                <button
                    onClick={() => {
                        fetchAdvice();
                    }}
                >
                    <img src={dice} alt="" />
                </button>
            </div>
        </div>
    );
}
