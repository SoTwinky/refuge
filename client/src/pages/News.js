import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import Article from "../components/Article";
import Log from "../components/Log";
import {UidContext} from "../components/AppContext";
import {useSelector} from "react-redux";
import { addComment } from "../actions/comment.actions";
import { getAllComments } from "../actions/comments.actions";
import {useDispatch} from "react-redux";

const News = ({petId}) => {
    const uid = useContext(UidContext);
    const userData = useSelector((state) => state.userReducer);
    const [commentsData, setCommentsData] = useState([]);
    const [content, setContent] = useState("");
    const [error, setError] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        getComments();
    }, []);

    const getComments = () => {
        axios
            .get('http://localhost:4000/api/comment/')
            .then((res) => setCommentsData(res.data))
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (content.length > 140) {
            setError(true);
        } else {
            dispatch(addComment(uid, userData.pseudo, content, petId))
                .then(() => {
                    setContent("");
                    getComments();
                });

            setError(false);
        }
    };

    return (
        <div>
            <h1>News</h1>
            {uid
                ?
                <form onSubmit={(e) => handleSubmit(e)} className="form-container-1">
                    <input type="text" placeholder="Nom" disabled="disabled"
                           value={userData.pseudo || ''}/>
                    <textarea style={{border: error ? "1px solid red" : "1px solid #61dafb"}} placeholder="Message"
                              id="" cols="30" rows="10" onChange={(e) => setContent(e.target.value)}
                              value={content}/>
                    {error && <p>Veuillez écrire un maximum de 140 caractères</p>}
                    <input type="submit" value="Envoyer"/>
                </form>
                :
                <Log/>
            }
            <ul>
                {
                    commentsData
                        .filter((comment) => (petId === comment.pet))
                        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
                        .map((comment) => (
                            <Article key={comment.id} comment={comment} idPet={petId} uid={uid}/>
                        ))
                }

            </ul>
        </div>
    );
};

export default News;