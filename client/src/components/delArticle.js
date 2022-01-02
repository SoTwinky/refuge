import React from 'react';
import axios from "axios";

const DelArticle = ({comment}) => {

        const handleDelete = () => {
            axios
                .delete("http://localhost:4000/api/comment/" + comment.id).then(() => window.location.reload())
        };

        return <button onClick={() => {
                if (window.confirm("Voulez-vous supprimer ?")) {
                    handleDelete();
                }
        }}>Supprimer</button>
};

export default DelArticle;