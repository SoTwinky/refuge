import axios from "axios";

export const ADD_PET = "ADD_PET";
export const DELETE_PET = "DELETE_PET";
export const UPDATE_CONTENT = "UPDATE_CONTENT";

export const updateComment = (commentId, content) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/comment/update/${commentId}`,
            data: { content: content },
        })
            .then((res) => {
                dispatch({ type: UPDATE_CONTENT, payload: content });
            })
            .catch((err) => console.log(err));
    };
};

export const addComment = (id_author, pseudo, content, petId) => {
    return (dispatch) => {
        return axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/comment/add/`,
            data: {
                id_author: id_author,
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

export const delComment = (commentId) => {
    return (dispatch) => {
        return axios({
            method: "delete",
            url: `${process.env.REACT_APP_API_URL}api/comment/delete/${commentId}`,
        })
            .then((res) => {
                dispatch({ type: DELETE_COMMENT, payload: { commentId } });
            })
            .catch((err) => console.log(err));
    };
};