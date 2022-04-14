import React, {useContext, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import axios from "axios";
import {UidContext} from "../../components/AppContext";

const EditProfil = () => {
    const uid = useContext(UidContext);
    const dispatch = useDispatch();
    const [user, setUser] = useState([]);
    const [lastName, setLastName] = useState(user.lastName);
    const [firstName, setFirstName] = useState(user.firstName);
    const [pseudo, setPseudo] = useState(user.pseudo);
    const [about, setAbout] = useState(user.about);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios
            .get('http://localhost:4000/api/user/' + uid)
            .then((res) => {
                setUser(res.data);
            });

    }, [uid]);

    const handleEdit = () => {
        dispatch()
            .then(() => {
                if (user.pseudo.length > 40) {
                    setError(true);
                } else {


                    setError(false);
                }
            });
    };

    return (
        <div className="innerCenter admin">
            <div className="TPL_FORM_EDIT_PROFIL">
                <h2>Informations sur {user.pseudo} :</h2>
                <form
                    onSubmit={(e) => handleEdit(e)}>
                    <p>
                        <label>Pseudo :</label>
                        <input placeholder="Pseudo"
                               type="text" id="" cols="30" rows="10" onChange={(e) => setPseudo(e.target.value)}
                               defaultValue={pseudo ? pseudo : user.pseudo} required/>
                    </p>
                    <p>
                        <label htmlFor="aPropos">À propos :</label>
                        <textarea placeholder="Je suis au refuge depuis..."
                                  type="text" id="aPropos" name="aPropos" onChange={(e) => setAbout(e.target.value)}
                                  defaultValue={about ? about : user.about } />
                    </p>
                    <h3>Informations nécessaires au dossier d'adoption :</h3>
                    <p>
                        <label htmlFor="last_name">Nom :</label>
                        <input placeholder="Nom"
                               type="text" id="" cols="30" rows="10" onChange={(e) => setLastName(e.target.value)}
                               defaultValue={lastName ? lastName : user.lastName} required/>
                        {error && <p>Veuillez écrire un maximum de 140 caractères</p>}
                    </p>
                    <p>
                        <label htmlFor="first_name">Prénom :</label>
                        <input placeholder="Prénom"
                               type="text" id="first_name" cols="30" rows="10" onChange={(e) => setFirstName(e.target.value)}
                               defaultValue={firstName ? firstName : user.firstName} required/>
                    </p>
                    <span>Adresse; Date d'anniversaire; </span>

                    <input className="btn_send" type="submit" value="Envoyer"/>
                </form>
            </div>
        </div>
    );
};

export default EditProfil;