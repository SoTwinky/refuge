import React, {useState} from 'react';
import SimpleBreadcrumbs from "../../components/Breadcrumbs";
import {useDispatch} from "react-redux";
import { createRefuge } from "../../actions/refuge.actions";

const NewRefuge = () => {
    const [name, setName] = useState("");
    const [country, setCountry] = useState("");
    const [error, setError] = useState(false);
    const pageName = 'Nouveau Refuge';
    const options = {
        items: [
            { to: "/profil", label: "Profil" },
            { to: "/super-admin", label: "Super Administrateur" }
        ]
    };
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (name.length > 140) {
            setError(true);
        } else {
            dispatch(createRefuge(name, country))
                .then(() => {
                    window.location.replace(`http://localhost:3000/refuge/` + name.replace(/ /g,"_").toLowerCase())
                });

            setError(false);
        }
    };

    return (
        <div className="innerCenter">
            <SimpleBreadcrumbs options={options} pageName={pageName}/>
            <h1>Nouveau Refuge</h1>
            <form
                onSubmit={(e) => handleSubmit(e)} className="form-container-1">
                <input style={{border: error ? "1px solid red" : "1px solid #61dafb"}} placeholder="Name"
                          type="text" id="" cols="30" rows="10" onChange={(e) => setName(e.target.value)}/>
                {error && <p>Veuillez écrire un maximum de 140 caractères</p>}
                <input style={{border: error ? "1px solid red" : "1px solid #61dafb"}} placeholder="Country"
                       type="text" id="" cols="30" rows="10" onChange={(e) => setCountry(e.target.value)}/>
                <input type="submit" value="Envoyer"/>
            </form>
        </div>
    );
};

export default NewRefuge;