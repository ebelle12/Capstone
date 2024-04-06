/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
import { useParams } from "react-router-dom"
import { getBook } from "../api"
import { useState, useEffect } from "react"

export default function SingleBook() {
    const { bookId } = useParams()
    const [book, setBook] = useState({})
    useEffect(() => {
        getBook(bookId).then(setBook)
    })
    return (
        <h1>{book.title}</h1>
    )
}