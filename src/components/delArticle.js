import React from 'react';
import axios from "axios";

const DelArticle = ({article}) => {

        const handleDelete = () => {
            axios
                .delete("http://localhost:3003/articles/" + article.id).then(() => window.location.reload())
        };

        return <button onClick={() => {
                if (window.confirm("Voulez-vous supprimer ?")) {
                    handleDelete();
                }
        }}>Supprimer</button>
};

export default DelArticle;