import { useEffect, useState } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { transformGithubUserToCandidate } from '../utils/transform';
import Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidateList, setCandidateList] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [candidate, setCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    // Get a list of users when component loads
    async function fetchCandidates() {
      const users = await searchGithub(); // random GitHub users
      setCandidateList(users);
    }
    fetchCandidates();
  }, []);

  async function loadCandidate() {
    if (candidateList.length > 0 && currentIndex< candidateList.length) {
      const username = candidateList[currentIndex].login
      const rawUser = await searchGithubUser(username);
      const formatted = transformGithubUserToCandidate(rawUser);
      console.log(rawUser)
      setCandidate(formatted);
    } else {
      setCandidate(null); // no more candidates 
    }
  }

  useEffect(()=> {
    loadCandidate()
  }, [candidateList, currentIndex]);

  const handleSave = () => {
    const canList = localStorage.getItem("candidateSearch");
    const savedList: Candidate[] = canList ? JSON.parse(canList) : [];
  
    if (candidate) {
      const updatedList = [...savedList, candidate];
      localStorage.setItem("candidateSearch", JSON.stringify(updatedList));
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
            <button className="button save-btn" onClick={handleSave}>+</button>
            <button className="button skip-btn" onClick={handleSkip}>-</button>
          </div>

        </div>
      ) : (
        <p>No more candidates!</p>
      )}
    </section>
  );
};

export default CandidateSearch;
