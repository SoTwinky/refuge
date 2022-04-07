import axios from "axios";

export const ADD_PET = "ADD_PET";
export const UPDATE_NAME = "UPDATE_NAME";
export const DELETE_PET = "DELETE_PET";
export const ADD_FORM_ADOPTION = "ADD_FORM_ADOPTION";

export const createPet = (name, eyeColor, color, age, weight, gender, picture, refuge, about) => {
    return (dispatch) => {
        return axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/pet/`,
            data: {
                name: name,
                eyeColor: eyeColor,
                color: color,
                age: age,
                weight: weight,
                gender: gender,
                picture: picture,
                refuge: refuge,
                about: about
            },
        })
            .then((res) => {
                dispatch({ type: ADD_PET, payload: { name } });
            })
            .catch((err) => console.log(err));
    };
};

export const updatePet = (petId, name, eyeColor, color, age, weight, gender, picture, about) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/pet/update/${petId}`,
            data: {
                name: name,
                eyeColor: eyeColor,
                color: color,
                age: age,
                weight: weight,
                gender: gender,
                picture: picture,
                about: about
            },
        })
            .then((res) => {
                dispatch({ type: UPDATE_NAME, payload: { name } });
            })
            .catch((err) => console.log(err));
    };
};

export const deletePet = (petId) => {
    return (dispatch) => {
        return axios({
            method: "delete",
            url: `${process.env.REACT_APP_API_URL}api/pet/delete/${petId}`,
        })
            .then((res) => {
                dispatch({ type: DELETE_PET, payload: { petId } });
            })
            .catch((err) => console.log(err));
    };
};
