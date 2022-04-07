import React, {useEffect, useState} from 'react';
import SimpleBreadcrumbs from "../../components/Breadcrumbs";
import {useDispatch} from "react-redux";
import {createPet} from "../../actions/pet.actions";
import DeletePet from "../Delete/DeletePet";
import {useParams} from "react-router-dom";

const NewPet = () => {
    const [name, setName] = useState("");
    const [eyeColor, setEyeColor] = useState("");
    const [color, setColor] = useState("");
    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const [gender, setGender] = useState("");
    const [picture, setPicture] = useState();
    const [about, setAbout] = useState("");
    const [error, setError] = useState(false);
    const pageName = 'Nouvel animal';
    const options = {
        items: [
            {to: "/profil", label: "Profil"},
            {to: "/super-admin", label: "Super Administrateur"}
        ]
    };
    const dispatch = useDispatch();
    const refuge = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (name.length > 140) {
            setError(true);
        } else {
            dispatch(createPet(name, eyeColor, color, age, weight, gender, picture, refuge.id, about))
                .then(() => {
                    window.location.replace(`http://localhost:3000/super-admin/edit-refuge/` + refuge.id)
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
                        <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" onChange={(e) => setPicture(e.target.value)}/>
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