/* TODO - add your code to create a functional React component that renders a login form */
// export default function Login() {
//     return (
//         <div>Login</div>
//     )
// }

import { useState } from "react";

const API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";


export default function Login({ setToken }) {
    // used to display the error message later
    const [error, setError] = useState("");

    async function handleSubmit(evt) {
        evt.preventDefault();



        const formData = new FormData(evt.target);
        const body = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(`${API_URL}/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            const result = await response.json();


            if (result.token) {
                setToken(result.token);
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
                <label htmlFor="pssword">
                    <input type="password" name="password" />
                </label>
                <button type="submit">Log In</button>
            </form>
        </>
    );
}
