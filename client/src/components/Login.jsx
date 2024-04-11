/* TODO - add your code to create a functional React component that renders a login form */
// export default function Login() {
//     return (
//         <div>Login</div>
//     )
// }

import { useState } from "react";
import {Link} from "react-router-dom";

const API_URL = "https://localhost:/3000/api";


export default function Login() {
    // used to display the error message later
    const [error, setError] = useState("");

    async function handleSubmit(evt) {
        evt.preventDefault();



        const formData = new FormData(evt.target);
        const body = Object.fromEntries(formData.entries());
        console.log("body:", body);
        try {
            const response = await fetch(`${API_URL}/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            const result = await response.json();
            console.log("login.json:", result);

            if (result.token) {
                localStorage.setItem("token", result.token);
            } else {

                setError(result.message);
            }
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            {
            }
            {error && <h2>{error}</h2>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">
                    Email: <input type="email" name="email" />
                </label>
                <br />
                <label htmlFor="pssword">
                    Password: <input type="password" name="password" />
                </label>
                <br />
                <Link to="/register">Click here Register</Link>

                <button type="submit">Log In</button>
            </form>
        </>
    );
}
