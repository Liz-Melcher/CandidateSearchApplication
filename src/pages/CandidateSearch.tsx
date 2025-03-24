import { useEffect, useState } from 'react';
import { searchGithubUser } from '../api/API';
import { transformGithubUserToCandidate } from '../utils/transform';
import Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    async function fetchCandidate() {
      const rawUser = await searchGithubUser('octocat'); // You can make this dynamic later
      const formatted = transformGithubUserToCandidate(rawUser);
      setCandidate(formatted);
    }

    fetchCandidate();
  }, []);

  return (
    <section>
      <h1>Candidate Search</h1>
      {candidate && (
        <div>
          <img src={candidate.avatar} alt={`${candidate.username}'s avatar`} />
          <h2>{candidate.name}</h2>
          <p>Username: {candidate.username}</p>
          <p>Location: {candidate.location}</p>
          <p>Email: {candidate.email}</p>
          <p>Company: {candidate.company}</p>
          <a href={candidate.html_url} target="_blank">View GitHub Profile</a>
        </div>
      )}
    </section>
  );
};

export default CandidateSearch;
