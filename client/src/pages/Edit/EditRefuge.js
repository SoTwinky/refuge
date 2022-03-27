import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {updateRefuge} from "../../actions/refuge.actions";
import SimpleBreadcrumbs from "../../components/Breadcrumbs";
import {useParams} from "react-router-dom";
import axios from "axios";
import DeleteRefuge from "../Delete/DeleteRefuge";

const EditRefuge = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [refuge, setRefuge] = useState("");
    const [pets, setPets] = useState([]);
    const [indexPets, setIndexPets] = useState(3);
    const [searchTermPets, setSearchTermPets] = useState('');
    const [editedName, setEditedName] = useState("");
    const [editedCountry, setEditedCountry] = useState("");
    const [error, setError] = useState(false);
    const pageName = 'Éditer le refuge';
    const options = {
        items: [
            {to: "/profil", label: "Profil"},
            {to: "/super-admin", label: "Administrateur"}
        ]
    };

    useEffect(() => {
        axios
            .get('http://localhost:4000/api/refuge/' + id)
            .then((res) => setRefuge(res.data))

        axios
            .get('http://localhost:4000/api/pet')
            .then((res) => {
                setPets(res.data);
            });

    }, []);

    const handleEdit = () => {
        let name = editedName ? editedName : refuge.name;
        let country = editedCountry ? editedCountry : refuge.country;
        dispatch(updateRefuge(refuge._id, name, country))
            .then(() => {
                window.location.replace(`http://localhost:3000/refuge/` + name.replace(/ /g, "_").toLowerCase())
            });
    };

    return (
        <div className="innerCenter">
            <SimpleBreadcrumbs options={options} pageName={pageName}/>
            <h1>Bienvenue aux administateurs du refuge : {refuge.name}</h1>
            <div>
                <h2>Gestion des informations principales :</h2>
                <form
                    onSubmit={(e) => handleEdit(e)}>

                    <label>Nom du refuge :</label>
                    <input style={{border: error ? "1px solid red" : "1px solid #61dafb"}} placeholder="Name"
                           type="text" id="" cols="30" rows="10" onChange={(e) => setEditedName(e.target.value)} autoFocus
                           defaultValue={editedName ? editedName : refuge.name}/>
                    {error && <p>Veuillez écrire un maximum de 140 caractères</p>}

                    <br/>
                    <label>Url :</label>
                    <input style={{border: error ? "1px solid red" : "1px solid #61dafb"}} placeholder="Country"
                           type="text" id="" cols="30" rows="10" onChange={(e) => setEditedCountry(e.target.value)}
                           autoFocus defaultValue={editedCountry ? editedCountry : refuge.country}/>

                    <br/>
                    <label>Pays :</label>
                    <input style={{border: error ? "1px solid red" : "1px solid #61dafb"}} placeholder="Country"
                           type="text" id="" cols="30" rows="10" onChange={(e) => setEditedCountry(e.target.value)}
                           autoFocus defaultValue={editedCountry ? editedCountry : refuge.country}/>

                    <br/>
                    <label>Image :</label>
                    <input style={{border: error ? "1px solid red" : "1px solid #61dafb"}} placeholder="Country"
                           type="text" id="" cols="30" rows="10" onChange={(e) => setEditedCountry(e.target.value)}
                           autoFocus defaultValue={editedCountry ? editedCountry : refuge.country}/>

                    <div className="flexCenter">
                        <DeleteRefuge refuge={refuge}/><input type="submit" value="Envoyer"/>
                    </div>
                </form>
            </div>
            <div>
                <h2>Liste des demandes d'adoption :</h2>
                <ul className="liste_1">
                    {pets
                        .filter((item) => {
                            if(item.refuge === id) {
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
            <div>
                <h2>Gestion des animaux :</h2>
                <ul>
                    <div id={'section_'} className="section-hidden">
                        <div className="searchBar">
                            <label>Recherche</label>
                            <input type="text" placeholder="Search..." onChange={event => {
                                setSearchTermPets(event.target.value)
                            }}/>
                        </div>
                        <ul className="liste_4">
                            <li className="item first add_item">
                                <div className="itemInfo">
                                    <a href="/super-admin/new-pet"><span className="visuallyhidden">Ajouter</span></a>
                                </div>
                            </li>
                            {pets
                                .filter((item) => {
                                    if(item.refuge === id) {
                                        if (searchTermPets === "") {
                                            return item;
                                        } else if (item.name?.toLowerCase().includes(searchTermPets.toLowerCase())) {
                                            return item;
                                        }
                                    }

                                    return false;
                                })
                                .sort((a, b) => b.id - a.id)
                                .slice(0, indexPets)
                                .map((item) => (
                                    <li className="item" key={item._id}>
                                        <div className="visuel">
                                            <img src={item.picture} alt={'Photo' + item.pseudo}/>
                                        </div>
                                        <div className="itemInfo">
                                            <h3>
                                                <a href={"/super-admin/edit-pet/" + item._id}
                                                   key={item.name.id}>{item.name}</a>
                                            </h3>
                                            <span>Age: {item.age}</span><br/>
                                            <span>Sexe: {item.gender}</span>
                                        </div>
                                    </li>
                                ))}
                        </ul>
                        {indexPets < pets.filter((item) => {
                            if(item.refuge === id) {
                                if (searchTermPets === "") {
                                    return item;
                                } else if (item.name?.toLowerCase().includes(searchTermPets.toLowerCase())) {
                                    return item;
                                }
                            }

                            return false;
                        }).length &&
                        <div className="flexCenter">
                            <button className="voirPlus" onClick={() => setIndexPets(indexPets + 8)}>Voir plus</button>
                        </div>
                        }
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default EditRefuge;