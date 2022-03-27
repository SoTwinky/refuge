import PetItem from "../components/Pet/PetItem";
import React, {useEffect, useState} from "react";
import axios from "axios";
import RefugeItem from "../components/Refuge/RefugeItem";

const Home = () => {
    const [pets, setPets] = useState([]);
    const [refuges, setRefuges] = useState([]);
    useEffect(() => {
        axios
            .get(`http://localhost:4000/api/pet/`)
            .then((res) => {
                setPets(res.data);
            });

        axios
            .get('http://localhost:4000/api/refuge')
            .then((res) => {
                setRefuges(res.data);
            });
    }, []);
    return (
        <div className="innerCenter">
            <div>
                <h2>Adopter un animal</h2>
                <ul className="liste_4">
                    {pets
                        .sort((a, b) => a.registered - b.registered)
                        .slice(0, 4)
                        .map((pet) => (
                            <PetItem pet={pet} key={pet.name}/>
                        ))}
                </ul>
            </div>
            <div>
                <h2>Un organisme certifié</h2>
                <p>Tous nos refuges sont vérifiés et approuvés par nos équipes pour vous assurer le bon déroulement dans vos recherches et un vrai suivi lors de vos adoptions.</p>
            </div>
            <div className="MISENAVANT_ORANGE">
                <h2>Participer à un projet</h2>
                <ul className="liste_3">
                    <li className="item">Projet 1</li>
                    <li className="item">Projet 1</li>
                    <li className="item">Projet 1</li>
                </ul>
            </div>
            <div>
                <h2>Soutenir un refuge</h2>
                <ul className="liste_4">
                    {refuges
                        .sort((a, b) => a.registered - b.registered)
                        .slice(0, 4)
                        .map((refuge) => (
                            <RefugeItem refuge={refuge} key={refuge.name}/>
                        ))}
                </ul>
            </div>
            <div className="MISENAVANT_ORANGE">
                <h2>Découvrir la boutique</h2>
                <ul className="liste_5">
                    <li className="item">Objet 1</li>
                    <li className="item">Objet 1</li>
                    <li className="item">Objet 1</li>
                    <li className="item">Objet 1</li>
                    <li className="item">Objet 1</li>
                </ul>
            </div>
        </div>
    )
};

export default Home;