import React, { useState } from 'react';
import AddStudent from './AddStudent';
import AddCollege from './AddCollege';
import CollegeList from './CollegeList';
import StudentList from './StudentList';
import StudentReport from './StudentReport';
import Lottie from 'lottie-react';
import dashboardAnimation from '../assets/animation.json';
import './Dashboard.css';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  const addCollege = (college) => setColleges([...colleges, college]);
  const addStudent = (student) => setStudents([...students, student]);

  const applyToCollege = (studentId, collegeName) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId ? { ...s, appliedCollege: collegeName } : s
      )
    );
    setColleges((prev) =>
      prev.map((c) =>
        c.name === collegeName
          ? { ...c, remainingSeats: c.remainingSeats - 1 }
          : c
      )
    );
  };

  const totalStudents = students.length;
  const totalColleges = colleges.length;
  const applicationsSent = students.filter((s) => s.appliedCollege).length;
  const pendingApplications = totalStudents - applicationsSent;
  const recentStudents = students.slice(-3);
  const lowSeatColleges = colleges.filter((c) => c.remainingSeats < 5);

  const gradeData = ['A', 'B', 'C', 'D', 'F'].map((grade) => ({
    name: `Grade ${grade}`,
    value: students.filter((s) => s.grade === grade).length,
  }));

  const COLORS = ['#28a745', '#17a2b8', '#ffc107', '#fd7e14', '#dc3545'];

  return (
    <div className="dashboard">
      <div className={`overlay ${menuOpen ? 'show' : ''}`} onClick={() => setMenuOpen(false)}></div>

      <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>        
        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <h2>📚 Dashboard</h2>
        <ul>
          <li className={activeTab === 'home' ? 'active-tab' : ''} onClick={() => { setActiveTab('home'); setMenuOpen(false); }}>🏠 Home</li>
          <li className={activeTab === 'add-student' ? 'active-tab' : ''} onClick={() => { setActiveTab('add-student'); setMenuOpen(false); }}>👨‍🎓 Add Student</li>
          <li className={activeTab === 'add-college' ? 'active-tab' : ''} onClick={() => { setActiveTab('add-college'); setMenuOpen(false); }}>🏫 Add College</li>
          <li className={activeTab === 'colleges' ? 'active-tab' : ''} onClick={() => { setActiveTab('colleges'); setMenuOpen(false); }}>📋 View Colleges</li>
          <li className={activeTab === 'students' ? 'active-tab' : ''} onClick={() => { setActiveTab('students'); setMenuOpen(false); }}>👥 View Students</li>
        </ul>
      </aside>

      <main className="main-content">
        {activeTab === 'home' && (
          <div className="home-section fade-in">
            <h2>Welcome to the PU Student Dashboard</h2>
            <p>Track student performance, college eligibility, and applications all in one place.</p>

            <div className="dashboard-cards">
              <div className="card">🧑‍🎓 Total Students: <strong>{totalStudents}</strong></div>
              <div className="card">🏫 Total Colleges: <strong>{totalColleges}</strong></div>
              <div className="card">📤 Applications Sent: <strong>{applicationsSent}</strong></div>
              <div className="card">⏳ Applications Pending: <strong>{pendingApplications}</strong></div>
            </div>

            <div className="recent-section">
              <h3>📌 Recent Students</h3>
              <ul>
                {recentStudents.map((s) => (
                  <li key={s.id}>{s.name} - Grade {s.grade} - {s.appliedCollege || 'Not Applied'}</li>
                ))}
              </ul>
            </div>

            <div className="alert-section">
              <h3>⚠️ Colleges Running Out of Seats</h3>
              <ul>
                {lowSeatColleges.length > 0 ? (
                  lowSeatColleges.map((c) => (
                    <li key={c.id}>{c.name} ({c.remainingSeats} seats left)</li>
                  ))
                ) : (
                  <li>All colleges have sufficient seats.</li>
                )}
              </ul>
            </div>

            <div className="chart-section">
              <h3>📊 Grade Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={gradeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                    {gradeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'add-student' && <AddStudent addStudent={addStudent} colleges={colleges} />}
        {activeTab === 'add-college' && <AddCollege addCollege={addCollege} />}
        {activeTab === 'colleges' && <CollegeList colleges={colleges} />}
        {activeTab === 'students' && (
          <StudentList
            students={students}
            colleges={colleges}
            applyToCollege={applyToCollege}
            onViewReport={setSelectedStudent}
          />
        )}
        {selectedStudent && (
          <StudentReport student={selectedStudent} onClose={() => setSelectedStudent(null)} />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
