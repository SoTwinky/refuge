import axios from "axios";

export const ADD_SUBSCRIPTION = "ADD_SUBSCRIPTION";

export const createSubscription = (amount, pet, id_user, refuge) => {
    return (dispatch) => {
        return axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/subscription/`,
            data: {
                amount: amount,
                pet: pet,
                id_user: id_user,
                refuge: refuge
            },
        })
            .then((res) => {
                dispatch({ type: ADD_SUBSCRIPTION, payload: { amount } });
            })
            .catch((err) => console.log(err));
    };
};