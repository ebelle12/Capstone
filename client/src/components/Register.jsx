/* TODO - add your code to create a functional React component that renders a registration form */
// export default function Register() {
//     return (
//         <div>Register</div>
//     )
// }
import { useState } from "react";
const API_URL = "http://localhost:3000/api";
export default function Register() {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);

    const usernameHandler = (e) => {
        console.log("emailHandler:", e.target.value);
        setUsername(e.target.value);
    }
    const passwordHandler = (e) => {
        console.log("password:", e.target.value);
        setPassword(e.target.value);
    }
    async function handleSubmit(e) {
        e.preventDefault();
        /*
                const form = e.target;
                console.table(e);
                console.table(form)
                const formData = new FormData(e.target);
                const body = Object.fromEntries(formData.entries());
                */
        const body = {
            email: email,
            username: username,
            password: password,
            name: name
        }
        console.log("body:", body);
        console.log("reg data:", body);

        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            const result = await response.json();
            console.log("json", result);

            if (result.token) {
                localStorage.setItem("token", result.token);
            } else {

                setError(result.message);
            }
            console.log(result);
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <>
            <h2>Register Here</h2>
            {error && <p>{error}</p>}

            <form method="post" onSubmit={handleSubmit}>
                <label>
                    Username:{" "}
                    <input
                        value={username}
                        onChange={usernameHandler}
                    />
                </label>
                <label>
                    Email:{" "}
                    <input
                        value={username}
                        onChange={usernameHandler}
                    />
                </label>
                <label>
                    Name:{" "}
                    <input
                        value={username}
                        onChange={usernameHandler}
                    />
                </label>

                <label>
                    Password:{" "}
                    <input
                        type="password"
                        value={password}
                        onChange={passwordHandler}
                    />

                </label>
                <button type="submit">Submit</button>
            </form>
        </>
    );
}