import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from "axios";
import PetsRefuge from "../../components/PetsRefuge";

const Refuge = () => {
    const {_id} = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:4000/api/refuge/' + _id)
            .then((res) => {
                setData(res.data);
            })
            .catch(err => {
                return err;
            });
    }, [_id]);

    return (
        <div>
            <div id="contenu">
                <div className="accroche" style={{backgroundImage: `url(${data.picture})`}}>
                    <div className="innerCenter">
                        <div className="bloc">
                            <div className="texte">
                                <h1>Url : {data.url}</h1>
                                <h1>Refuge : {data.name}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="innerCenter">
                    <div>
                        <h2>En quelques mots</h2>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                            been
                            the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                            galley
                            of type and scrambled it to make a type specimen book. It has survived not only five
                            centuries,
                            but also the leap into electronic typesetting, remaining essentially unchanged. It was
                            popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
                            passages,
                            and more recently with desktop publishing software like Aldus PageMaker including versions
                            of
                            Lorem Ipsum.
                        </p>
                    </div>
                    <div>
                        <h2>Les activités du refuge</h2>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                            been
                            the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                            galley
                            of type and scrambled it to make a type specimen book. It has survived not only five
                            centuries,
                            but also the leap into electronic typesetting, remaining essentially unchanged. It was
                            popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
                            passages,
                            and more recently with desktop publishing software like Aldus PageMaker including versions
                            of
                            Lorem Ipsum.
                        </p>
                    </div>
                    <PetsRefuge refuge={_id} key={_id}/>
                </div>
            </div>
        </div>
    );
};

export default Refuge;