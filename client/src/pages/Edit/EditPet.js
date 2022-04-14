import React, {useEffect, useState} from 'react';
import SimpleBreadcrumbs from "../../components/Breadcrumbs";
import {useParams} from "react-router-dom";
import axios from "axios";
import {updatePet} from "../../actions/pet.actions";
import {useDispatch} from "react-redux";
import DeletePet from "../Delete/DeletePet";

const EditPet = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [pet, setPet] = useState([]);
    const [form, setForm] = useState([]);
    const [name, setName] = useState(pet.name);
    const [eyeColor, setEyeColor] = useState(pet.eyeColor);
    const [color, setColor] = useState(pet.color);
    const [age, setAge] = useState(pet.age);
    const [weight, setWeight] = useState(pet.weight);
    const [gender, setGender] = useState(pet.gender);
    const [picture, setPicture] = useState(pet.picture);
    const [about, setAbout] = useState(pet.about);
    const pageName = 'Gestion des animaux';
    const options = {
        items: [
            {to: "/admin", label: "Administrateur"}
        ]
    };

    useEffect(() => {
        axios
            .get('http://localhost:4000/api/pet/' + id)
            .then((res) => {
                setPet(res.data);
                setName(res.data.name);
                setGender(res.data.gender);
            });

        axios
            .get('http://localhost:4000/api/formAdoption/')
            .then((res) => {
                setForm(res.data);
            });
    }, [id]);

    const handleEdit = () => {
        dispatch(updatePet(pet._id, name, eyeColor, color, age, weight, gender, picture, about))
            .then(() => {
                window.location.replace(`http://localhost:3000/super-admin/edit-pet/` + pet.id)
            });
    };

    const handleChange = (event) => {
        setGender(event.target.value);
    };

    return (
        <div className="innerCenter admin">
            <h1>Voici la fiche de {pet.name}</h1>
            <div className="flexBetween ariane">
                <SimpleBreadcrumbs options={options} pageName={pageName}/>
                <DeletePet pet={pet} refuge={id}/>
            </div>
            <div className="TPL_FORM_EDIT_PET">
                <h2>Informations sur l'animal :</h2>
                <form
                    onSubmit={(e) => handleEdit(e)}>
                    <p>
                        <label>Nom :</label>
                        <input placeholder="Nestor"
                               type="text" id="" cols="30" rows="10" onChange={(e) => setName(e.target.value)}
                               defaultValue={name ? name : pet.name} required/>
                    </p>
                    <p>
                        <label>Couleur des yeux :</label>
                        <input placeholder="Bleu"
                               type="text" id="" cols="30" rows="10" onChange={(e) => setEyeColor(e.target.value)}
                               defaultValue={eyeColor ? eyeColor : pet.eyeColor} />
                    </p>
                    <p>
                        <label>Couleur :</label>
                        <input placeholder="Brun"
                               type="text" id="" cols="30" rows="10" onChange={(e) => setColor(e.target.value)}
                               defaultValue={color ? color : pet.color} />
                    </p>
                    <p>
                        <label>Age :</label>
                        <input placeholder="12 ans"
                               type="text" id="" cols="30" rows="10" onChange={(e) => setAge(e.target.value)}
                               defaultValue={age ? age : pet.age} />
                    </p>
                    <p>
                        <label>Poids :</label>
                        <input placeholder="30 kilos"
                               type="text" id="" cols="30" rows="10" onChange={(e) => setWeight(e.target.value)}
                               defaultValue={weight ? weight : pet.weight} />
                    </p>
                    <div className="radio">
                        <span className="label">Sexe :</span>
                        <div onChange={(e) => setGender(e.target.value)}>
                            <input type="radio" id="Masculin" name="sexe" value="Masculin" checked={gender === "Masculin"} onChange={handleChange}/>
                            <label htmlFor="Masculin" className="radio">Masculin</label>
                            <input type="radio" id="Feminin" name="sexe" value="Feminin" checked={gender === "Feminin"} onChange={handleChange}/>
                            <label htmlFor="Feminin" className="radio">Feminin</label>
                        </div>
                    </div>
                    <p>
                        <label htmlFor="avatar">Image :</label>
                        <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" onChange={(e) => setPicture(e.target.value)}
                               defaultValue={picture ? picture : pet.picture } />
                    </p>
                    <p>
                        <label htmlFor="aPropos">À propos :</label>
                        <textarea placeholder="Je suis au refuge depuis..."
                                  type="text" id="aPropos" name="aPropos" onChange={(e) => setAbout(e.target.value)}
                                  defaultValue={about ? about : pet.about } />
                    </p>

                    <input className="btn_send" type="submit" value="Envoyer"/>
                </form>
            </div>
            <div>
                <h2>Liste des demandes d'adoption :</h2>
                <ul className="liste_1">
                    {form
                        .filter((item) => {
                            if (item.pet_id === id) {
                                return item;
                            }
                            return false;
                        })
                        .sort((a, b) => b.id - a.id)
                        .slice(0, 100)
                        .map((item) => (
                            <li className="item" key={item._id}>
                                <div className="itemInfo">
                                    <h3>
                                        <a href={"/super-admin/formAdoption/" + item.adoptant_id}
                                           key={item.name.id}>{item.name}</a>
                                    </h3>
                                </div>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default EditPet;