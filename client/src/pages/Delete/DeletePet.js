import React from 'react';
import {useDispatch} from "react-redux";
import { deletePet } from "../../actions/pet.actions";

const DeletePet = ({pet, refuge}) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deletePet(pet._id))
            .then(() => window.location.replace('http://localhost:3000/admin/'));
    };

    return <button className="btn_delete" onClick={() => {
        if (window.confirm("Voulez-vous supprimer ?")) {
            handleDelete();
        }
    }}>Supprimer</button>
};

export default DeletePet;