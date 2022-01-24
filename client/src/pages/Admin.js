import React, {useEffect, useState} from 'react';
import axios from "axios";

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [refuges, setRefuges] = useState([]);
    const [indexRefuges, setIndexRefuges] = useState(3);
    const [indexUsers, setIndexUsers] = useState(3);

    useEffect(() => {
        axios
            .get('http://localhost:4000/api/user')
            .then((res) => {
                setUsers(res.data);
            });

        axios
            .get('http://localhost:4000/api/refuge')
            .then((res) => {
                setRefuges(res.data);
            });
    }, []);

    const moreItem = () => {
        setIndexRefuges(indexRefuges + 3)
        //function pour les deux
    };

    return (
        <div className="innerCenter">
            <div>
                <h2>Liste des refuges</h2>
                <ul className="liste_1">
                    {refuges
                        .sort((a, b) => b.id - a.id)
                        .slice(0, indexRefuges)
                        .map((item) => (
                            <li className="item" key={item._id}>
                                <div className="visuel">
                                    <img src={item.picture} alt={'Photo' + item.pseudo}/>
                                </div>
                                <div className="itemInfo">
                                    <span>Refuge: {item.name}</span>
                                    <span>Url: {item.url}</span>
                                    <span>Pays: {item.country}</span>
                                    <span>Population: {item.population}</span>
                                </div>
                            </li>
                        ))}
                </ul>
                {indexRefuges < refuges.length &&
                <div>
                    <button onClick={moreItem}>Voir plus</button>
                </div>
                }
            </div>
            <div>
                <h2>Liste des utilisateurs</h2>
                <ul className="liste_1">
                    {users
                        .sort((a, b) => b.id - a.id)
                        .slice(0, indexUsers)
                        .map((item) => (
                            <li className="item" key={item._id}>
                                <div className="visuel">
                                    <img src={item.picture} alt={'Photo' + item.pseudo}/>
                                </div>
                                <div className="itemInfo">
                                    <span>Pseudo: {item.pseudo}</span>
                                    <span>Email: {item.email}</span>
                                    <p>Utilisateur depuis le {item.createdAt}, modifié pour la dernière fois
                                        le {item.updatedAt}</p>
                                </div>
                            </li>
                        ))}
                </ul>
                {indexUsers < users.length &&
                <div>
                    <button onClick={moreItem}>Voir plus</button>
                </div>
                }
            </div>
        </div>
    );
};

export default Admin;