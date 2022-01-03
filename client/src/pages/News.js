import React, {useEffect, useState} from 'react';
import axios from "axios";
import Article from "../components/Article";
import firebase from "../utils/firebaseConfig";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const Comments = ({id}) => {
    const [commentsData, setCommentsData] = useState([]);
    const [content, setContent] = useState("");
    const [error, setError] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        getComments();
        firebase.auth().onAuthStateChanged((user) => {
            setIsSignedIn(!!user);
        });
    }, []);

    const uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            signInSuccess: () => false,
        },
    };

    const getComments = () => {
        axios
            .get('http://localhost:4000/api/comment')
            .then((res) => setCommentsData(res.data))
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (content.length > 140) {
            setError(true);
        } else {
            axios
                .post('http://localhost:4000/api/comment', {
                    author: firebase.auth().currentUser.displayName,
                    content,
                    date: Date.now(),
                    pet: id
                }).then(() => {
                setContent("");
                getComments();
            });

            setError(false);
        }
    };

    return (
        <div>
            <h1>News</h1>
            {isSignedIn
                ?
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input type="text" placeholder="Nom" disabled="disabled"
                           value={firebase.auth().currentUser.displayName}/>
                    <textarea style={{border: error ? "1px solid red" : "1px solid #61dafb"}} placeholder="Message"
                              id="" cols="30" rows="10" onChange={(e) => setContent(e.target.value)}
                              value={content}></textarea>
                    {error && <p>Veuillez écrire un maximum de 140 caractères</p>}
                    <input type="submit" value="Envoyer"/>
                </form>
                :
                <StyledFirebaseAuth
                    uiConfig={uiConfig}
                    firebaseAuth={firebase.auth()}
                />
            }
            <ul>
                {
                    commentsData
                        .filter((comment) => (id === comment.pet))
                        .sort((a, b) => b.date - a.date)
                        .map((comment) => (
                            <Article key={comment.name} comment={comment} idPet={id}/>
                        ))
                }

            </ul>
        </div>
    );
};

export default Comments;