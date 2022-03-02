import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {createRefuge, updateRefuge} from "../../actions/refuge.actions";
import SimpleBreadcrumbs from "../../components/Breadcrumbs";
import {useParams} from "react-router-dom";
import axios from "axios";
import DeleteRefuge from "../Delete/DeleteRefuge";

const EditRefuge = () => {
    const {id} = useParams();
    const [refuge, setRefuge] = useState("");
    const [editedName, setEditedName] = useState("");
    const [editedCountry, setEditedCountry] = useState("");
    const [error, setError] = useState(false);
    const pageName = 'Éditer le refuge';
    const options = {
        items: [
            { to: "/profil", label: "Profil" },
            { to: "/super-admin", label: "Super Administrateur" }
        ]
    };
    const dispatch = useDispatch();

    useEffect(() => {
        axios
            .get('http://localhost:4000/api/refuge/' + id)
            .then((res) => setRefuge(res.data))
    }, []);

    const handleEdit = () => {
        let name = editedName ? editedName : refuge.name;
        let country = editedCountry ? editedCountry : refuge.country;
        dispatch(updateRefuge(refuge._id, name, country))
            .then(() => {
                window.location.replace(`http://localhost:3000/refuge/` + name.replace(/ /g,"_").toLowerCase())
            });
    };

    return (
        <div className="innerCenter">
            <SimpleBreadcrumbs options={options} pageName={pageName}/>
            <h1>Éditer le refuge</h1>
            <form
                onSubmit={(e) => handleEdit(e)} className="form-container-1">
                <input style={{border: error ? "1px solid red" : "1px solid #61dafb"}} placeholder="Name"
                       type="text" id="" cols="30" rows="10" onChange={(e) => setEditedName(e.target.value)} autoFocus defaultValue={editedName ? editedName : refuge.name}/>
                {error && <p>Veuillez écrire un maximum de 140 caractères</p>}
                <input style={{border: error ? "1px solid red" : "1px solid #61dafb"}} placeholder="Country"
                       type="text" id="" cols="30" rows="10" onChange={(e) => setEditedCountry(e.target.value)} autoFocus defaultValue={editedCountry ? editedCountry : refuge.country}/>
                <input type="submit" value="Envoyer"/>
            </form>
            <DeleteRefuge refuge={refuge}/>
        </div>
    );
};

export default EditRefuge;