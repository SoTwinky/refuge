import React, {useEffect, useState} from 'react';
import axios from "axios";

const Admin = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:4000/api/user')
            .then((res) => {
                setData(res.data);
            });
    }, []);
    return (
        <div className="innerCenter">
            <h2>Liste des utilisateurs</h2>
            <ul className="liste_1">
                {data
                    .sort((a, b) => b.id - a.id)
                    .map((user) => (
                        <li className="item">
                            <div className="visuel">
                                <img src={user.picture} alt={'Photo' + user.pseudo}/>
                            </div>
                            <div className="itemInfo">
                                <span>Pseudo: {user.pseudo}</span>
                                <span>Email: {user.email}</span>
                                <p>Utilisateur depuis le {user.createdAt}, modifié pour la dernière fois le {user.updatedAt}</p>
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default Admin;