import React from 'react';
import EditProfil from "./Edit/EditProfil";
import SimpleBreadcrumbs from "../components/Breadcrumbs";


const Profil = () => {
    const pageName = 'Mon profil';
    const options = {
        items: [
            {to: "/my-dashboard", label: "Tableau de bord"},
        ]
    };

    return (
        <div className="innerCenter admin">
            <SimpleBreadcrumbs options={options} pageName={pageName}/>
            <h1>{pageName}</h1>
            <EditProfil/>
        </div>
    );
};

export default Profil;