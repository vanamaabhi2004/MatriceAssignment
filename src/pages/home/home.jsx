import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaStar } from 'react-icons/fa'; 

const Home = () => {
  const [candidates, setCandidates] = useState([]);

  const addCandidates = (count) => {
    const newCandidates = Array.from({ length: count }, () => ({
      name: '',
      status: '',
      feedback: '',
      rating: []
    }));
    setCandidates([...candidates, ...newCandidates]);
  };

  const deleteCandidate = (index) => {
    const updatedCandidates = [...candidates];
    updatedCandidates.splice(index, 1);
    setCandidates(updatedCandidates);
  };

  const handleInputChange = (e, index, field) => {
    const updatedCandidates = [...candidates];
    updatedCandidates[index][field] = e.target.value;
    setCandidates(updatedCandidates);
  };

  const handleStarClick = (index, starIndex) => {
    const updatedCandidates = [...candidates];
    updatedCandidates[index].rating = [...Array(starIndex + 1).keys()]; // Select stars up to the clicked index
    setCandidates(updatedCandidates);
  };
  

  return (
    <div className="container">
      <h2>Candidate Tracking</h2>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Name</th>
            <th>Interview Status</th>
            <th>Interview Feedback</th>
            <th>Rating</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate, index) => (
            <tr key={index}>
              <td style={{ width: '20%' }}><input type="text" className="form-control" value={candidate.name} onChange={(e) => handleInputChange(e, index, 'name')} /></td>
              <td style={{ width: '20%' }}>
                <select className="form-control" value={candidate.status} onChange={(e) => handleInputChange(e, index, 'status')}>
                  <option value="">Select Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                </select>
              </td>
              <td style={{ width: '20%' }}>
                <input type="text" className="form-control" style={{ width: '100%' }} value={candidate.feedback} onChange={(e) => handleInputChange(e, index, 'feedback')} />
              </td>
              <td style={{ width: '15%' }}>
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <FaStar
                    key={starIndex}
                    className="icon"
                    onClick={() => handleStarClick(index, starIndex)}
                    color={candidate.rating.includes(starIndex) ? 'yellow' : 'gray'}
                  />
                ))}
              </td>
              <td style={{ width: '15%' }}><button className="btn btn-danger" onClick={() => deleteCandidate(index)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={() => addCandidates(1)}>Add Candidates</button>
    </div>
  );
}

export default Home;
