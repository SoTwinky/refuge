import React from 'react';
import $ from 'jquery';

        var heightBandeau = $("#bandeauHaut").innerHeight();
        $("#corps").css('margin-top', heightBandeau);
        $("#bandeauHaut").addClass('sticky');


const HeaderRefuge = () => {
    return (
        <div id="menuRefuge" className="menu">
            <a href="">
                <img src="" alt="Logo - Refuge"/>
            </a>
            <div className="navigation">
                <ul>
                    <li>Nos chiens</li>
                </ul>
            </div>
        </div>
    );
};

export default HeaderRefuge;