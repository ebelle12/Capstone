/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

export default function SingleBook() {
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
    async function handleClick(book) {
        await fetch(API_URL+"api/products/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(book)
        })
        
    }
    return (
        <>
            <h1>{book.name}</h1>
            <img src={book.photos} alt={`photo of ${book.name}`} />
            <p>{book.description}</p>
            <p>{book.price}</p>
            <p>{book.inventory}</p>
            <button onClick={() => handleClick(book)}>Add to cart</button>
        </> 
    )
    
}