/* TODO - add your code to create a functional React component that renders a registration form */
// export default function Register() {
//     return (
//         <div>Register</div>
//     )
// }
import { useState } from "react";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        console.table(e);
        console.table(form)
        const formData = new FormData(form);
        console.log(formData);

        try {
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
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label>
                    Password:{" "}
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                </label>
                <button>Submit</button>
            </form>
        </>
    );
}