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
            <span>Les nouveaux animaux</span>
            <ul className="liste_4">
                {pets
                    .sort((a, b) => a.registered - b.registered)
                    .slice(0, 4)
                    .map((pet) => (
                        <PetItem pet={pet} key={pet.name}/>
                    ))}
            </ul>
            <span>Les nouveaux refuges</span>
            <ul className="liste_4">
                {refuges
                    .sort((a, b) => a.registered - b.registered)
                    .slice(0, 4)
                    .map((refuge) => (
                        <RefugeItem refuge={refuge} key={refuge.name}/>
                    ))}
            </ul>
        </div>
    )
};

export default Home;