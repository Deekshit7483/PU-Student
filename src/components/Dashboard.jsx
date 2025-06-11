// Dashboard.js
import React, { useState } from 'react';
import AddStudent from './AddStudent';
import AddCollege from './AddCollege';
import CollegeList from './CollegeList';
import StudentList from './StudentList';
import StudentReport from './StudentReport';
import Lottie from 'lottie-react';
import dashboardAnimation from '../assets/animation.json';
import './Dashboard.css';

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

  return (
    <div className="dashboard">
      {/* Mobile overlay */}
      <div
        className={`overlay ${menuOpen ? 'show' : ''}`}
        onClick={() => setMenuOpen(false)}
      ></div>

      {/* Sidebar */}
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

      {/* Main content */}
      <main className="main-content">
        {activeTab === 'home' && (
          <div className="home-section fade-in">
            <div className="lottie-wrapper">
              <Lottie animationData={dashboardAnimation} loop={true} />
            </div>
            <h2>Welcome to the PU Student Dashboard</h2>
            <p>Track student performance, college eligibility, and applications all in one place.</p>
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
