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
            <div className="title">Books</div>
            {books.map(book => {
                return (
                    <Link key={book.id} id="book" to={`/books/${book.id}`}>
                        <div className="book">
                            <img src={book.photos} alt={`cover art for ${book.name}`} />
                            <div>
                                <p>{book.name}</p>
                                <p>Amount left: {book.inventory}</p>
                            </div>
                            <p>${book.price}</p>
                        </div>
                    </Link>
                )
            })}
        </>


    )
}