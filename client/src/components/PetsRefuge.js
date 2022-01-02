import React, {useState, useEffect} from 'react';
import Pet_Item from "./Pet_Item";
import axios from "axios";

const PetsRefuge = ({refuge}) => {
    const [data, setData] = useState([]);

    useEffect(() => {

        axios
            .get('http://localhost:4000/api/pet')
            .then((res) => {
                setData(res.data);
            });
    }, []);

    return (
        <div className="TPL_PETS_REFUGE">
            <h2>Venez les parrainer</h2>
            <ul className="liste_4">
                {data
                    .filter((pet) => pet.refuge === refuge)
                    .sort((a, b) => a.age - b.age)
                    .slice(0, 4)
                    .map((pet) => (
                        <Pet_Item pet={pet} key={pet.name}/>
                    ))}
            </ul>
        </div>
    );
};

export default PetsRefuge;