import React from 'react';

const CollegeList = ({ colleges }) => {
  const getSeatStatus = (remaining, total) => {
    const percent = (remaining / total) * 100;
    if (percent < 40) return { text: 'Almost Full', color: 'red' };
    else if (percent <= 80) return { text: 'Limited Seats', color: 'orange' };
    else return { text: 'Seats Available', color: 'green' };
  };

  return (
    <div>
      <h2>Colleges</h2>
      {colleges.map((college) => {
        const status = getSeatStatus(college.remainingSeats, college.totalSeats);
        return (
          <div key={college.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <h3>{college.name}</h3>
            <p>Total Seats: {college.totalSeats}</p>
            <p>Remaining Seats: {college.remainingSeats}</p>
            <p style={{ color: status.color }}>{status.text}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CollegeList;