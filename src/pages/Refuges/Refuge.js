import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from "axios";
import Header from "../../core/Header";
import HeaderRefuge from "../../core/Refuge/HeaderRefuge";
import PetsRefuge from "../../components/PetsRefuge";
import Pet_Item from "../../components/Pet_Item";
import $ from "jquery";

const Refuge = () => {
    const {url} = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:3003/refuges?url=' + url)
            .then((res) => {
                setData(res.data);
            });
    }, []);

    return (
        <div id="document" className="interne menuRefuge">
            <Header/>
            <HeaderRefuge/>
            <div id="contenu">
                <div className="accroche" style={{backgroundImage: `url(${data.map(data => (data.picture))})`}}>
                    <div className="innerCenter">
                        <div className="bloc">
                            <div className="texte">
                                <h1>Url : {url}</h1>
                                <h1>Refuge : {data.map(data => (data.name))}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="innerCenter">
                    <div>
                        <h2>En quelques mots</h2>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                            been
                            the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                            galley
                            of type and scrambled it to make a type specimen book. It has survived not only five
                            centuries,
                            but also the leap into electronic typesetting, remaining essentially unchanged. It was
                            popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
                            passages,
                            and more recently with desktop publishing software like Aldus PageMaker including versions
                            of
                            Lorem Ipsum.
                        </p>
                    </div>
                    <div>
                        <h2>Les activités du refuge</h2>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                            been
                            the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                            galley
                            of type and scrambled it to make a type specimen book. It has survived not only five
                            centuries,
                            but also the leap into electronic typesetting, remaining essentially unchanged. It was
                            popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
                            passages,
                            and more recently with desktop publishing software like Aldus PageMaker including versions
                            of
                            Lorem Ipsum.
                        </p>
                    </div>
                    <PetsRefuge refuge={data.map(data => (data.id))} key={data.id}/>
                </div>
            </div>
        </div>
    );
};

$( document ).ready(function() {
    if ($("#document").hasClass('menuRefuge')) {
        $("#bandeauHaut").removeClass('menu');
        $("#menuRefuge").appendTo($("#bandeauHaut"));
        $("#menuSite").addClass('refuge');
    }
});

export default Refuge;