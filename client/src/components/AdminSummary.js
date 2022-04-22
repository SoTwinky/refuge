import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";

const AdminSummary = () => {
    const {id} = useParams();
    const [refuge, setRefuge] = useState("");
    useEffect(() => {
        axios
            .get('http://localhost:4000/api/refuge/' + id)
            .then((res) => setRefuge(res.data))
    }, [id]);

    return (
        <div id="sommaire">
            <h2>{refuge.name}</h2>
            <ul className="niv1">
                <li><a href={"/admin/edit-refuge/" + id}>En bref</a></li>
                <li className="withChild">
                    <a href="/">Gestion financière</a>
                    <ul className="niv2">
                        <li><a href="/">Donations</a></li>
                        <li><a href="/">Parrainages</a></li>
                    </ul>
                </li>
                <li className="withChild">
                    <a href={"/admin/edit-refuge/" + id + "/management-pets"}>Gestion des animaux</a>
                    <ul className="niv2">
                        <li><a href={"/admin/edit-refuge/" + id + "/list-form-adoption"}>Demandes d'adoption</a></li>
                        <li><a href={"/admin/edit-refuge/" + id + "/manage-pets"}>Gérer les animaux</a></li>
                        <li><a href={"/admin/new-pet/" + id}>Nouvel animal</a></li>
                    </ul>
                </li>
                <li><a href={"/admin/edit-refuge/" + id + "/parameters"}>Paramètres</a></li>
            </ul>
        </div>
    );
};

export default AdminSummary;