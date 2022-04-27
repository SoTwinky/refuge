import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js"
import axios from "axios"
import React, {useEffect, useState} from 'react'
import {createSubscription} from "../../actions/subscription.actions";
import {useDispatch, useSelector} from "react-redux";

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

export default function SubscriptionForm({showItem, pet, refuge}) {
    const [showItemBtn, setShowItemBtn] = useState(showItem);
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState(2000);
    const [success, setSuccess] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userReducer);

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
                    email: email,
                    amount: Number(amount),
                    id
                });

                const {client_secret, status} = response.data;

                if (status === 'requires_action') {
                    stripe.confirmCardPayment(client_secret).then(function (result) {
                        if (result.error) {
                            return false;
                        } else {
                            setSuccess(true);
                        }
                    });
                }

                if (response.data.success) {
                    dispatch(createSubscription(amount, pet, userData._id, refuge))
                        .then(() => {
                            window.location.replace(`http://localhost:3000/pet/${pet}`)
                        });
                    setSuccess(true);
                } else {
                    console.log("Error payment" + amount);
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

                            <div onChange={(e) => setAmount(e.target.value)}>
                                <input type="radio" id="amount_15" name="amount" value="1500"/>
                                <label htmlFor="amount_15">15€ par mois</label>

                                <input type="radio" id="amount_20" name="amount" value="2000" defaultChecked/>
                                <label htmlFor="amount_20">20€ par mois</label>

                                <input type="radio" id="amount_25" name="amount" value="2500"/>
                                <label htmlFor="amount_25">25€ par mois</label>
                                <input type="radio" id="amount_50" name="amount" value="5000"/>
                                <label htmlFor="amount_50">50€ par mois</label>
                                <input type="radio" id="amount_100" name="amount" value="10000"/>
                                <label htmlFor="amount_100">100€ par mois</label>
                            </div>
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