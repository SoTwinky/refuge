import React from 'react';
import {useParams} from "react-router-dom";

const AdminSummary = () => {
    const {id} = useParams();

    return (
        <div id="sommaire">
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
                    <a href="/">Gestion des animaux</a>
                    <ul className="niv2">
                        <li><a href="/">Demandes d'adoption</a></li>
                        <li><a href="/">Gérer les fiches</a></li>
                    </ul>
                </li>
                <li><a href={"/admin/edit-refuge/" + id + "/parameters"}>Paramètres</a></li>
            </ul>
        </div>
    );
};

export default AdminSummary;