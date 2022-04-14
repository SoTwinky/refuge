import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {UidContext} from "../components/AppContext";
import SimpleBreadcrumbs from "../components/Breadcrumbs";

const Admin = () => {
    const [refuge, setRefuge] = useState([]);
    const [indexRefuges, setIndexRefuges] = useState(3);
    const uid = useContext(UidContext);
    const pageName = 'Administration des refuges';
    const options = {
        items: [
            {to: "/my-dashboard", label: "Tableau de bord"},
        ]
    };

    useEffect(() => {
        axios
            .get('http://localhost:4000/api/refuge')
            .then((res) => {
                setRefuge(res.data);
            });
    }, []);

    console.log(refuge.map((item) => { return item.admin_users?.map((admin, index) => admin[index] === '61d0b36baa9460582d0aea7f')}));

    return (
        <div className="innerCenter admin" id="admin">
            <SimpleBreadcrumbs options={options} pageName={pageName}/>
            <div className="mBot">
                <h2>Gestion de vos refuges :</h2>
                <ul className="liste_2 ul_slider liste_refuge">
                    {refuge
                        .filter((item) => {
                            return item.admin_users?.some((admin) => admin === uid)
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
                                        <a href={"/admin/edit-refuge/" + item._id}
                                           key={item.name.id}>{item.name}</a>
                                    </h3>
                                </div>
                            </li>
                        ))}
                </ul>
                {indexRefuges < refuge.filter((item) => {
                    return item.admin_users?.some((admin) => admin === uid)
                }).length &&
                <div className="flexCenter">
                    <button className="voirPlus" onClick={() => setIndexRefuges(indexRefuges + 8)}>Voir plus</button>
                </div>
                }
            </div>
        </div>
    );
};

export default Admin;