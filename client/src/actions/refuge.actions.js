import axios from "axios";

export const ADD_REFUGE = "ADD_REFUGE";
export const UPDATE_NAME = "UPDATE_NAME";
export const DELETE_REFUGE = "DELETE_REFUGE";

export const createRefuge = (name, country) => {
    return (dispatch) => {
        return axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/refuge/`,
            data: {
                name: name,
                url: name.replace(/ /g,"_").toLowerCase(),
                country: country
            },
        })
            .then((res) => {
                dispatch({ type: ADD_REFUGE, payload: { name } });
            })
            .catch((err) => console.log(err));
    };
};

export const updateRefuge = (refugeId, name, country) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/refuge/update/${refugeId}`,
            data: { name: name, country: country },
        })
            .then((res) => {
                dispatch({ type: UPDATE_NAME, payload: { name, country} });
            })
            .catch((err) => console.log(err));
    };
};

export const deleteRefuge = (refugeId) => {
    return (dispatch) => {
        return axios({
            method: "delete",
            url: `${process.env.REACT_APP_API_URL}api/refuge/delete/${refugeId}`,
        })
            .then((res) => {
                dispatch({ type: DELETE_REFUGE, payload: { refugeId } });
            })
            .catch((err) => console.log(err));
    };
};