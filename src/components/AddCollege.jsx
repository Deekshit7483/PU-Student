import React, { useState } from 'react';

const AddCollege = ({ addCollege }) => {
  const [name, setName] = useState('');
  const [seats, setSeats] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && seats > 0) {
      addCollege({
        id: Date.now(),
        name,
        totalSeats: parseInt(seats),
        remainingSeats: parseInt(seats),
      });
      setName('');
      setSeats('');
    }
  };

  return (
    <div>
      <h2>Add College</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="College Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Seat Capacity"
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
          required
        />
        <button type="submit">Add College</button>
      </form>
    </div>
  );
};

export default AddCollege;