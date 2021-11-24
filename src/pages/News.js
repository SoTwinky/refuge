import React, { useEffect, useState } from 'react';
import axios from "axios";
import Article from "../components/Article";
import Header from "../core/Header";

const News = () => {
    const [newsData, setNewsData] = useState([]);
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios
            .get('http://localhost:3003/dogs')
            .then((res) => setNewsData(res.data))
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (content.length > 140) {
            setError(true);
        } else {
            axios
                .post('http://localhost:3003/articles', {
                    author,
                    content,
                    date: Date.now()
                }).then(() => {
                setAuthor("");
                setContent("");

            });

            setError(false);
        }
    };

    return (
        <div id="document" className="news-container">
            <Header/>
            <div className="innerCenter">
                <h1>News</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input type="text" placeholder="Nom" onChange={(e) => setAuthor(e.target.value)} value={author}/>
                    <textarea style={{ border: error ? "1px solid red" : "1px solid #61dafb" }} placeholder="Message" id="" cols="30" rows="10" onChange={(e) => setContent(e.target.value)} value={content}></textarea>
                    {error && <p>Veuillez écrire un maximum de 140 caractères</p>}
                    <input type="submit" value="Envoyer"/>
                </form>

                <ul>
                    {newsData
                        .sort((a, b) => b.age - a.age)
                        .map((article) => (
                            <Article key={article.name} article={article}/>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default News;