// WHEN the potential candidates page loads
// THEN the user should see a list of previously saved potential candidates with their name, username, location, avatar, email, html_url, and company
// WHEN the page reloads
// THEN the list of potential candidates should persist and be available for viewing
// WHEN there are no potential candidates
// THEN an appropriate message should be displayed indicating no candidates have been accepted
// WHEN I click the "-" button

import { useEffect, useState } from 'react';
import Candidate from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('candidateSearch');
    if (stored) {
      setSavedCandidates(JSON.parse(stored));
    }
  }, []);

  const handleRemove = (username: string) => {
    const updated = savedCandidates.filter(candidate => candidate.username !== username);
    setSavedCandidates(updated);
    localStorage.setItem('candidateSearch', JSON.stringify(updated));
  };

  return (
    <section>
      <h1>Potential Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No more candidates to review.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Username</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Profile</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map(candidate => (
              <tr key={candidate.username}>
                <td>
                  <img
                    src={candidate.avatar}
                    alt={`${candidate.username}'s avatar`}
                    style={{ width: '50px', borderRadius: '50%' }}
                  />
                </td>
                <td>{candidate.name}</td>
                <td>{candidate.username}</td>
                <td>{candidate.location}</td>
                <td>{candidate.email}</td>
                <td>{candidate.company}</td>
                <td>
                  <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </td>
                <td>
                  <button className="skip-btn" onClick={() => handleRemove(candidate.username)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default SavedCandidates;
