import React, {useEffect, useState} from 'react';
import AdminSummary from "../../components/AdminSummary";
import SimpleBreadcrumbs from "../../components/Breadcrumbs";
import DeleteRefuge from "../Delete/DeleteRefuge";
import {useParams} from "react-router-dom";
import axios from "axios";

const ListFormAdoption = () => {
    const {id} = useParams();
    const [refuge, setRefuge] = useState("");
    const [pets, setPets] = useState([]);
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
                    <h1>Liste des demandes d'adoption</h1>
                    <div className="flexBetween ariane">
                        <SimpleBreadcrumbs options={options} pageName={pageName}/>
                    </div>
                    <div className="TPL_LISTE_ADOPTION">
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
                                                        <a href={"/admin/edit-pet/" + item._id}
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

                </div>
            </div>
        </div>
    );
};

export default ListFormAdoption;