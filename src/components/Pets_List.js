import React, { useCallback, useEffect, useState, useRef } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import axios from "axios";
import Pet_Item from "./Pet_Item";
//(e) => setRangeValueMax(e.target.value)

const Pets_List = () => {
    const min = 0;
    const max = 30;
    const [data, setData] = useState([]);
    const [rangeValueMin, setRangeValueMin] = useState(min);
    const [rangeValueMax, setRangeValueMax] = useState(max);
    const [selectedRadio, setSelectedRadio] = useState('');
    const colors = ["white", "black", "brown"];
    const [selectedGender, setSelectedGender] = useState('');
    const genders = ["male", "female"];
    const minValRef = useRef(null);
    const maxValRef = useRef(null);
    const range = useRef(null);

    // Convert to percentage
    const getPercent = useCallback(
        (value) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    // Set width of the range to decrease from the left side
    useEffect(() => {
        if (maxValRef.current) {
            const minPercent = getPercent(rangeValueMin);
            const maxPercent = getPercent(+maxValRef.current.value); // Preceding with '+' converts the value from type string to type number

            if (range.current) {
                range.current.style.left = `${minPercent}%`;
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [rangeValueMin, getPercent]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        if (minValRef.current) {
            const minPercent = getPercent(+minValRef.current.value);
            const maxPercent = getPercent(rangeValueMax);

            if (range.current) {
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [rangeValueMax, getPercent]);


    useEffect(() => {

        axios
            .get(`http://localhost:4000/api/pet/`)
            .then((res) => {
                setData(res.data);
            });


    }, []);

    return (
        <div className="pets">
            <div className="filter-container">
                <div>
                    <h2>Age :</h2>
                    <div className="doubleSlider">
                        <input
                            type="range"
                            min={min}
                            max={max}
                            value={rangeValueMin}
                            ref={minValRef}
                            onChange={(event) => {
                                const value = Math.min(+event.target.value, rangeValueMax - 1);
                                setRangeValueMin(value);
                                event.target.value = value.toString();
                            }}
                            className={classnames("thumb thumb--zindex-3", {
                                "thumb--zindex-5": rangeValueMin > max - 100
                            })}
                        />
                        <input
                            type="range"
                            min={min}
                            max={max}
                            value={rangeValueMax}
                            ref={maxValRef}
                            onChange={(event) => {
                                const value = Math.max(+event.target.value, rangeValueMin + 1);
                                setRangeValueMax(value);
                                event.target.value = value.toString();
                            }}
                            className="thumb thumb--zindex-4"
                        />
                        <div className="slider">
                            <div className="slider__track" />
                            <div ref={range} className="slider__range" />
                        </div>


                        <span className="count">{rangeValueMin} - {rangeValueMax} an{rangeValueMax > 1 ? 's' : ''}</span>
                    </div>
                </div>
                <div>
                    <h2>Couleur :</h2>
                    <ul>
                        {colors.map((color) => {
                            return (
                                <li className="item" key={color}>
                                    <input type="radio" value={color} id={color} checked={color === selectedRadio}
                                           onChange={(e) => setSelectedRadio(e.target.value)}/>
                                    <label htmlFor={color}>{color}</label>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div>
                    <h2>Genre :</h2>
                    <ul>
                        {genders.map((gender) => {
                            return (
                                <li className="item" key={gender}>
                                    <input type="radio" value={gender} id={gender} checked={gender === selectedGender}
                                           onChange={(e) => setSelectedGender(e.target.value)}/>
                                    <label htmlFor={gender}>{gender}</label>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            {(selectedRadio || selectedGender) &&
            <div className="cancel">
                <h5 onClick={() => {
                    setSelectedRadio("");
                    setSelectedGender("")
                }}>Annuler recherche</h5>
            </div>
            }
            <ul className="liste_4">
                {data
                    .filter((pet) => pet.color.includes(selectedRadio))
                    .filter((pet) => selectedGender ? pet.gender === selectedGender : pet.gender.includes(selectedGender))
                    .sort((a, b) => a.age - b.age)
                    .filter((pet) => pet.age >= rangeValueMin)
                    .filter((pet) => pet.age <= rangeValueMax)
                    .map((pet) => (
                        <Pet_Item pet={pet} key={pet.name}/>
                    ))}
            </ul>
        </div>
    );
};

export default Pets_List;