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
    const [subscriptions, setSubscriptions] = useState('');
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

        axios
            .get('http://localhost:4000/api/subscription/' + id)
            .then((res) => setSubscriptions(res.data));

    }, [id]);

    const maxValPayment = [],
        maxValSubscription = [];

    {
        donations && month.map((item) => {
            maxValPayment.push(donations.filter((donation) => {
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

    {
        subscriptions && month.map((item) => {
            maxValSubscription.push(subscriptions.filter((subscription) => {
                if (new Date(subscription.updatedAt).toLocaleString('en-GB', {month: 'long'}) === item) {
                    return item;
                }
            }).map(function (subscription) {
                return Math.floor(subscription.amount);
            }).reduce((amount, subscription) => {
                return amount + subscription
            }, 0))
        })
    }

    const oMaxValPayment = 100 / Math.max.apply(null, maxValPayment);
    const oMaxValSubscription = 100 / Math.max.apply(null, maxValSubscription);
    const totalSubscription = subscriptions && (subscriptions
        .map(function (subscription) {
            return Math.floor(subscription.amount);
        }).reduce((amount, subscription) => {
            return amount + subscription
        }, 0) / 100);

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
                                            <span
                                                className={donations && "n" + parseInt(donations.filter((donation) => {
                                                    if (new Date(donation.updatedAt).toLocaleString('en-GB', {month: 'long'}) === item) {
                                                        return item;
                                                    }
                                                }).map(function (donation) {
                                                    return Math.floor(donation.amount);
                                                }).reduce((amount, donation) => {
                                                    return amount + donation
                                                }, 0) * oMaxValPayment)}>
                                                {donations && new Intl.NumberFormat("fr-FR", {
                                                    style: "currency",
                                                    currency: "EUR"
                                                }).format(donations.filter((donation) => {
                                                    const date = new Date(donation.updatedAt);
                                                    if (date.toLocaleString('en-GB', {
                                                        month: 'long',
                                                        year: 'numeric'
                                                    }) === item + ' ' + new Date().getFullYear()) {
                                                        return item;
                                                    }
                                                    return false;
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
                    <div className="TPL_COMPTEUR">
                        <p>Prévisionnel du gain des abonnements / mensuel : {totalSubscription} €</p>
                    </div>
                    <div className="TPL_ABONNEMENTS">
                        <h2>Montant des nouveaux abonnements</h2>
                        <div className="TPL_STATS">
                            {month.map((item, i) => {
                                return (
                                    <div className="column" key={i}>
                                        <div className="containerStats">
                                            <span
                                                className={subscriptions && "n" + parseInt(subscriptions.filter((subscription) => {
                                                    if (new Date(subscription.updatedAt).toLocaleString('en-GB', {month: 'long'}) === item) {
                                                        return item;
                                                    }
                                                }).map(function (subscription) {
                                                    return Math.floor(subscription.amount);
                                                }).reduce((amount, subscription) => {
                                                    return amount + subscription
                                                }, 0) * oMaxValSubscription)}>
                                                {subscriptions && new Intl.NumberFormat("fr-FR", {
                                                    style: "currency",
                                                    currency: "EUR"
                                                }).format(subscriptions.filter((subscription) => {
                                                    const date = new Date(subscription.updatedAt);
                                                    if (date.toLocaleString('en-GB', {
                                                        month: 'long',
                                                        year: 'numeric'
                                                    }) === item + ' ' + new Date().getFullYear()) {
                                                        return item;
                                                    }
                                                    return false;
                                                }).map(function (subscription) {
                                                    return Math.floor(subscription.amount);
                                                }).reduce((amount, subscription) => {
                                                    return amount + subscription
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