import React, {useEffect, useState} from 'react';
import axios from "axios";
import $ from 'jquery';
import SimpleBreadcrumbs from "../components/Breadcrumbs";

const SuperAdmin = () => {
    const [users, setUsers] = useState([]);
    const [refuges, setRefuges] = useState([]);
    const [indexRefuges, setIndexRefuges] = useState(3);
    const [indexUsers, setIndexUsers] = useState(3);
    const [searchTermRefuges, setSearchTermRefuges] = useState('');
    const [searchTermUsers, setSearchTermUsers] = useState('');
    let id = 1;

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

    $('#header_super_admin li').click(function () {
        var i = $(this).index();
        $('.section-hidden').hide();
        $('#section_' + (i + 1)).show();
    });

    //BREADCRUMBS

    const options = {
        items: [
            {to: "/profil", label: "Profil"}
        ]
    };

    const pageName = 'Super Administrateur';

    return (
        <div className="innerCenter">
            <SimpleBreadcrumbs options={options} pageName={pageName}/>
            <ul id="header_super_admin" className="liste_2 ul_slider">
                <li>
                    <button className="btnVisible red">Tous les refuges</button>
                </li>
                <li>
                    <button className="btnVisible blue">Tous les utilisateurs</button>
                </li>
            </ul>
            <div id={'section_' + id++} className="section-hidden refuge_style">
                <h2>Liste des refuges</h2>
                <div className="searchBar">
                    <label>Recherche :</label>
                    <input type="text" placeholder="Search..." onChange={event => {
                        setSearchTermRefuges(event.target.value)
                    }}/>
                </div>
                <ul className="liste_4">
                    <li className="item first add_item">
                        <div className="itemInfo">
                            <a href="/super-admin/new-refuge"><span className="visuallyhidden">Ajouter</span></a>
                        </div>
                    </li>
                    {refuges
                        .filter((item) => {
                            if (searchTermRefuges === "") {
                                return item;
                            } else if (item.name?.toLowerCase().includes(searchTermRefuges.toLowerCase())) {
                                return item;
                            }
                        })
                        .sort((a, b) => b.id - a.id)
                        .slice(0, indexRefuges)
                        .map((item) => (
                            <li className="item" key={item._id}>
                                <div className="visuel">
                                    <img src={item.picture} alt={'Photo' + item.pseudo}/>
                                </div>
                                <div className="itemInfo">
                                    <h3>
                                        <a href={"/super-admin/edit-refuge/" + item._id}
                                           key={item.name.id}>{item.name}</a>
                                    </h3>
                                    <p>Url: {item.url}</p><br/>
                                    <span>Pays: {item.country}</span><br/>
                                    <span>Population: {item.population}</span>
                                </div>
                            </li>
                        ))}
                </ul>
                {indexRefuges < refuges.filter((item) => {
                    if (searchTermRefuges === "") {
                        return item;
                    } else if (item.name?.toLowerCase().includes(searchTermRefuges.toLowerCase())) {
                        return item;
                    }
                }).length &&
                <div className="flexCenter">
                    <button className="voirPlus" onClick={() => setIndexRefuges(indexRefuges + 8)}>Voir plus</button>
                </div>
                }
            </div>

            <div id={'section_' + id++} className="section-hidden user_style">
                <h2>Liste des utilisateurs</h2>
                <div className="searchBar">
                    <label>Recherche :</label>
                    <input type="text" placeholder="Search..." onChange={event => {
                        setSearchTermUsers(event.target.value)
                    }}/>
                </div>
                <ul className="liste_4">
                    <li className="item first add_item">
                        <div className="itemInfo">
                            <a href="/super-admin/new-user"><span className="visuallyhidden">Ajouter</span></a>
                        </div>
                    </li>
                    {users
                        .filter((item) => {
                            if (searchTermUsers === "") {
                                return item;
                            } else if (item.pseudo?.toLowerCase().includes(searchTermUsers.toLowerCase())) {
                                return item;
                            }
                        })
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
                {indexUsers < users.filter((item) => {
                    if (searchTermUsers === "") {
                        return item;
                    } else if (item.pseudo?.toLowerCase().includes(searchTermUsers.toLowerCase())) {
                        return item;
                    }
                }).length &&
                <div className="flexCenter">
                    <button className="voirPlus" onClick={() => setIndexUsers(indexUsers + 8)}>Voir plus</button>
                </div>
                }
            </div>
        </div>
    );
};

export default SuperAdmin;