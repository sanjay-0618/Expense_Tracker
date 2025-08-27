
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddExpense.css";

function AddExpense() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [extraCategory, setExtraCategory] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    let finalCategory = category === "Extra" ? extraCategory : category;
    if (!amount || !category || (category === "Extra" && !extraCategory)) {
      setMessage("Please enter all values");
      return;
    }
  await axios.post("https://expense-backend-psi.vercel.app/add_expense", {
      amount,
      category: finalCategory,
      date: new Date().toISOString()
    });
    setMessage("Added successfully");
    setAmount("");
    setCategory("");
    setExtraCategory("");
  };

  return (
    <div className="add-expense-container">
      <h2 className="add-expense-title">Add Expense</h2>
      {message && (
        <div style={{ marginBottom: 12, color: message === "Added successfully" ? 'green' : 'red', fontWeight: 500 }}>
          {message}
        </div>
      )}
      <input
        className="add-expense-input"
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select
        className="add-expense-input"
        value={category}
        onChange={e => setCategory(e.target.value)}
      >
        <option value="">Select Category</option>
        <option value="food">Food</option>
        <option value="travel">Travel</option>
        <option value="snacks">Snacks</option>
        <option value="essentials">Essentials</option>
        <option value="Extra">Extra</option>
      </select>
      {category === "Extra" && (
        <input
          className="add-expense-input"
          type="text"
          placeholder="Enter extra category"
          value={extraCategory}
          onChange={e => setExtraCategory(e.target.value)}
        />
      )}
      <button className="add-expense-btn" onClick={handleSubmit}>Add</button>
      <button className="add-expense-btn" style={{marginTop: 16, background: '#eee', color: '#222'}} onClick={() => navigate("/")}>Back</button>
    </div>
  );
}

export default AddExpense;
