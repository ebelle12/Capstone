import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function Checkout() {
    const [cartItems, setCartItems] = useState([])
    const API_URL = "http://localhost:3000/api"

    useEffect(() => {
        async function getCartItems() {
            fetch(`${API_URL}/user/cart/${localStorage.getItem("token")}`)
                .then(response => response.json())
                .then(result => setCartItems(result))
                .catch((error) => console.error("Error:", error))
        }
        getCartItems()
    }, [])

    async function handleChange(e) {
        console.log(cartItems);
        setCartItems((prevCartItems) => {
            const newCartItems = [...prevCartItems]
            newCartItems[e.target.name].amount = e.target.value
            return newCartItems
        })
    }
    // did it work?
    return (
        <>
            <h1>Checkout</h1>
            {cartItems.map((cartItem, i) => {
                return (
                    <div key={cartItem.id}>
                        <img src={cartItem.photos} alt={`cover art for ${cartItem.name}`} />
                        <p>{cartItem.name}</p>
                        <Link to={`/books/${cartItem.id}`}>Go to item page</Link>
                        <p>{cartItem.price}</p>
                        <input type="number" name={i} id="amount" value={cartItem.amount} onChange={handleChange} />
                    </div>
                )
            })}
        </>


    )
}