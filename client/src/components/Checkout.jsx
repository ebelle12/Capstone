import { useEffect, useState } from "react"

export default function Checkout() {
    const [cartItems, setCartItems] = useState([])
    const API_URL = "http://localhost:3000/"

    useEffect = async () => {
        async function getCartItems() {
            response = await fetch(`${API_URL}/api/user/cart/${localStorage.getItem("token")}`)
            result = await response.json()
            console.log(result)
            setCartItems(result)
        }
        await getCartItems()
    }

    async function handleChange(e) {
        console.log(e)
    }
    
    return (
        <>
            <h1>Checkout</h1>
            {cartItems.map(cartItem => {
                return (
                    <div key={cartItem.id}>
                        <img src={cartItem.photos} alt={`cover art for ${cartItem.name}`} />
                        <p>{cartItem.name}</p>
                        <Link to={`/books/${cartItem.id}`}>Go to item page</Link>
                        <p>{cartItem.price}</p>
                        <input type="number" name="amount" id="amount" onChange={handleChange} />
                    </div>
                )
            })}
        </>


    )
}