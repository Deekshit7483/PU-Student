import React from 'react';
import './CollegeList.css';

const CollegeList = ({ colleges }) => {
  const getSeatStatus = (remaining, total) => {
    const percent = (remaining / total) * 100;
    if (percent < 40) return { text: 'Almost Full', color: 'error', percent };
    else if (percent <= 80) return { text: 'Limited Seats', color: 'warning', percent };
    else return { text: 'Seats Available', color: 'success', percent };
  };

  return (
    <div className="college-list">
      <h2>🎓 College List</h2>
      {colleges.map((college) => {
        const status = getSeatStatus(college.remainingSeats, college.totalSeats);

        return (
          <div key={college.id} className="college-card">
            <h3>{college.name}</h3>
            <p><strong>Total Seats:</strong> {college.totalSeats}</p>
            <p><strong>Remaining Seats:</strong> {college.remainingSeats}</p>

            <div className="progress-bar">
              <div
                className={`progress-fill ${status.color}`}
                style={{ width: `${status.percent}%` }}
              ></div>
            </div>

            <span className={`status-badge ${status.color}`}>
              {status.text}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default CollegeList;
