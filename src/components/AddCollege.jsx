import React, { useState } from 'react';
import './AddCollege.css';
import { Player } from '@lottiefiles/react-lottie-player';
import collegeAnimation from '../assets/animation.json'; // Download from LottieFiles and place in src

const AddCollege = ({ addCollege }) => {
  const [name, setName] = useState('');
  const [seats, setSeats] = useState('');
  const [preview, setPreview] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const total = parseInt(seats);
    if (name && total > 0) {
      const collegeData = {
        id: Date.now(),
        name,
        totalSeats: total,
        remainingSeats: total,
      };
      addCollege(collegeData);
      setPreview(collegeData);
      setName('');
      setSeats('');
    }
  };

  return (
    <div className="form-section">
      <div className="lottie-wrapper">
        <Player
          autoplay
          loop
          src={collegeAnimation}
          style={{ height: '120px', width: '120px' }}
        />
      </div>

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

      {preview && (
        <div className="preview-card">
          <h3>🏫 {preview.name} Added</h3>
          <p><strong>Total Seats:</strong> {preview.totalSeats}</p>
          <p><strong>Remaining Seats:</strong> {preview.remainingSeats}</p>
        </div>
      )}
    </div>
  );
};

export default AddCollege;
