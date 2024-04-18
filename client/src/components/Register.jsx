/* TODO - add your code to create a functional React component that renders a registration form */
// export default function Register() {
//     return (
//         <div>Register</div>
//     )
// }
import { useState } from "react";
const API_URL = "http://localhost:3000/api";
export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        name: '',
        password: ''
    })
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState, // The ... is the spread operator. Creates a new object with all the current state's properties.
            [name]: value
        }));
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
            ...formData
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
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Email:{" "}
                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Name:{" "}
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Password:{" "}
                    <input
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                </label>
                <button type="submit">Submit</button>
            </form>
        </>
    );
}