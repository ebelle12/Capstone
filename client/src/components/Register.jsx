import { useState } from "react";
import { useNavigate } from "react-router-dom";


//const API_URL = "http://localhost:3000/api";
const API_URL = "https://capstone-rtmh.onrender.com/api";
export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        name: '',
        password: ''
    })
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState, // The ... is the spread operator. Creates a new object with all the current state's properties.
            [name]: value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

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
                navigate("/login")
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
            {error && <p>{error}</p>}

            <form className="form-container" method="post" onSubmit={handleSubmit}>
                <h2 className="title">Register</h2>
                <div className="form">
                    <label for="username">Username:{" "}</label>
                    <input
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    <label for="email">Email:{" "}</label>
                    <input
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    <label for="name">Name:{" "}</label>
                    <input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    <label for="password">Password:{" "}</label>
                    <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                </div>
                <button type="submit">Submit</button>
            </form>
        </>
    );
}