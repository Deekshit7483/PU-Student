import React from 'react';

const StudentReport = ({ student, onClose }) => {
  if (!student) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Student Report</h3>
        <p><strong>ID:</strong> {student.id}</p>
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Physics:</strong> {student.marks.physics}</p>
        <p><strong>Chemistry:</strong> {student.marks.chemistry}</p>
        <p><strong>Math:</strong> {student.marks.math}</p>
        <p><strong>Average:</strong> {student.average}%</p>
        <p><strong>Grade:</strong> {student.grade}</p>
        <p><strong>Applied College:</strong> {student.appliedCollege || 'Not Applied'}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default StudentReport;