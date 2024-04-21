import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000/api";


export default function Login(props) {
    // used to display the error message later
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(evt) {
        evt.preventDefault();

        const formData = new FormData(evt.target);
        const body = Object.fromEntries(formData.entries());
        console.log("body:", body);
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
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
                props.setUser(true)
                navigate("/")
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
            <h2 className="title">Login</h2>
            {error && <h2>{error}</h2>}

            <form className="form-container" onSubmit={handleSubmit}>
                <div className="form">
                    <label htmlFor="username">
                        Username: 
                    </label>
                    <input type="text" name="username" id="username" />
                    <label htmlFor="password">
                        Password: 
                    </label>
                    <input type="password" name="password" id="password" />
                    <Link className="a" to="/register">Click here Register</Link>
                </div>
                <button type="submit">Log In</button>
            </form>
        </>
    );
}
