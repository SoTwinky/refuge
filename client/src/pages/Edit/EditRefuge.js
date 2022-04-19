import React, {useContext, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {updateRefuge} from "../../actions/refuge.actions";
import SimpleBreadcrumbs from "../../components/Breadcrumbs";
import {UidContext} from "../../components/AppContext";
import {useParams} from "react-router-dom";
import axios from "axios";
import DeleteRefuge from "../Delete/DeleteRefuge";
import AdminSummary from "../../components/AdminSummary";

const EditRefuge = () => {
    const {id} = useParams();
    const [refuge, setRefuge] = useState("");
    const [pets, setPets] = useState([]);
    const [indexPets, setIndexPets] = useState(3);
    const [searchTermPets, setSearchTermPets] = useState('');
    const pageName = 'Éditer : ' + refuge.name;
    const options = {
        items: [
            {to: "/admin", label: "Administration"}
        ]
    };

    useEffect(() => {
        axios
            .get('http://localhost:4000/api/refuge/' + id)
            .then((res) => setRefuge(res.data))

        axios
            .get('http://localhost:4000/api/pet')
            .then((res) => setPets(res.data));

    }, [id]);

    return (
        <div className="flexPage">
            <div className="w400px">
                <AdminSummary/>
            </div>
            <div className="w100-400px">
                <h1>Bienvenue aux administateurs du refuge : {refuge.name}</h1>
                <div className="flexBetween ariane">
                    <SimpleBreadcrumbs options={options} pageName={pageName}/>
                    <DeleteRefuge refuge={refuge}/>
                </div>
                <div className="TPL_LISTE_ADOPTION">
                    <h2>Liste des demandes d'adoption :</h2>
                    <ul className="liste_1">
                        {pets
                            .filter((item) => {
                                if (item.refuge === id) {
                                    if (item.formAdoption.length > 0) {
                                        return item;
                                    }
                                }
                                return false;
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
                                        <a href={'/admin/new-pet/' + id}>
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
                                                    <a href={"/admin/edit-pet/" + item._id}
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
                                <button className="voirPlus" onClick={() => setIndexPets(indexPets + 8)}>Voir plus
                                </button>
                            </div>
                            }
                        </div>
                    </ul>
                </div>
            </div>

        </div>
    );
};

export default EditRefuge;