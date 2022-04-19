import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"

const PUBLIC_KEY = "pk_test_51KqM5dJFBabTcxIb0soeLUdLD2VmYwJqBIAnRT8Eea3SmkHiZKbaCx2HgkWn6qPbnhpRSVrzwJsD5QyTJO0qF2wc00r2MRNvA7";

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm />
        </Elements>
    )
};