import React, {useEffect, useState} from 'react';
import PetItem from "../../components/Pet/PetItem";
import axios from "axios";
import {useSelector} from "react-redux";

const PetsFavorites = () => {
    const userData = useSelector((state) => state.userReducer);
    const [data, setData] = useState([]);


    useEffect(() => {
        const petsFavorites = async () => {
            if (userData._id !== undefined) {
                axios
                    .get(`http://localhost:4000/api/pet/favorites/` + userData._id)
                    .then((res) => {
                        setData(res.data);
                    })
                    .catch(error => {console.log(error.response)});
            }
        };
        petsFavorites();

    }, [userData._id]);

    return (
        <div className="innerCenter" id="admin">
            <ul className="liste_4">
                {data
                    .map((pet) => (
                        <PetItem pet={pet} key={pet.name}/>
                    ))}
            </ul>
        </div>
    );
};

export default PetsFavorites;