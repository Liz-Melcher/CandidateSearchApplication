
//import the Candidate interface 
import Candidate from "../interfaces/Candidate.interface";

//convert a raw GitHub user object from the API into a Candidate object that matches the project structure 

export function transformGithubUserToCandidate(user: any): Candidate {
  return {
    name: user.name ?? null, //can be null if not set 
    username: user.login, //all users have a login
    location: user.location ?? null, //can be null if not set 
    avatar: user.avatar_url, //comes from the avatar_url in the API 
    email: user.email ?? null, //public email address; this may be null or hidden 
    html_url: user.html_url, //there should be a user HTML 
    company: user.company ?? null, //can be null if not set 
  };
}
