/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"


export default function Books() {
    const [books, setBooks] = useState([])
    useEffect(() => {
        async function fetchBooks() {
            fetch("http://localhost:3000/api/products")
                .then(response => response.json())
                .then(data => setBooks(data))
                .catch(error => console.log(error))
        }
        fetchBooks()
    }, [])

    return (
        <>
            <div>Books</div>
            {books.map(book => {
                return (
                    <div key={book.id}>
                        <Link to={`/books/${book.id}`}>
                            <img src={book.photos} alt={`cover art for ${book.name}`} />
                            {book.name}
                            <p>{book.price}</p>

                        </Link>
                    </div>
                )
            })}
        </>


    )
}