import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"
import React, {useState, useEffect} from "react"
import PaymentForm from "./PaymentForm"
import SubscriptionForm from "./SubscriptionForm";

const PUBLIC_KEY = "pk_test_51KqM5dJFBabTcxIb0soeLUdLD2VmYwJqBIAnRT8Eea3SmkHiZKbaCx2HgkWn6qPbnhpRSVrzwJsD5QyTJO0qF2wc00r2MRNvA7";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer({recurrent, showItem, amount, refuge}) {
    const [subscription, setSubscription] = useState(false);

    useEffect(() => {
        setSubscription(recurrent);
    }, [recurrent]);

    return (
        <Elements stripe={stripeTestPromise}>
            {subscription
                ?
                <SubscriptionForm showItem={showItem}/>
                :
                <PaymentForm showItem={showItem} amount={amount} refuge={refuge}/>
            }
        </Elements>
    )
};