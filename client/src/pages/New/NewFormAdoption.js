import React, {useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createFormAdoption} from "../../actions/formAdoption.actions";
import axios from "axios";
import {useParams} from "react-router-dom";
import {UidContext} from "../../components/AppContext";

const NewFormAdoption = () => {
    const {_id} = useParams();
    const userData = useSelector((state) => state.userReducer);
    const [pet, setPet] = useState("");
    const [form, setForm] = useState([]);
    const [formExist, setFormExist] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        axios
            .get('http://localhost:4000/api/pet/' + _id)
            .then((res) => {
                setPet(res.data);
            })
            .catch(err => {
                console.log(err)
            });

        axios
            .get('http://localhost:4000/api/formAdoption/')
            .then((res) => {
                setForm(res.data);
            })
            .catch(err => {
                console.log(err)
            });

        form.map((form_id) => {
            if (form_id.pet_id === _id) {
                if (form_id.adoptant_id === userData._id) {
                    setFormExist(true)
                }
            }
        });

    }, [_id, userData._id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createFormAdoption(userData.pseudo, _id, userData._id))
            .then(() => {
                window.location.replace(`http://localhost:3000/pet/${_id}`)
            });
    };


    return (
        <div className="innerCenter">
            {userData._id &&
                !formExist ?
                    <div>
                        <h1>METTRE UNE VERIFICATION DOUBLON</h1>
                        <h1>Demande d'adoption pour {_id}</h1>
                        <form
                            onSubmit={(e) => handleSubmit(e)} className="form-container-1">
                            <input type="text" placeholder="Name" disabled="disabled" value={userData.pseudo || ''}/>
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