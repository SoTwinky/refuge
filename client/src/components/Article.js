import React, {useState} from 'react';
import axios from "axios";
import DelArticle from "./delArticle";

const Article = ({comment, idPet, idUser}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState("");

    const dateParser = (date) => {
        let newDate = new Date(date).toLocaleDateString('fr-FR', {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric"
        });
        return newDate;
    };

    const handleEdit = () => {
        const data = {
            author: comment.author,
            id_author: comment.id_author,
            content: editedContent ? editedContent : comment.content,
            date: comment.date,
            pet: idPet
        };

        axios.put("http://localhost:4000/api/comment/" + comment.id, data).then(() => setIsEditing(false));
    };

    return (
        <li className="article" style={{ background: isEditing ? "#f3feff" : "white" }}>
            <div className="card-header">
                <h3 key={comment.author}>{comment.author}</h3>
                <em key={comment.date}>Posté le {dateParser(comment.date)}</em>
            </div>
            {isEditing
                ? (<textarea onChange={(e) => setEditedContent(e.target.value)} autoFocus defaultValue={editedContent ? editedContent : comment.content}></textarea>)
                : (<p key={comment.content}>{editedContent ? editedContent : comment.content}</p>)
            }
            {
                comment.id_author === "PngUNnesmjWXVQ6uQAs6vuEwxQS2" &&
                <div className="btn-container">
                    {isEditing
                        ? (<button onClick={handleEdit}>Valider</button>)
                        : (<button onClick={() => setIsEditing(true)}>Modifier</button>)
                    }
                    <DelArticle comment={comment}/>
                </div>
            }
        </li>
    );
};

export default Article;