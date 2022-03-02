import React from 'react';

const Admin = () => {
    return (
        <div className="innerCenter" id="admin">
            <p>Ici, vous retrouverez vos raccourcis et votre profil !</p>

            <div className="mBot">
                <h2>Mes raccourcis :</h2>
                <ul className="liste_3 ul_slider">
                    <li className="item randomColor">
                        <a href="/parrains"><span>Parrains</span></a>
                    </li>
                    <div className="item randomColor">
                        <a href="/refuges"><span>Refuges</span></a>
                    </div>
                    <div className="item randomColor">
                        <a href="/animaux"><span>Animaux</span></a>
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default Admin;