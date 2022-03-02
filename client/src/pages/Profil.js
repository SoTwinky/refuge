import React, {useContext} from "react";
import {useSelector} from "react-redux";
import {UidContext} from "../components/AppContext";
import Logout from "../components/Log/Logout";
import Slider from "react-slick";
import $ from "jquery";
import PetsFavorites from "./Profil/PetsFavorites";

const Profil = () => {
    const userData = useSelector((state) => state.userReducer);
    const uid = useContext(UidContext);

    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true
    };

    $(document).ready(function () {
            $(".randomColor").each(function() {
                var h = 25;
                var s = Math.floor(Math.random() * 147) + 127;
                var l = Math.floor(Math.random() * 255) + 240;
                this.style.backgroundColor = 'rgb(' + h + ', ' + s + ', ' + l + ')';
            });
        });

    return (
        <div className="innerCenter">
            <h1>Bonjour {userData.pseudo},</h1>
            <p>Ici, vous retrouverez vos raccourcis et votre profil ! </p>
            <div className="mBot">
                <h2>Mes raccourcis :</h2>
                <div className="relative">
                    <Slider {...settings} className="liste_slick ul_slider">
                        <div className="item randomColor">
                            <a href="/super-admin"><span>Super Administrateur</span></a>
                        </div>
                        <div className="item randomColor">
                            <a href="/admin"><span>Administrateur</span></a>
                        </div>
                        <div className="item randomColor">
                            <a href="/admin"><span>Mes refuges favoris</span></a>
                        </div>
                        <div className="item randomColor">
                            <button onClick={PetsFavorites}><span>Mes animaux favoris</span></button>
                        </div>
                        <div className="item randomColor">
                            <a href="/profil/pets"><span>Mes animaux favoris</span></a>
                        </div>
                    </Slider>
                </div>
            </div>
            <div>
                <h2>Mon profil :</h2>
                <div className="relative">
                    <Slider {...settings} className="liste_slick ul_slider">
                        <div className="item randomColor">
                            <a href="/admin" className="user"><span>Mon profil</span></a>
                        </div>
                        <div className="item randomColor">
                            <a href="/admin"><span>Mes coordonnées</span></a>
                        </div>
                        <div className="item randomColor">
                            <a href="/admin"><span>Mes informations</span></a>
                        </div>
                        <div className="item randomColor">
                            <a href="/admin"><span>Mon historique</span></a>
                        </div>
                        <div className="item randomColor">
                            <a href="/admin"><span>Ma feuille d'imposition</span></a>
                        </div>
                    </Slider>
                </div>
            </div>
            <div className="ul_slider mBot">
                <Logout uid={uid}/>
            </div>
        </div>
    );
};

export default Profil;