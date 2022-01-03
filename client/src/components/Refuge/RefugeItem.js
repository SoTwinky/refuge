import React from 'react';

const RefugeItem = ({refuge}) => {
    return (
        <li className="item">
            <div className="visuel">
                <img key={refuge.picture.id} src={refuge.picture} alt="flag"/>
            </div>
            <div className="itemInfo">
                <div className={'icone ' + refuge.country} key={refuge.country.id}><span className="visuallyhidden">{refuge.country}</span></div>
                <a href={"/refuge/" + refuge._id} key={refuge.name.id}>{refuge.name}</a>
                <div key={refuge.population.id}>Age: {refuge.population}</div>
            </div>
        </li>
    );
};

export default RefugeItem;