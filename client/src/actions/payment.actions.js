import axios from "axios";

export const ADD_PAYMENT = "ADD_PAYMENT";

export const createPayment = (amount, refuge_id, email) => {
    return (dispatch) => {
        return axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/payment/`,
            data: {
                amount: amount,
                refuge_id: refuge_id,
                email: email
            },
        })
            .then((res) => {
                dispatch({ type: ADD_PAYMENT, payload: { amount } });
            })
            .catch((err) => console.log(err));
    };
};