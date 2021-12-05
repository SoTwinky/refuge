import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Navigation from "../../components/Navigation";
import Logo from "../../components/Logo";
import Header from "../../core/Header";
import axios from "axios";
import $ from "jquery";
import News from "../News";

const Pet = () => {
    const {_id} = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:3003/pets?_id=' + _id)
            .then((res) => {
                setData(res.data);
            });
    }, []);

    return (
        <div id="document" className="interne">
            <Header/>
            <div className="accroche refuge">

                    <div className="texte">
                        <h1>Nom : {data.map(data => (data.name))}</h1>
                    </div>
                    <div className="image">
                        <img src={data.map(data => (data.picture))}/>
                    </div>
            </div>
            <div className="innerCenter">
                <News id={_id}/>
            </div>
        </div>
    );
};


export default Pet;