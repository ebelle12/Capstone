/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

export default function SingleBook() {
    const [amount, setAmount] = useState({ "amount": 1 })
    const { bookId } = useParams()
    const API_URL = "http://localhost:3000/"
    const [book, setBook] = useState({})
    useEffect(() => {
        async function loadBook() {
            await fetch(API_URL + `api/products/${bookId}`)
                .then(response => response.json())
                .then(result => setBook(result))
                .catch((error) => {
                    console.error('Error: ' + error)
                })
        }
        loadBook;
    })

    async function handleChange(event) {
        const { name, value } = event.target
        setAmount({ name: value })
    }

    async function handleSubmit(event) {
        await fetch(API_URL + "/api/users/cart_products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...book, amount })
        })

    }
    return (
        <>
            <h1>{book.name}</h1>
            <img src={book.photos} alt={`photo of ${book.name}`} />
            <p>{book.description}</p>
            <p>{book.price}</p>
            <p>{book.inventory}</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="amount">
                    <input type="number" name="amount" id="amount" value={amount.amount} onChange={handleChange} />
                </label>

                <button type="submit">Add to cart</button>
            </form>

        </>
    )

}