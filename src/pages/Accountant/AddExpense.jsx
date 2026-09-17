import { useState } from "react"
import "./AddExpense.css"

export function AddExpense() {

    const token = localStorage.getItem("token")

    const [expense, setExpense] = useState({
        category: "",
        title: "",
        description: "",
        amount: "",
        paymentMethod: "",
        expenseDate: "",
        receiptNumber: "",
        vendorName: "",
        remark: ""
    })

    const handlerFunction = (e) => {
        setExpense(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const addExpense = (e) => {
        e.preventDefault()

        fetch("http://localhost:5000/api/expenses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify(expense)
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className="expense-page">
            <div className="expense-card">

                <div className="expense-header">
                    <h1>Add Expense</h1>
                    <p>Record a new business expense</p>
                </div>

                <form className="expense-form" onSubmit={addExpense}>

                    <div className="form-row">
                        <div className="form-field">
                            <label htmlFor="category">Category</label>
                            <select
                                id="category"
                                name="category"
                                value={expense.category}
                                onChange={handlerFunction}
                                required
                            >
                                <option value="">Select category</option>
                                <option value="OFFICE_RENT">Office Rent</option>
                                <option value="ELECTRICITY">Electricity</option>
                                <option value="INTERNET">Internet</option>
                                <option value="TRAVEL">Travel</option>
                                <option value="OFFICE_SUPPLIES">Office Supplies</option>
                                <option value="MAINTENANCE">Maintenance</option>
                                <option value="PURCHASE">Purchase</option>
                                <option value="SALARY">Salary</option>
                                <option value="MARKETING">Marketing</option>
                                <option value="OTHER">Other</option>
                            </select>
                        </div>

                        <div className="form-field">
                            <label htmlFor="paymentMethod">Payment Method</label>
                            <select
                                id="paymentMethod"
                                name="paymentMethod"
                                value={expense.paymentMethod}
                                onChange={handlerFunction}
                                required
                            >
                                <option value="">Select method</option>
                                <option value="CASH">Cash</option>
                                <option value="BANK">Bank</option>
                                <option value="UPI">UPI</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-field">
                        <label htmlFor="title">Title</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            placeholder="e.g. September Electricity Bill"
                            value={expense.title}
                            onChange={handlerFunction}
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Optional details about this expense"
                            value={expense.description}
                            onChange={handlerFunction}
                            rows={3}
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-field">
                            <label htmlFor="amount">Amount</label>
                            <input
                                id="amount"
                                name="amount"
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="0.00"
                                value={expense.amount}
                                onChange={handlerFunction}
                                required
                            />
                        </div>

                        <div className="form-field">
                            <label htmlFor="expenseDate">Expense Date</label>
                            <input
                                id="expenseDate"
                                name="expenseDate"
                                type="date"
                                value={expense.expenseDate}
                                onChange={handlerFunction}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-field">
                            <label htmlFor="vendorName">Vendor Name</label>
                            <input
                                id="vendorName"
                                name="vendorName"
                                type="text"
                                placeholder="Optional"
                                value={expense.vendorName}
                                onChange={handlerFunction}
                            />
                        </div>

                        <div className="form-field">
                            <label htmlFor="receiptNumber">Receipt Number</label>
                            <input
                                id="receiptNumber"
                                name="receiptNumber"
                                type="text"
                                placeholder="Optional"
                                value={expense.receiptNumber}
                                onChange={handlerFunction}
                            />
                        </div>
                    </div>

                    <div className="form-field">
                        <label htmlFor="remark">Remark</label>
                        <input
                            id="remark"
                            name="remark"
                            type="text"
                            placeholder="Optional note"
                            value={expense.remark}
                            onChange={handlerFunction}
                        />
                    </div>

                    <button type="submit" className="submit-btn">
                        Add Expense
                    </button>

                </form>
            </div>
        </div>
    )
}
