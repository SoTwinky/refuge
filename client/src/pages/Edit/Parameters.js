import React, {useContext, useEffect, useState} from 'react';
import SimpleBreadcrumbs from "../../components/Breadcrumbs";
import DeleteRefuge from "../Delete/DeleteRefuge";
import axios from "axios";
import {UidContext} from "../../components/AppContext";
import {useParams} from "react-router-dom";
import {updateRefuge} from "../../actions/refuge.actions";
import {useDispatch} from "react-redux";
import AdminSummary from "../../components/AdminSummary";

const Parameters = () => {
    const {id} = useParams();
    const uid = useContext(UidContext);
    const dispatch = useDispatch();
    const [user, setUser] = useState([]);
    const [refuge, setRefuge] = useState("");
    const [editedName, setEditedName] = useState("");
    const [editedCountry, setEditedCountry] = useState("");
    const [error, setError] = useState(false);
    const pageName = "Paramètres";
    const options = {
        items: [
            {to: "/admin", label: "Administration"},
            {to: "/admin/edit-refuge/" + id, label: 'Éditer : ' + refuge.name}
        ]
    };

    useEffect(() => {
        if (uid !== null) {
            axios
                .get('http://localhost:4000/api/user/' + uid)
                .then((res) => setUser(res.data))
                .catch(error => console.log({error}));
        }
    }, [uid]);


    useEffect(() => {
        axios
            .get('http://localhost:4000/api/refuge/' + id)
            .then((res) => setRefuge(res.data))

    }, [id]);


    const handleEdit = () => {
        let name = editedName ? editedName : refuge.name;
        let country = editedCountry ? editedCountry : refuge.country;

        if (refuge.name.length > 150) {
            setError(true);
        } else {
            dispatch(updateRefuge(refuge._id, name, country))
                .then(() => {
                    window.location.replace(`http://localhost:3000/refuge/` + name.replace(/ /g, "_").toLowerCase())
                });
        }
    };

    return (
        <div className="flexPage">
            <div className="w400px">
                <AdminSummary/>
            </div>
            <div className="w100-400px">
                <h1>Bienvenue aux administateurs du refuge : {refuge.name}</h1>
                <div className="flexBetween ariane">
                    <SimpleBreadcrumbs options={options} pageName={pageName}/>
                    {user.super_admin &&
                    <DeleteRefuge refuge={refuge}/>
                    }
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
                                   type="text" id="" cols="30" rows="10"
                                   onChange={(e) => setEditedCountry(e.target.value)}
                                   autoFocus defaultValue={editedCountry ? editedCountry : refuge.country}/>

                        </p>
                        <p>
                            <label>Pays :</label>
                            <input style={{border: error ? "1px solid red" : "1px solid #61dafb"}} placeholder="Country"
                                   type="text" id="" cols="30" rows="10"
                                   onChange={(e) => setEditedCountry(e.target.value)}
                                   autoFocus defaultValue={editedCountry ? editedCountry : refuge.country}/>

                        </p>
                        <p>
                            <label>Image :</label>
                            <input style={{border: error ? "1px solid red" : "1px solid #61dafb"}} placeholder="Country"
                                   type="text" id="" cols="30" rows="10"
                                   onChange={(e) => setEditedCountry(e.target.value)}
                                   autoFocus defaultValue={editedCountry ? editedCountry : refuge.country}/>
                        </p>

                        <input className="btn_send" type="submit" value="Envoyer"/>
                    </form>
                </div>
                }
            </div>
        </div>
    );
};

export default Parameters;