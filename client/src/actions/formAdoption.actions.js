import axios from "axios";

export const ADD_FORM_ADOPTION = "ADD_FORM_ADOPTION";

export const createFormAdoption = (name, _id, uid) => {
    return (dispatch) => {
        return axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/formAdoption/`,
            data: {
                name: name,
                _id: _id,
                uid: uid
            },
        })
            .then((res) => {
                dispatch({ type: ADD_FORM_ADOPTION, payload: { name } });
            })
            .catch((err) => console.log(err));
    };
};