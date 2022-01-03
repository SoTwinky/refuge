import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from "axios";
import News from "../News";
import Slider from "react-slick";
import FollowHandler from "../../components/FollowHandler";

const Pet = () => {
    const {_id} = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:4000/api/pet/' + _id)
            .then((res) => {
                setData(res.data);
            })
            .catch(err => {console.log(err)});
    }, []);

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div id="document" className="interne">
            <div className="accroche refuge">

                <div className="texte innerCenter">
                    <h1>Nom : {data.name}</h1>
                    <p>Age : {data.age} {(data.age > 1 ? 'ans' : 'an')}</p>
                    <p>Poids
                        : {data.weight} {(data.weight > 1 ? 'kilos' : 'kilo')}</p>
                    <FollowHandler idToFollow={_id}/>
                </div>
                <div className="image">
                    {data.images
                        ?
                        <Slider {...settings}>
                            {data.images.map((image, i) => {
                                return (
                                    <div key={image}><img src={image} alt={'Photo' + data.name}/></div>
                                )})}
                        </Slider>
                        :
                        <div key={data.image}><img src={data.image} alt={'Photo' + data.name}/></div>
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