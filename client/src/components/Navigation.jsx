/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */
import { Link } from "react-router-dom"


export default function Navigation(props) {
    const isLoggedIn = () => {
        const token = localStorage.getItem("token");
        if (token) { props.setUser(true) } // TODO: I can make this a litle cleaner ask in osp
        return token && isTokenValid(token);
    }
    const logOut = () => {
        localStorage.removeItem("token");
        props.setUser(false);
    }

    // TODO: send token to backend for validation
    const isTokenValid = (token) => {
        let decoded = undefined
        try {
            decoded = JSON.parse(atob(token.split(".")[1]))
        } catch (e) {
            return false
        }
        const now = Date.now().valueOf() / 1000
        if (typeof decoded.exp !== "undefined" && decoded.exp < now) {
            return false
        }
        return true
    }


    return (
        <nav>
            <ul>
                <li>
                    <Link to="/books">Books</Link>
                </li>
                {props.user && isLoggedIn() ? (
                    <>
                        <li>
                            <Link to="/account">Account</Link>
                        </li>

                        <li>
                            <a href="#" onClick={logOut}>Logout</a>
                        </li>
                        <li>
                            <Link to="/checkout">Checkout</Link>
                            <span>{props.cartItems}</span>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </>
                )
                }



            </ul>
        </nav>
    )
}
