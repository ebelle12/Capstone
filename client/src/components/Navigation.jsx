/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */
import { Link } from "react-router-dom"


export default function Navigation() {
    const isLoggedIn = () =>{
        const token = localStorage.getItem("token");
        return token && isTokenValid(token);
    }

    const isTokenValid =(token) =>{
        try{
            const decoded = JSON.parse(atob(token.split(".")[1]))
        } catch(e){
            return false
        }
        const now = Date.now().valueOf()/1000
        if (typeof decoded.exp!=="undefined" && decoded.exp < now){
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
                {

                    isLoggedIn() ? (
                        <li>
                            <Link to="/account">Account</Link>
                        </li>

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
