import React, { useState } from 'react';
import AddStudent from './AddStudent';
import AddCollege from './AddCollege';
import CollegeList from './CollegeList';
import StudentList from './StudentList';
import StudentReport from './StudentReport';
import './Dashboard.css';

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [activeTab, setActiveTab] = useState('home');

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
      <aside className="sidebar">
        <h2>📚 Dashboard</h2>
        <ul>
          <li onClick={() => setActiveTab('home')}>🏠 Home</li>
          <li onClick={() => setActiveTab('add-student')}>👨‍🎓 Add Student</li>
          <li onClick={() => setActiveTab('add-college')}>🏫 Add College</li>
          <li onClick={() => setActiveTab('colleges')}>📋 View Colleges</li>
          <li onClick={() => setActiveTab('students')}>👥 View Students</li>
        </ul>
      </aside>

      <main className="main-content">
        {activeTab === 'home' && <h2>Welcome to the PU Student Dashboard</h2>}
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
        <StudentReport student={selectedStudent} onClose={() => setSelectedStudent(null)} />
      </main>
    </div>
  );
};

export default Dashboard;