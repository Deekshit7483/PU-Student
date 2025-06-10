import React, { useState } from 'react';

const AddStudent = ({ addStudent, colleges }) => {
  const [name, setName] = useState('');
  const [marks, setMarks] = useState({ physics: '', chemistry: '', math: '' });

  const handleChange = (e) => {
    setMarks({ ...marks, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = Object.values(marks).map(Number);
    if (values.every(mark => mark >= 0 && mark <= 100)) {
      const total = values.reduce((a, b) => a + b, 0);
      const avg = total / values.length;
      let grade = '';
      if (avg >= 90) grade = 'A';
      else if (avg >= 80) grade = 'B';
      else if (avg >= 70) grade = 'C';
      else if (avg >= 50) grade = 'D';
      else grade = 'F';

      const suggested = getSuggestedColleges(avg);
      addStudent({
        id: Date.now(),
        name,
        marks,
        average: avg.toFixed(2),
        grade,
        suggested,
        appliedCollege: null,
      });

      setName('');
      setMarks({ physics: '', chemistry: '', math: '' });
    } else {
      alert("Marks should be between 0 and 100.");
    }
  };

  const getSuggestedColleges = (avg) => {
    if (avg >= 90) return ['IISc', 'Christ University', 'St. Joseph’s'];
    if (avg >= 80) return ['Jain University', 'Mount Carmel', 'PES'];
    if (avg >= 70) return ['Kristu Jayanti', 'Reva University'];
    if (avg >= 50) return ['New Horizon', 'Surana College'];
    return [];
  };

  return (
    <div className="form-section">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          name="physics"
          placeholder="Physics Marks"
          value={marks.physics}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="chemistry"
          placeholder="Chemistry Marks"
          value={marks.chemistry}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="math"
          placeholder="Math Marks"
          value={marks.math}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;