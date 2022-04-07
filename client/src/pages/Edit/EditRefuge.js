import React, {useContext, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {updateRefuge} from "../../actions/refuge.actions";
import SimpleBreadcrumbs from "../../components/Breadcrumbs";
import {useParams} from "react-router-dom";
import axios from "axios";
import DeleteRefuge from "../Delete/DeleteRefuge";
import {UidContext} from "../../components/AppContext";

const EditRefuge = () => {
    const {id} = useParams();
    const uid = useContext(UidContext);
    const dispatch = useDispatch();
    const [user, setUser] = useState([]);
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
            {to: "/admin", label: "Administrateur"}
        ]
    };


    useEffect(() => {
        axios
            .get('http://localhost:4000/api/user/' + uid)
            .then((res) => {
                setUser(res.data);
            });
    }, [uid]);

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
        <div className="innerCenter admin">
            <h1>Bienvenue aux administateurs du refuge : {refuge.name}</h1>
            <div className="flexBetween ariane">
                <SimpleBreadcrumbs options={options} pageName={pageName}/>
                <DeleteRefuge refuge={refuge}/>
            </div>

            {user.super_admin &&
            <div className="TPL_FORM_GESTION_REFUGE">
                <h2>Gestion des informations principales :</h2>
                <form
                    onSubmit={(e) => handleEdit(e)}>
                    <p>
                        <label>Nom du refuge :</label>
                        <input style={{border: error ? "1px solid red" : "1px solid #61dafb"}} placeholder="Name"
                               type="text" id="" cols="30" rows="10" onChange={(e) => setEditedName(e.target.value)}
                               autoFocus
                               defaultValue={editedName ? editedName : refuge.name}/>
                        {error && <p>Veuillez écrire un maximum de 140 caractères</p>}
                    </p>
                    <p>
                        <label>Url :</label>
                        <input style={{border: error ? "1px solid red" : "1px solid #61dafb"}} placeholder="Country"
                               type="text" id="" cols="30" rows="10" onChange={(e) => setEditedCountry(e.target.value)}
                               autoFocus defaultValue={editedCountry ? editedCountry : refuge.country}/>

                    </p>
                    <p>
                        <label>Pays :</label>
                        <input style={{border: error ? "1px solid red" : "1px solid #61dafb"}} placeholder="Country"
                               type="text" id="" cols="30" rows="10" onChange={(e) => setEditedCountry(e.target.value)}
                               autoFocus defaultValue={editedCountry ? editedCountry : refuge.country}/>

                    </p>
                    <p>
                        <label>Image :</label>
                        <input style={{border: error ? "1px solid red" : "1px solid #61dafb"}} placeholder="Country"
                               type="text" id="" cols="30" rows="10" onChange={(e) => setEditedCountry(e.target.value)}
                               autoFocus defaultValue={editedCountry ? editedCountry : refuge.country}/>
                    </p>

                    <input className="btn_send" type="submit" value="Envoyer"/>
                </form>
            </div>
            }
            <div className="TPL_LISTE_ADOPTION">
                <h2>Liste des demandes d'adoption :</h2>
                <ul className="liste_1">
                    {pets
                        .filter((item) => {
                            if (item.refuge === id) {
                                if (item.formAdoption.length > 0) {
                                    return item;
                                } else {
                                    return false;
                                }
                            }
                        })
                        .sort((a, b) => b.id - a.id)
                        .slice(0, 100)
                        .map((item) => (
                            <li className="item" key={item._id}>
                                <div className="itemInfo">
                                    <div className="image">
                                        <img src={item.picture} alt={item.name}/>
                                    </div>
                                    <div className="texte">
                                        <div>
                                            <h3>
                                                <a href={"/super-admin/edit-pet/" + item._id}
                                                   key={item.name.id}>{item.name}</a>
                                            </h3>
                                            <span>Age: {item.age}</span>
                                            <span>Sexe: {item.gender}</span>
                                        </div>
                                        <div className="nb_adoption">
                                            <span className="big">{item.formAdoption.length}</span>
                                            <span>demande{item.formAdoption.length > 1 ? "s" : ""}</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                </ul>
            </div>
            <div className="TPL_GESTION_ANIMAUX">
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
                                    <a href={'/super-admin/new-pet/' + id}>
                                        <span className="visuallyhidden">Ajouter</span>
                                    </a>
                                </div>
                            </li>
                            {pets
                                .filter((item) => {
                                    if (item.refuge === id) {
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
                            if (item.refuge === id) {
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