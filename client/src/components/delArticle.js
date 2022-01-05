import React from 'react';
import {useDispatch} from "react-redux";
import {delComment} from "../actions/comment.actions";

const DelArticle = ({comment}) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(delComment(comment._id))
            .then(() => window.location.reload());
    };

    return <button onClick={() => {
        if (window.confirm("Voulez-vous supprimer ?")) {
            handleDelete();
        }
    }}>Supprimer</button>
};

export default DelArticle;