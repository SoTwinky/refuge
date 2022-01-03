import React, {useContext} from "react";
import {useSelector} from "react-redux";
import {UidContext} from "../components/AppContext";
import Logout from "../components/Log/Logout";

const Profil = () => {
    const userData = useSelector((state) => state.userReducer);
    const uid = useContext(UidContext);

    return (
        <div className="innerCenter">
            <h1>React Crud</h1>
            <h4>Bonjour {userData.pseudo}</h4>
            <a href="/admin">Administrateur</a>
            <Logout uid={uid}/>
        </div>
    );
};

export default Profil;