import React, { useState } from 'react';
import './AddCollege.css';
import { Player } from '@lottiefiles/react-lottie-player';
import collegeAnimation from '../assets/college.json';
import loadingAnimation from '../assets/loading.json';

const AddCollege = ({ addCollege }) => {
  const [name, setName] = useState('');
  const [seats, setSeats] = useState('');
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const total = parseInt(seats);
    if (name && total > 0) {
      setLoading(true);

      setTimeout(() => {
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
        setLoading(false);
      }, 3000);
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
          disabled={loading}
        />
        <input
          type="number"
          placeholder="Seat Capacity"
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
          required
          disabled={loading}
        />

        <button type="submit" disabled={loading}>
          {loading ? (
            <Player
              autoplay
              loop
              src={loadingAnimation}
              style={{ height: '32px', width: '32px' }}
            />
          ) : (
            'Add College'
          )}
        </button>
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