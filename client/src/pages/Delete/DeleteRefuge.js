import React from 'react';
import {useDispatch} from "react-redux";
import { deleteRefuge } from "../../actions/refuge.actions";

const DeleteRefuge = ({refuge}) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteRefuge(refuge._id))
            .then(() => window.location.replace('http://localhost:3000/super-admin'));
    };

    return <button onClick={() => {
        if (window.confirm("Voulez-vous supprimer ?")) {
            handleDelete();
        }
    }}>Supprimer</button>
};

export default DeleteRefuge;