import React, {useEffect, useState} from 'react';
import SimpleBreadcrumbs from "../../components/Breadcrumbs";
import DeletePet from "../Delete/DeletePet";
import {useParams} from "react-router-dom";
import axios from "axios";
import {updateRefuge} from "../../actions/refuge.actions";
import {useDispatch} from "react-redux";

const EditPet = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [pet, setPet] = useState([]);
    const [form, setForm] = useState([]);
    const [editedName, setEditedName] = useState("");
    const [editedCountry, setEditedCountry] = useState("");
    const [error, setError] = useState(false);
    const pageName = 'Gestion des animaux';
    const options = {
        items: [
            {to: "/super-admin", label: "Administrateur"}
        ]
    };

    useEffect(() => {
        axios
            .get('http://localhost:4000/api/pet/' + id)
            .then((res) => {
                setPet(res.data);
            });

        axios
            .get('http://localhost:4000/api/formAdoption/')
            .then((res) => {
                setForm(res.data);
            });
    }, []);

    const handleEdit = () => {
        let name = editedName ? editedName : pet.name;
        let country = editedCountry ? editedCountry : pet.country;
        dispatch(updateRefuge(pet._id, name, country))
            .then(() => {
                window.location.replace(`http://localhost:3000/pet/` + name.replace(/ /g, "_").toLowerCase())
            });
    };

    return (
        <div className="innerCenter">
            <SimpleBreadcrumbs options={options} pageName={pageName}/>
            <h1>Voici la fiche de {pet.name}</h1>
            <div>
                <h2>Gestion des informations principales :</h2>
                <form
                    onSubmit={(e) => handleEdit(e)}>

                    <label>Nom de l'animal :</label>
                    <input style={{border: error ? "1px solid red" : "1px solid #61dafb"}} placeholder="Name"
                           type="text" id="" cols="30" rows="10" onChange={(e) => setEditedName(e.target.value)}
                           autoFocus
                           defaultValue={editedName ? editedName : pet.name}/>
                    {error && <p>Veuillez écrire un maximum de 140 caractères</p>}

                    <br/>
                    <label>Url :</label>
                    <input style={{border: error ? "1px solid red" : "1px solid #61dafb"}} placeholder="Country"
                           type="text" id="" cols="30" rows="10" onChange={(e) => setEditedCountry(e.target.value)}
                           autoFocus defaultValue={editedCountry ? editedCountry : pet.country}/>

                    <br/>

                    <div className="flexCenter">
                        <DeletePet pet={pet}/><input type="submit" value="Envoyer"/>
                    </div>
                </form>
            </div>
            <div>
                <h2>Liste des demandes d'adoption :</h2>
                <ul className="liste_1">
                    {form
                        .filter((item) => {
                            if (item.refuge === id) {
                                if (item.formAdoption.length > 0) {
                                    return item;
                                }
                            }
                        })
                        .sort((a, b) => b.id - a.id)
                        .slice(0, 100)
                        .map((item) => (
                            <li className="item" key={item._id}>
                                <div className="itemInfo">
                                    <h3>
                                        <a href={"/super-admin/edit-pet/" + item._id}
                                           key={item.name.id}>{item.name}</a>
                                    </h3>
                                    <span>Age: {item.age}</span><br/>
                                    <span>Sexe: {item.gender}</span>
                                    <span>Nombre de demandes d'adoption : {item.formAdoption.length}</span>
                                    Au clic, il faut arriver sur une liste des formulaires d'infos + adoption
                                </div>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default EditPet;