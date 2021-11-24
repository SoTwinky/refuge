import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Navigation from "../../components/Navigation";
import Logo from "../../components/Logo";
import Header from "../../core/Header";
import axios from "axios";
import $ from "jquery";

const Pet = () => {
    const { _id } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:3003/dogs?_id=' + _id)
            .then((res) => {
                setData(res.data);
            });
    }, []);

    return (
        <div id="document" className="interne">
            <Header/>
            <h1>Url : {_id}</h1>
            <h1>Nom : {data.map(data => (data.name))}</h1>
            <h1><img src={data.map(data => (data.picture))}/></h1>
        </div>
    );
};


export default Pet;