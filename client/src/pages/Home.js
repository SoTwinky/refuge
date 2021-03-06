import PetItem from "../components/Pet/PetItem";
import React, {useEffect, useState} from "react";
import axios from "axios";
import RefugeItem from "../components/Refuge/RefugeItem";
import Slider from "react-slick";

const Home = () => {
    const [pets, setPets] = useState([]);
    const [dataTplAccueil, setDataTplAccueil] = useState([]);
    const [refuges, setRefuges] = useState([]);
    useEffect(() => {
        axios
            .get(`http://localhost:4000/api/pet/`)
            .then((res) => {
                setPets(res.data);
            });

        axios
            .get('http://localhost:4000/api/refuge')
            .then((res) => {
                setRefuges(res.data);
            });

        axios
            .get('http://localhost:4000/api/TPL/TPL_ACCUEIL')
            .then((res) => {
                setDataTplAccueil(res.data);
            });
    }, []);

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };
    return (
        <div className="innerCenter">
            <div className="TPL_ACCUEIL">
                <div className="slick">
                    {dataTplAccueil
                        &&
                        <Slider {...settings}>
                            {dataTplAccueil.map((item, i) => {
                                return (
                                    <div key={i} style={"background-url:" + item.image}>
                                        <h2>{item.title}</h2>
                                        <p>{item.resume}</p>
                                        <a href={item.btn_url}>{item.btn_name}</a>
                                    </div>
                                )
                            })}
                        </Slider>
                    }
                </div>
            </div>
            <div>
                <h2>Adopter un animal</h2>
                <ul className="liste_4">
                    {pets
                        .sort((a, b) => a.registered - b.registered)
                        .slice(0, 4)
                        .map((pet) => (
                            <PetItem pet={pet} key={pet.name}/>
                        ))}
                </ul>
            </div>
            <div>
                <h2>Un organisme certifi??</h2>
                <p>Tous nos refuges sont v??rifi??s et approuv??s par nos ??quipes pour vous assurer le bon d??roulement dans
                    vos recherches et un vrai suivi lors de vos adoptions.</p>
            </div>
            <div className="MISENAVANT_ORANGE">
                <h2>Participer ?? un projet</h2>
                <ul className="liste_3">
                    <li className="item">Projet 1</li>
                    <li className="item">Projet 1</li>
                    <li className="item">Projet 1</li>
                </ul>
            </div>
            <div>
                <h2>Soutenir un refuge</h2>
                <ul className="liste_4">
                    {refuges
                        .sort((a, b) => a.registered - b.registered)
                        .slice(0, 4)
                        .map((refuge) => (
                            <RefugeItem refuge={refuge} key={refuge.name}/>
                        ))}
                </ul>
            </div>
            <div className="MISENAVANT_ORANGE">
                <h2>D??couvrir la boutique</h2>
                <ul className="liste_5">
                    <li className="item">Objet 1</li>
                    <li className="item">Objet 1</li>
                    <li className="item">Objet 1</li>
                    <li className="item">Objet 1</li>
                    <li className="item">Objet 1</li>
                </ul>
            </div>
        </div>
    )
};

export default Home;