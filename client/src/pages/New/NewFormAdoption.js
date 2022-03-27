import React, {useContext, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {createFormAdoption} from "../../actions/pet.actions";
import axios from "axios";
import {useParams} from "react-router-dom";
import {UidContext} from "../../components/AppContext";

const NewFormAdoption = () => {
    const {_id} = useParams();
    const uid = useContext(UidContext);
    const [data, setData] = useState("");
    const [formExist, setFormExist] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        axios
            .get('http://localhost:4000/api/pet/' + _id)
            .then((res) => {
                setData(res.data);
            })
            .catch(err => {
                console.log(err)
            });

    }, [_id, uid]);

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createFormAdoption(data.name, _id, uid))
            .then(() => {
                window.location.replace(`http://localhost:3000/pet/${_id}`)
            });
    };

    return (
        <div className="innerCenter">
            {formExist ?
                <div>
                    <h1>METTRE UNE VERIFICATION DOUBLON</h1>
                    <h1>Demande d'adoption pour {_id}</h1>
                    <form
                        onSubmit={(e) => handleSubmit(e)} className="form-container-1">
                        <input type="text" placeholder="Name" disabled="disabled" value={data.name || ''}/>
                        <input type="submit" value="Envoyer"/>
                    </form>
                </div>
                :
                <div>
                    <h2>Vous avez déjà une demande en cours !</h2>
                </div>
            }
        </div>
    );
};

export default NewFormAdoption;