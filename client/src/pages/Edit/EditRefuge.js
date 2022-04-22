import React, {useContext, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {updateRefuge} from "../../actions/refuge.actions";
import SimpleBreadcrumbs from "../../components/Breadcrumbs";
import {UidContext} from "../../components/AppContext";
import {useParams} from "react-router-dom";
import axios from "axios";
import DeleteRefuge from "../Delete/DeleteRefuge";
import AdminSummary from "../../components/AdminSummary";

const EditRefuge = () => {
    const {id} = useParams();
    const [refuge, setRefuge] = useState("");
    const [donations, setDonations] = useState("");
    const [pets, setPets] = useState([]);
    const [indexPets, setIndexPets] = useState(3);
    const [searchTermPets, setSearchTermPets] = useState('');
    const [amount, setAmount] = useState('');
    const pageName = 'Éditer : ' + refuge.name;
    const options = {
        items: [
            {to: "/admin", label: "Administration"}
        ]
    };
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    useEffect(() => {
        axios
            .get('http://localhost:4000/api/refuge/' + id)
            .then((res) => setRefuge(res.data))

        axios
            .get('http://localhost:4000/api/pet')
            .then((res) => setPets(res.data));

        axios
            .get('http://localhost:4000/api/payment/' + id)
            .then((res) => setDonations(res.data));

    }, [id]);

    const maxVal = [];

    {
        donations && month.map((item) => {
            maxVal.push(donations.filter((donation) => {
                if (new Date(donation.updatedAt).toLocaleString('en-GB', {month: 'long'}) === item) {
                    return item;
                }
            }).map(function (donation) {
                return Math.floor(donation.amount);
            }).reduce((amount, donation) => {

                return amount + donation
            }, 0))
        })
    }

    const oMaxVal = 100 / Math.max.apply(null, maxVal);
    console.log(oMaxVal);
    return (
        <div className="flexPage">
            <div className="w400px">
                <AdminSummary/>
            </div>
            <div className="w100-400px">
                <div className="innerCenter">
                    <h1>Bienvenue aux administateurs du refuge : {refuge.name}</h1>
                    <div className="flexBetween ariane">
                        <SimpleBreadcrumbs options={options} pageName={pageName}/>
                    </div>
                    <div className="TPL_DONS">
                        <h2>Dons</h2>
                        <div className="TPL_STATS">
                            {month.map((item, i) => {
                                return (
                                    <div className="column" key={i}>
                                        <div className="containerStats">
                                            <span className={donations && "n" + donations.filter((donation) => {
                                                if (new Date(donation.updatedAt).toLocaleString('en-GB', {month: 'long'}) === item) {
                                                    return item;
                                                }
                                            }).map(function (donation) {
                                                return Math.floor(donation.amount);
                                            }).reduce((amount, donation) => {
                                                return amount + donation
                                            }, 0) * oMaxVal}>
                                                {donations && new Intl.NumberFormat("fr-FR", {
                                                    style: "currency",
                                                    currency: "EUR"
                                                }).format(donations.filter((donation) => {
                                                    if (new Date(donation.updatedAt).toLocaleString('en-GB', {month: 'long'}) === item) {
                                                        return item;
                                                    }
                                                }).map(function (donation) {
                                                    return Math.floor(donation.amount);
                                                }).reduce((amount, donation) => {
                                                    return amount + donation
                                                }, 0) / 100)}
                                            </span>
                                        </div>
                                        <div className="month">{item.substring(0, 3)}.</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="TPL_GESTION_ANIMAUX">
                        <h2>Gestion des animaux :</h2>
                        <ul>
                            <div id={'section_'} className="section-hidden">
                                <div className="searchBar">
                                    <label>Recherche</label>
                                    <input type="text" placeholder="Search..." onChange={event => {
                                        setSearchTermPets(event.target.value)
                                    }}/>
                                </div>
                                <ul className="liste_4">
                                    <li className="item first add_item">
                                        <div className="itemInfo">
                                            <a href={'/admin/new-pet/' + id}>
                                                <span className="visuallyhidden">Ajouter</span>
                                            </a>
                                        </div>
                                    </li>
                                    {pets
                                        .filter((item) => {
                                            if (item.refuge === id) {
                                                if (searchTermPets === "") {
                                                    return item;
                                                } else if (item.name?.toLowerCase().includes(searchTermPets.toLowerCase())) {
                                                    return item;
                                                }
                                            }

                                            return false;
                                        })
                                        .sort((a, b) => b.id - a.id)
                                        .slice(0, indexPets)
                                        .map((item) => (
                                            <li className="item" key={item._id}>
                                                <div className="visuel">
                                                    <img src={item.picture} alt={'Photo' + item.pseudo}/>
                                                </div>
                                                <div className="itemInfo">
                                                    <h3>
                                                        <a href={"/admin/edit-pet/" + item._id}
                                                           key={item.name.id}>{item.name}</a>
                                                    </h3>
                                                    <span>Age: {item.age}</span><br/>
                                                    <span>Sexe: {item.gender}</span>
                                                </div>
                                            </li>
                                        ))}
                                </ul>
                                {indexPets < pets.filter((item) => {
                                    if (item.refuge === id) {
                                        if (searchTermPets === "") {
                                            return item;
                                        } else if (item.name?.toLowerCase().includes(searchTermPets.toLowerCase())) {
                                            return item;
                                        }
                                    }

                                    return false;
                                }).length &&
                                <div className="flexCenter">
                                    <button className="voirPlus" onClick={() => setIndexPets(indexPets + 8)}>Voir plus
                                    </button>
                                </div>
                                }
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditRefuge;