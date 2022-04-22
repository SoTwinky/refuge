import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js"
import axios from "axios"
import React, {useEffect, useState} from 'react'

const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "#fff",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": {color: "#fce883"},
            "::placeholder": {color: "#87bbfd"}
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "#ffc7ee"
        }
    }
};

export default function SubscriptionForm({showItem}) {
    const [showItemBtn, setShowItemBtn] = useState(showItem);
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        setShowItemBtn(showItem);
    }, [showItem]);

    const handleSubmitSub = async (e) => {
        e.preventDefault();
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
            billing_details: {
                email: email,
            }
        });

        if (!error) {
            try {
                const {id} = paymentMethod;
                const response = await axios.post("http://localhost:4000/subscription", {
                    amount: 1200,
                    email: email,
                    id
                });

                const {client_secret, status} = response.data;

                if (status === 'requires_action') {
                    stripe.confirmCardPayment(client_secret).then(function (result) {
                        if (result.error) {
                            return false;
                        } else {
                            setSuccess(true);
                            console.log("Successful payment 1");
                        }
                    });
                }

                if (response.data.success) {
                    console.log("Successful payment")
                    setSuccess(true);
                }
            } catch (error) {
                console.log("Error", error)
            }
        } else {
            console.log(error.message)
        }
    };

    return (
        <div className={"modalSubscription " + (showItemBtn ? 'open' : 'close')}>
            {!success ?
                <div className="form-pay">
                    <form onSubmit={handleSubmitSub}>
                        <fieldset className="FormGroup">
                            <p>
                                <label htmlFor="subscription_email">Email</label>
                                <input id="subscription_email" type="email" onChange={(e) => setEmail(e.target.value)}/>
                            </p>
                            <div className="FormRow">
                                <span>Paiement</span>
                                <CardElement options={CARD_OPTIONS}/>
                            </div>
                        </fieldset>
                        <div className="flexCenter">
                            <button className="btn-modal-payment">Payer</button>
                        </div>
                    </form>
                    <button className="btn-modal-close" onClick={() => setShowItemBtn(false)}>Abandonner</button>
                </div>
                :
                <div>
                    <h2>You just bought a sweet spatula congrats this is the best decision of you're life</h2>
                </div>
            }
        </div>
    );
}