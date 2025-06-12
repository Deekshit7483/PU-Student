import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import './StudentList.css';
import noDataAnimation from '../assets/no-data.json';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentList = ({ students, colleges, applyToCollege, onViewReport }) => {
  const [gradeFilter, setGradeFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, [students]);

  const filtered = students.filter((s) => {
    const matchesGrade = gradeFilter ? s.grade === gradeFilter : true;
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id.toString().includes(searchTerm);
    return matchesGrade && matchesSearch;
  });

  return (
    <div className="student-list">
      <h2>👩‍🎓 Student List</h2>

      <div className="filters">
        <select value={gradeFilter} onChange={(e) => setGradeFilter(e.target.value)}>
          <option value="">All Grades</option>
          <option value="A">Grade A</option>
          <option value="B">Grade B</option>
          <option value="C">Grade C</option>
          <option value="D">Grade D</option>
          <option value="F">Grade F</option>
        </select>

        <input
          type="text"
          placeholder="Search by name or ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="shimmer-table">
          {[...Array(5)].map((_, i) => (
            <div className="shimmer-row" key={i}></div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="no-data">
          <Lottie animationData={noDataAnimation} loop={true} style={{ height: 250 }} />
          <p>No students found. Try adding or changing filters.</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Marks</th><th>Average</th><th>Grade</th><th>Suggested Colleges</th><th>Applied</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((student) => {
              const suggestedColleges = colleges.filter(
                (c) => student.suggested.includes(c.name) && c.remainingSeats > 0
              );

              return (
                <tr key={student.id}>
                  <td className="clickable-id" onClick={() => onViewReport(student)}>{student.id}</td>
                  <td>{student.name}</td>
                  <td>
                    P: {student.marks.physics}, C: {student.marks.chemistry}, M: {student.marks.math}
                  </td>
                  <td>{student.average}%</td>
                  <td><span className={`grade-badge ${student.grade}`}>{student.grade}</span></td>
                  <td>{student.suggested.join(', ') || 'Improve your performance'}</td>
                  <td>{student.appliedCollege || 'Not Applied'}</td>
                  <td>
                    {student.appliedCollege === null && suggestedColleges.length > 0 && (
                   <select
                   defaultValue=""
                   onChange={(e) => {
                     const selectedCollege = e.target.value;
                     if (selectedCollege) {
                       const confirmApply = window.confirm(`Are you sure you want to apply to ${selectedCollege}?`);
                       if (confirmApply) {
                         applyToCollege(student.id, selectedCollege);
                         toast.success('✅ Application submitted!');
                       }
                       e.target.value = "";
                     }
                   }}
                 >
                   <option value="">Apply to...</option>
                   {suggestedColleges.map((college) => (
                     <option key={college.id} value={college.name}>
                       {college.name}
                     </option>
                   ))}
                 </select>                 
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default StudentList;
