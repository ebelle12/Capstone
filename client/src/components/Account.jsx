/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
// export default function Account() {
//     return (
//         <div>Account</div>
//     )
// }
const API_URL = "https://localhost:3000/api";
import React, { useState, useEffect } from 'react';
import { TokenContext } from '../App';
const Account = ({ loggedInUserId }) => {
    const [accountData, setAccountData] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = React.useContext(TokenContext);
    console.log("token:", token);
    useEffect(() => {
        //console.log("loggedInUserId", loggedInUserId)
        const fetchAccountData = async () => {
            try {
                //  const response = await fetch(`/api/users/${loggedInUserId}/account`);
                const response = await fetch(`${API_URL}/users/me`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                });
                console.log("response:", response);
                if (!response.ok) {
                    throw new Error('Failed to fetch account data');
                }
                const data = await response.json();
                setAccountData(data);
                setLoading(false);
            } catch (error) {
                console.log('Error fetching account data:', error);
                setLoading(false);
            }
        };
        if (loggedInUserId) {
            fetchAccountData();
        }
    }, [loggedInUserId]);
    if (!loggedInUserId) {
        return (
            <div>
                <p>Login or Create Account</p>
            </div>
        );
    }
    if (loading) {
        return <p>Account details loading...</p>;
    }
    return (
        <div>
            <h2>Account Details</h2>
            {accountData ? (
                <div>
                    <p>Username: {accountData.username}</p>
                    <p>Email: {accountData.email}</p>
                    <h3>Purchased Books:</h3>
                    <ul>
                        {accountData.purchasedBooks.length > 0 ? (
                            accountData.purchasedBooks.map(book => (
                                <li key={book.id}>{book.title}</li>
                            ))
                        ) : (
                            <p>No books purchased.</p>
                        )}
                    </ul>
                </div>
            ) : (
                <p>No account data available.</p>
            )}
        </div>
    );
};
export default Account;