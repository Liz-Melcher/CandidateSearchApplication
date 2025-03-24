// // TODO: Create an interface for the Candidate objects returned by the API
// WHEN the candidate search page loads
// THEN the information for one candidate should be displayed, including the candidate's name, username, location, avatar, email, html_url, and company

export default interface Candidate {
    name: string | null; // In case GitHub users don’t set this
    username: string; // maps from GitHub's `login`
    location: string | null;
    avatar: string; // maps from GitHub's `avatar_url`
    email: string | null; // can be null from the API
    html_url: string;
    company: string | null;
  }
  