import React, {useEffect, useState} from 'react';
import SimpleBreadcrumbs from "../../components/Breadcrumbs";
import {useDispatch} from "react-redux";
import {createPet} from "../../actions/pet.actions";
import {useParams} from "react-router-dom";
import axios from "axios";

const NewPet = () => {
    const [name, setName] = useState("");
    const [eyeColor, setEyeColor] = useState("");
    const [color, setColor] = useState("");
    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const [gender, setGender] = useState("");
    const [picture, setPicture] = useState();
    const [about, setAbout] = useState("");
    const [refuge, setRefuge] = useState("");
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const refugeId = useParams();
    const pageName = 'Nouvel animal';
    const options = {
        items: [
            {to: "/admin", label: "Administrateur"},
            {to: "/admin/edit-refuge/" + refugeId.id, label: refuge.name}
        ]
    };

    useEffect(() => {
        axios
            .get('http://localhost:4000/api/refuge/' + refugeId.id)
            .then((res) => {
                setRefuge(res.data);
            })
            .catch(err => {
                return err;
            });
    }, [refugeId.id]);

    useEffect(() => {
        window.fbAsyncInit = () => {
            window.FB.init({
                appId: refuge.facebook_appId,
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v11.0'
            });
        };
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/all.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }, [refuge]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (name.length > 140) {
            setError(true);
        } else {
            dispatch(createPet(name, eyeColor, color, age, weight, gender, picture, refugeId.id, about))
                .then(() => {
                    if (refuge.facebook_appId) {
                        window.FB.api(
                            '/' + refuge.facebook_appId + '/photos',
                            'POST',
                            {
                                "message": "Nouvel animal :" + name,
                                "url": "https://www.freepng.fr/static/img/logo.png",
                                "access_token": refuge.facebook_appToken
                            },
                            function (response) {
                                console.log(response);
                            }
                        )
                    }

                    window.location.replace(`http://localhost:3000/super-admin/edit-refuge/` + refuge.id)
                })
                .catch(error => {
                    console.log(error);
                });

            setError(false);
        }
    };
    return (
        <div className="innerCenter admin">
            <h1>Nouvel animal</h1>
            <SimpleBreadcrumbs options={options} pageName={pageName}/>
            <div className="TPL_FORM_NEW_PET">
                <h2>Informations sur l'animal :</h2>
                <form
                    onSubmit={(e) => handleSubmit(e)}>
                    <p>
                        <label>Nom :</label>
                        <input style={{border: error ? "1px solid red" : "1px solid #61dafb"}} placeholder="Nestor"
                               type="text" id="" cols="30" rows="10" onChange={(e) => setName(e.target.value)}/>
                        {error && <p>Veuillez écrire un maximum de 140 caractères</p>}
                    </p>
                    <p>
                        <label>Couleur des yeux :</label>
                        <input placeholder="Bleu"
                               type="text" id="" cols="30" rows="10" onChange={(e) => setEyeColor(e.target.value)}/>
                    </p>
                    <p>
                        <label>Couleur :</label>
                        <input placeholder="Brun"
                               type="text" id="" cols="30" rows="10" onChange={(e) => setColor(e.target.value)}/>
                    </p>
                    <p>
                        <label>Age :</label>
                        <input placeholder="12 ans"
                               type="text" id="" cols="30" rows="10" onChange={(e) => setAge(e.target.value)}/>
                    </p>
                    <p>
                        <label>Poids :</label>
                        <input placeholder="30 kilos"
                               type="text" id="" cols="30" rows="10" onChange={(e) => setWeight(e.target.value)}/>
                    </p>
                    <div className="radio">
                        <span className="label">Sexe :</span>
                        <div onChange={(e) => setGender(e.target.value)}>
                            <input type="radio" id="Masculin" name="sexe" value="Masculin" defaultChecked/>
                            <label htmlFor="Masculin" className="radio">Masculin</label>
                            <input type="radio" id="Feminin" name="sexe" value="Feminin"/>
                            <label htmlFor="Feminin" className="radio">Feminin</label>
                        </div>
                    </div>
                    <p>
                        <label htmlFor="avatar">Image :</label>
                        <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg"
                               onChange={(e) => setPicture(e.target.value)}/>
                    </p>
                    <p>
                        <label htmlFor="aPropos">À propos :</label>
                        <textarea placeholder="Je suis au refuge depuis..."
                                  type="text" id="aPropos" name="aPropos" onChange={(e) => setAbout(e.target.value)}/>
                    </p>

                    <input className="btn_send" type="submit" value="Envoyer"/>
                </form>
            </div>
        </div>
    );
};

export default NewPet;