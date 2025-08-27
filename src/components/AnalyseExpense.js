
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { useNavigate } from "react-router-dom";
import "./AnalyseExpense.css";

function AnalyseExpense() {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://expense-backend-psi.vercel.app/get_expenses").then((res) => {
      setExpenses(res.data);
    });
  }, []);

  return (
    <div className="analyse-container">
      <h2 className="analyse-title">Expense Analysis</h2>
      <div className="analyse-chart">
        <BarChart width={500} height={300} data={expenses}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#82ca9d" />
        </BarChart>
      </div>
      <button className="add-expense-btn" style={{marginTop: 24, background: '#eee', color: '#222'}} onClick={() => navigate("/")}>Back</button>
    </div>
  );
}

export default AnalyseExpense;
