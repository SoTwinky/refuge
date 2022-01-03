import axios from "axios";

export const ADD_COMMENT = "ADD_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const UPDATE_CONTENT = "UPDATE_CONTENT";

export const updateComment = (petId, content) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/comment/` + petId,
            data: { content },
        })
            .then((res) => {
                dispatch({ type: UPDATE_CONTENT, payload: content });
            })
            .catch((err) => console.log(err));
    };
};

export const addComment = (pseudo, content, petId) => {
    return (dispatch) => {
        return axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/comment/add/`,
            data: {
                author: pseudo,
                content: content,
                date: Date.now(),
                pet: petId
            },
        })
            .then((res) => {
                dispatch({ type: ADD_COMMENT, payload: { petId } });
            })
            .catch((err) => console.log(err));
    };
};

export const delComment = (petId, comment) => {
    return (dispatch) => {
        return axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/comment/del/` + petId,
            data: { comment },
        })
            .then((res) => {
                dispatch({ type: DELETE_COMMENT, payload: { comment } });
            })
            .catch((err) => console.log(err));
    };
};