/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
// export default function Account() {
//     return (
//         <div>Account</div>
//     )
// }

import React, { useState, useEffect } from 'react';
const Account = ({ loggedInUserId }) => {
    const [accountData, setAccountData] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchAccountData = async () => {
            try {
                const response = await fetch(`/api/users/${loggedInUserId}/account`);
                if (!response.ok) {
                    throw new Error('Failed to fetch account data');
                }
                const data = await response.json();
                setAccountData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching account data:', error);
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
                    <h3>Checked Out Books:</h3>
                    <ul>
                        {accountData.checkedOutBooks.length > 0 ? (
                            accountData.checkedOutBooks.map(book => (
                                <li key={book.id}>{book.title}</li>
                            ))
                        ) : (
                            <p>No books checked out.</p>
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