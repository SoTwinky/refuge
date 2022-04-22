import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import AdminSummary from "../../components/AdminSummary";
import SimpleBreadcrumbs from "../../components/Breadcrumbs";
import DeleteRefuge from "../Delete/DeleteRefuge";

const ManagePets = () => {
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
                <div className="innerCenter">
                    <h1>Gérer les animaux du refuge</h1>
                    <div className="flexBetween ariane">
                        <SimpleBreadcrumbs options={options} pageName={pageName}/>
                    </div>

                    <div className="TPL_GESTION_ANIMAUX">
                        <ul>
                            <div>
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
                                                        <a href={"/admin/edit-pet/" + id + "/" + item._id}
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
        </div>
    );
};

export default ManagePets;