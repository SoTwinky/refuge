import React, {useState} from 'react';
import axios from "axios";
import DelArticle from "./delArticle";

const Article = ({article}) => {
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
            author: article.author,
            content: editedContent ? editedContent : article.content,
            date: article.date
        };

        axios.put("http://localhost:3003/articles/" + article.id, data).then(() => setIsEditing(false));
    };

    return (
        <li className="article" style={{ background: isEditing ? "#f3feff" : "white" }}>
            <div className="card-header">
                <h3 key={article.author}>{article.author}</h3>
                <em key={article.date}>Posté le {dateParser(article.date)}</em>
            </div>
            {isEditing
                ? (<textarea onChange={(e) => setEditedContent(e.target.value)} autoFocus defaultValue={editedContent ? editedContent : article.content}></textarea>)
                : (<p key={article.content}>{editedContent ? editedContent : article.content}</p>)
            }
            <div className="btn-container">
                {isEditing
                    ? (<button onClick={handleEdit}>Valider</button>)
                    : (<button onClick={() => setIsEditing(true)}>Modifier</button>)
                }
                <DelArticle article={article}/>
            </div>
        </li>
    );
};

export default Article;