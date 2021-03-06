import React from 'react';

const PetItem = ({pet}) => {
    return (
        <li className="item">
            <div className="visuel">
                <img key={pet.picture.id} src={pet.picture} alt="flag"/>
                <div className={'icone ' + pet.gender} key={pet.gender.id}><span
                    className="visuallyhidden">{pet.gender}</span></div>
            </div>
            <div className="itemInfo">
                <h3>
                    <a href={"/pet/" + pet._id}
                       key={pet.name.id}>{pet.name}<span>{pet.age && ', ' + (pet.age && pet.age > 1 ? pet.age + ' ans' : pet.age + ' an')}</span></a>
                </h3>
                {pet.weight &&
                    <p>Poids : {pet.weight > 1 ? pet.weight + ' kilos' : pet.weight + ' kilo'}</p>
                }
            </div>
        </li>
    );
};

export default PetItem;