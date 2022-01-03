import React, {useState, useContext} from 'react';
import {UidContext} from "../AppContext";
import {useSelector} from "react-redux";
import axios from "axios";
import SignInForm from "../Log/SignInForm";

const FormAdoption = () => {
    const uid = useContext(UidContext);
    const userData = useSelector((state) => state.userReducer);

    const [btnAdoption, setBtnAdoption] = useState(false);
    const [formSubmit, setFormSubmit] = useState(false);
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");

    const handleAdoption = (e) => {
        if (e.target.id === "btn-adoption") {
            setBtnAdoption(!btnAdoption);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const terms = document.getElementById("terms");
        const pseudoError = document.querySelector(".pseudo.error");
        const emailError = document.querySelector(".email.error");
        const termsError = document.querySelector(".terms.error");

        termsError.innerHTML = "";


        if (!terms.checked) {
            termsError.innerHTML = "Veuillez valider les conditions générales";
        } else {
            await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/user/register`,
                data: {
                    pseudo,
                    email
                },
            })
                .then((res) => {
                    if (res.data.errors) {
                        pseudoError.innerHTML = res.data.errors.pseudo;
                        emailError.innerHTML = res.data.errors.email;
                    } else {
                        setFormSubmit(true);
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <div className="form-adoption">
            <div className="flexCenter">
                <h2>Vous souhaitez m'adopter ?</h2>
                <button onClick={handleAdoption}
                        id="btn-adoption"
                        className={btnAdoption ? "active-btn" : null}
                >
                    Oui, pour la vie !
                </button>
            </div>
            {formSubmit ? (
                <>
                    <SignInForm/>
                    <span></span>
                    <h4 className="success">
                        Enregistrement réussi, veuillez-vous connecter
                    </h4>
                </>
            ) : (
                btnAdoption && (
                    uid
                        ?
                        <div>
                            <form action="" onSubmit={handleRegister} id="sign-up-form" className="form-container-1">
                                <label htmlFor="pseudo">Pseudo</label>
                                <br/>
                                <input type="text"
                                       placeholder="Pseudo"
                                       disabled="disabled"
                                       value={userData.pseudo}
                                />
                                <div className="pseudo error"></div>
                                <br/>
                                <label htmlFor="email">Email</label>
                                <br/>
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    value={userData.email}
                                />
                                <div className="email error"></div>
                                <br/>
                                <input type="checkbox" id="terms"/>
                                <label htmlFor="terms">
                                    J'accepte les{" "}
                                    <a href="/" target="_blank" rel="noopener noreferrer">
                                        conditions générales
                                    </a>
                                </label>
                                <div className="terms error"></div>
                                <br/>
                                <input type="submit" value="Valider"/>
                            </form>
                        </div>
                        :
                        <div>
                            <form action="" onSubmit={handleRegister} id="sign-up-form" className="form-container-1">
                                <label htmlFor="pseudo">Pseudo</label>
                                <br/>
                                <input
                                    type="text"
                                    name="pseudo"
                                    id="pseudo"
                                    onChange={(e) => setPseudo(e.target.value)}
                                    value={pseudo}
                                />
                                <div className="pseudo error"></div>
                                <br/>
                                <label htmlFor="email">Email</label>
                                <br/>
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                                <div className="email error"></div>
                                <br/>
                                <input type="checkbox" id="terms"/>
                                <label htmlFor="terms">
                                    J'accepte les{" "}
                                    <a href="/" target="_blank" rel="noopener noreferrer">
                                        conditions générales
                                    </a>
                                </label>
                                <div className="terms error"></div>
                                <br/>
                                <input type="submit" value="Valider"/>
                            </form>
                        </div>
                )
            )}
        </div>
    );
};

export default FormAdoption;