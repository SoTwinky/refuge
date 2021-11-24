import React from 'react';

const Pet_Item = ({pet}) => {
    const numberFormat = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };
    
    return (
            <li className="item">
                <div className="visuel">
                    <img key={pet.picture.id} src={pet.picture} alt="flag"/>
                    <div className={'icone ' + pet.gender} key={pet.gender.id}><span className="visuallyhidden">{pet.gender}</span></div>
                </div>
                <div className="itemInfo">
                    <h3>
                        <a href={"/pet/" + pet._id} key={pet.name.id}>{pet.name}</a>
                    </h3>
                    <div key={pet.age.id}>Age: {pet.age}</div>
                </div>
            </li>
    );
};

export default Pet_Item;