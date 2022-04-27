import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, {useEffect, useState} from 'react'
import {createPayment} from "../../actions/payment.actions";
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
            ":-webkit-autofill": { color: "#fce883" },
            "::placeholder": { color: "#87bbfd" }
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "#ffc7ee"
        }
    }
};

export default function PaymentForm({showItem, refuge}) {
    const [showItemBtn, setShowItemBtn] = useState(showItem);
    const [amount, setAmount] = useState('');
    const userData = useSelector((state) => state.userReducer);
    const [success, setSuccess ] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();

    useEffect(() => {
        setShowItemBtn(showItem);
    }, [showItem]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        });

        if(!error) {
            try {
                const {id} = paymentMethod;
                const response = await axios.post("http://localhost:4000/payment", {
                    amount: amount,
                    id
                });

                if(response.data.success) {
                    setSuccess(true);
                    dispatch(createPayment(amount, refuge, userData._id))
                        .then(() => {
                            window.location.replace(`http://localhost:3000/refuge/${refuge}`)
                        });
                }

            } catch (error) {
                console.log("Error", error)
            }
        } else {
            console.log(error.message)
        }
    };

    return (
        <div className={"modalPayment " + (showItemBtn ? 'open' : 'close')}>
            {!success ?
                <div className="form-pay">
                    <form onSubmit={handleSubmit}>
                        <fieldset>
                            <label htmlFor="amount">Montant</label>
                            <input type="number" id="amount" placeholder="15€" step="0.01" min="2" onChange={(e) => setAmount(e.target.value * 100)}/>
                        </fieldset>
                        <fieldset className="FormGroup">
                            <div className="FormRow">
                                <span>Paiement</span>
                                <CardElement options={CARD_OPTIONS}/>
                            </div>
                        </fieldset>
                        <div className="flexCenter">
                            <button>Payer</button>
                        </div>
                    </form>
                    <button onClick={() => setShowItemBtn(false)}>Fermer</button>
                </div>
                :
                <div>
                    <h2>You just bought a sweet spatula congrats this is the best decision of you're life</h2>
                </div>
            }
        </div>
    )
}