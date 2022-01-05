import React, {useEffect, useState} from 'react';
import axios from "axios";
import DelArticle from "./delArticle";
import {updateComment} from "../actions/comment.actions";
import {useDispatch} from "react-redux";

const Article = ({comment, uid}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState("");
    const dispatch = useDispatch();

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
        let content = editedContent ? editedContent : comment.content;
        dispatch(updateComment(comment._id, content))
            .then(() => setIsEditing(false));
    };

    return (
        <li className="article" style={{ background: isEditing ? "#f3feff" : "white" }}>
            <div className="card-header">
                <h3 key={comment.author}>{comment.author}</h3>
                <em key={comment.createdAt}>Posté le {dateParser(comment.createdAt)}</em>
            </div>
            {isEditing
                ? (<textarea onChange={(e) => setEditedContent(e.target.value)} autoFocus defaultValue={editedContent ? editedContent : comment.content}></textarea>)
                : (<p key={comment.content}>{editedContent ? editedContent : comment.content}</p>)
            }
            {comment.id_author === uid &&
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