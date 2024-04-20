/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

export default function SingleBook(props) {
    const [amount, setAmount] = useState({ "amount": 1 })
    const { bookId } = useParams()
    const API_URL = "http://localhost:3000/api"
    const [book, setBook] = useState({})

    useEffect(() => {
        async function loadBook() {
            fetch(API_URL + `/products/${bookId}`)
                .then(response => response.json())
                .then(result => setBook(result))
                .catch((error) => {
                    console.error('Error: ' + error)
                })
        }
        loadBook();
    })

    async function handleChange(event) {
        const { name, value } = event.target
        setAmount({ name: value })
    }

    async function handleSubmit(event) {
        event.preventDefault();

        console.log({ ...book, ...amount, "token": localStorage.getItem("token") })

        await fetch(API_URL + "/users/cart_products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...book, "product_id": book.id, ...amount, "token": localStorage.getItem("token") })
        })
    }

    return (
        <>
            <h1>{book.name}</h1>
            <img src={book.photos} alt={`photo of ${book.name}`} />
            <p>{book.description}</p>
            <p>{book.price}</p>
            <p>{book.inventory}</p>
            {props.user && (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="amount">
                        <input type="number" name="amount" id="amount" value={amount.amount} onChange={handleChange} />
                    </label>

                    <button type="submit">Add to cart</button>
                </form>
            )}
        </>
    )

}