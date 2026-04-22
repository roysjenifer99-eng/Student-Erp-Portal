import { useState } from "react";
import jsPDF from "jspdf";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");
  const [rollNo, setRollNo] = useState("");
  const [dob, setDob] = useState("");
  const [student, setStudent] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");

  // 🔐 LOGIN
  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rollNo: rollNo,
          dob: dob,
        }),
      });

      if (!res.ok) {
        alert("Invalid Roll Number or DOB");
        return;
      }

      const data = await res.json();
      setStudent(data);
      setPage("dashboard");
      setActiveTab("dashboard");

    } catch (err) {
      alert("Server error");
    }
  };

  // 🚪 LOGOUT
  const handleLogout = () => {
    setStudent(null);
    setPage("login");
    setRollNo("");
    setDob("");
  };

  // 💳 PAYMENT → PDF
  const handlePayment = () => {
    const doc = new jsPDF();

    doc.text("🎓 College Fee Receipt", 20, 20);
    doc.text(`Name: ${student.name}`, 20, 40);
    doc.text(`Roll No: ${student.rollNo}`, 20, 50);
    doc.text(`Department: ${student.dept}`, 20, 60);

    doc.text("------ Fee Details ------", 20, 80);
    doc.text("Total Fees: ₹50,000", 20, 90);
    doc.text("Paid: ₹50,000", 20, 100);
    doc.text("Status: PAID ✅", 20, 110);

    doc.text("Thank you!", 20, 130);

    doc.save("Fee_Receipt.pdf");
  };

  return (
    <div>
      {/* LOGIN */}
      {page === "login" && (
        <div className="login-container">
          <h1>🎓 Student ERP Portal</h1>

          <input
            type="text"
            placeholder="Roll Number"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
          />

          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />

          <button onClick={handleLogin}>Login</button>
        </div>
      )}

      {/* DASHBOARD */}
      {page === "dashboard" && student && (
        <div className="layout">

          {/* SIDEBAR */}
          <div className="sidebar">
            <h2>🎓 EduPay</h2>

            <p onClick={() => setActiveTab("dashboard")}>🏠 Dashboard</p>
            <p onClick={() => setActiveTab("fees")}>💰 Fees</p>
            <p onClick={() => setActiveTab("profile")}>👤 Profile</p>

            <button onClick={handleLogout}>Logout</button>
          </div>

          {/* MAIN */}
          <div className="main">

            {/* DASHBOARD */}
            {activeTab === "dashboard" && (
              <div className="card">
                <h2>Welcome, {student.name}</h2>

                <img
                  src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                  alt="user"
                />

                <p><b>Roll No:</b> {student.rollNo}</p>
                <p><b>Department:</b> {student.dept}</p>
                <p><b>Year:</b> {student.year}</p>
                <p><b>Semester:</b> {student.semester}</p>
              </div>
            )}

            {/* FEES */}
            {activeTab === "fees" && (
              <div className="card">
                <h2>Fees Details</h2>

                <p>Total Fees: ₹50,000</p>
                <p>Paid: ₹50,000</p>
                <p>Status: Paid</p>

                <button className="pay-btn" onClick={handlePayment}>
                  Pay Now
                </button>
              </div>
            )}

            {/* PROFILE */}
            {activeTab === "profile" && (
              <div className="card">
                <h2>Profile</h2>

                <p>Name: {student.name}</p>
                <p>Roll No: {student.rollNo}</p>
                <p>DOB: {student.dob}</p>
                <p>Department: {student.dept}</p>
                <p>Year: {student.year}</p>
                <p>Semester: {student.semester}</p>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

export default App;