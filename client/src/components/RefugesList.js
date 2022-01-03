import React, {useState, useEffect} from 'react';
import axios from "axios";
import RefugeItem from "./RefugeItem";

const RefugesList = () => {
    const [data, setData] = useState([]);
    const [rangeValue, setRangeValue] = useState(30);
    const [selectedCountry, setSelectedCountry] = useState('');
    const countries = Array.from(new Set(data.map((countries) => (countries.country))));

    useEffect(() => {
        axios
            .get('http://localhost:4000/api/refuge')
            .then((res) => {
                setData(res.data);
            });
    }, []);

    return (
        <div className="refuges">
            <div className="filter-container">
                <div>
                    <h2>Population :</h2>
                    <input type="range" min="0" max="500" value={rangeValue}
                           onChange={(e) => setRangeValue(e.target.value)}/>
                </div>
                <div>
                    <h2>Pays :</h2>
                    <ul>
                        {countries
                            .map((refuge) => {
                            return (
                                <li className="item" key={refuge}>
                                    <input type="radio" value={refuge} id={refuge} checked={refuge === selectedCountry}
                                           onChange={(e) => setSelectedCountry(e.target.value)}/>
                                    <label htmlFor={refuge}>{refuge}</label>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            {(selectedCountry) &&
            <div className="cancel">
                <h5 onClick={() => {
                    setSelectedCountry("");
                }}>Annuler recherche</h5>
            </div>
            }
            <ul className="liste_4">
                {data
                    .filter((refuge) => selectedCountry ? refuge.country === selectedCountry : refuge.country.includes(selectedCountry))
                    .sort((a, b) => b.id - a.id)
                    .filter((refuge, index) => index < rangeValue)
                    .map((refuge) => (
                        <RefugeItem refuge={refuge} key={refuge.name}/>
                    ))}
            </ul>
        </div>
    );
};

export default RefugesList;