import { useEffect, useState } from "react";
import "./AllExpenses.css";

export function AllExpenses() {
    const token = localStorage.getItem("token");

    const [expenses, setAllExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExpenses = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await fetch("http://localhost:5000/api/expenses", {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });

                if (!res.ok) {
                    throw new Error(`Request failed with status ${res.status}`);
                }

                const data = await res.json();

                if (!data.data || !Array.isArray(data.data)) {
                    throw new Error("Unexpected response shape from server");
                }

                setAllExpenses(data.data);
            } catch (err) {
                console.error("Failed to fetch expenses:", err);
                setError(err.message || "Something went wrong while fetching expenses");
            } finally {
                setLoading(false);
            }
        };

        if (!token) {
            setError("You're not logged in");
            setLoading(false);
            return;
        }

        fetchExpenses();
    }, [token]);

    const formatAmount = (amount) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }).format(amount);

    const formatDate = (date) =>
        new Date(date).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });

    const formatCategory = (category) =>
        category.replace(/_/g, " ").toLowerCase();

    if (loading) {
        return (
            <div className="expenses-page">
                <h1>Expenses</h1>
                <p className="expenses-status">Loading expenses...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="expenses-page">
                <h1>Expenses</h1>
                <p className="expenses-status expenses-error">{error}</p>
            </div>
        );
    }

    if (expenses.length === 0) {
        return (
            <div className="expenses-page">
                <h1>Expenses</h1>
                <p className="expenses-status">No expenses found.</p>
            </div>
        );
    }

    return (
        <div className="expenses-page">
            <h1>Expenses</h1>

            <div className="expenses-table-wrapper">
                <table className="expenses-table">
                    <thead>
                        <tr>
                            <th>Expense #</th>
                            <th>Category</th>
                            <th>Title</th>
                            <th className="align-right">Amount</th>
                            <th>Method</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Created by</th>
                            <th>Approved by</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((exp) => (
                            <tr key={exp._id}>
                                <td>{exp.expenseNumber}</td>
                                <td>{formatCategory(exp.category)}</td>
                                <td>{exp.title}</td>
                                <td className="align-right">{formatAmount(exp.amount)}</td>
                                <td>{exp.paymentMethod}</td>
                                <td>{formatDate(exp.expenseDate)}</td>
                                <td>
                                    <span className={`status-pill status-${exp.status.toLowerCase()}`}>
                                        {exp.status.charAt(0) + exp.status.slice(1).toLowerCase()}
                                    </span>
                                </td>
                                <td>
                                    {exp.createdBy
                                        ? `${exp.createdBy.firstName} ${exp.createdBy.lastName}`
                                        : "-"}
                                </td>
                                <td>
                                    {exp.approvedBy
                                        ? `${exp.approvedBy.firstName} ${exp.approvedBy.lastName}`
                                        : "-"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}