import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Navigation from "../../components/Navigation";
import Logo from "../../components/Logo";
import Header from "../../core/Header";
import axios from "axios";
import $ from "jquery";
import News from "../News";
import Slider from "react-slick";

const Pet = () => {
    const {_id} = useParams();
    const [data, setData] = useState([]);
    const slider = '';

    useEffect(() => {
        axios
            .get('http://localhost:3003/pets?_id=' + _id)
            .then((res) => {
                setData(res.data);
            });
    }, []);

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    if (data.images) {
        const slider = data.map((item) => {
            return item.images.map((image) => {
                return (
                    <div key={image}><img src={image}/></div>
                )
            })
        });
    }

    return (
        <div id="document" className="interne">
            <Header/>
            <div className="accroche refuge">

                <div className="texte innerCenter">
                    <h1>Nom : {data.map(data => (data.name))}</h1>
                    <p>Age : {data.map(data => (data.age))} {(data.map(data => (data.age)) > 1 ? 'ans' : 'an')}</p>
                    <p>Poids
                        : {data.map(data => (data.weight))} {(data.map(data => (data.weight)) > 1 ? 'kilos' : 'kilo')}</p>
                </div>
                <div className="image">
                    {data.images
                        ?
                        <Slider {...settings}>
                            {slider}
                        </Slider>
                        :
                        <div key={data.image}><img src={data.image}/></div>
                    }
                </div>
            </div>
            <div className="innerCenter">
                <News id={_id}/>
            </div>
        </div>
    );
};


export default Pet;