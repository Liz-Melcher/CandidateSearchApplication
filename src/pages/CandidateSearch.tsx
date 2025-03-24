import { useEffect, useState } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { transformGithubUserToCandidate } from '../utils/transform';
import Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidateList, setCandidateList] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const [candidate, setCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    // Get a list of users when component loads
    async function fetchCandidates() {
      const users = await searchGithub(); // random GitHub users
      setCandidateList(users);
    }
    fetchCandidates();
  }, []);

  // useEffect(() => {
  //   async function fetchCandidate() {
  //     const rawUser = await searchGithubUser('octocat'); // You can make this dynamic later
  //     const formatted = transformGithubUserToCandidate(rawUser);
  //     setCandidate(formatted);
  //   }

  //   fetchCandidate();
  // }, []);

  useEffect(()=> {
    async function loadCandidate() {
      if (candidateList.length > 0 && currentIndex< candidateList.length) {
        const username = candidateList[currentIndex].login
        const rawUser = await searchGithubUser(username);
        const formatted = transformGithubUserToCandidate(rawUser);
        setCandidate(formatted);
      } else {
        setCandidate(null); // no more candidates 
      }
    }
    loadCandidate()
  }, [candidateList, currentIndex]);

  const handleSave = () => {
    if (candidate) {
      setSavedCandidates([...savedCandidates, candidate]);
    }
    setCurrentIndex(prev => prev + 1);
  };

  const handleSkip = () => {
    setCurrentIndex(prev => prev + 1);
  };

  return (
    <section>
      <h1>Candidate Search</h1>
      {candidate ? (
        <div>
          <img src={candidate.avatar} alt={`${candidate.username}'s avatar`} />
          <h2>{candidate.name}</h2>
          <p>Username: {candidate.username}</p>
          <p>Location: {candidate.location}</p>
          <p>Email: {candidate.email}</p>
          <p>Company: {candidate.company}</p>
          <a href={candidate.html_url} target="_blank">View GitHub Profile</a>
          <div style={{ marginTop: '1rem' }}>
            <button onClick={handleSave}>+</button>
            <button onClick={handleSkip}>-</button>
          </div>
        </div>
      ) : (
        <p>No more candidates!</p>
      )}
    </section>
  );
};

export default CandidateSearch;
