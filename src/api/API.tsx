const searchGithub = async () => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;
    console.log(import.meta.env);
    //This line would log the environment variables available in the Vite project. 
    // In particular, used to check whether the VITE_GITHUB_TOKEN is being read correctly.  
    // Comment this out after verifying that the token is working to avoid accidentally logging sensitive info (like a GitHub token) in the browser console.
    const response = await fetch(
      `https://api.github.com/users?since=${start}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      }
    );
    console.log('Response:', response);
    //This logs the raw response from the fetch call. For debugging to check for error types like  200, 404, 403, etc.
    const data = await response.json();
    if (!response.ok) {
      throw new Error('invalid API response, check the network tab');
    }
    console.log('Data:', data);
    //This logs the parsed JSON response (what GitHub actually sent back). 
    // Use while testing or building out features
    // Commented out or removed later to keep the console clean.
    return data;
  } catch (err) {
    console.log('an error occurred', err);
    //Logs any caught error. 
    // Use during development after handling other errors (like returning an empty array/object)
    // Comment out or remove before deployment.
    return [];
  }
};

const searchGithubUser = async (username: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error('invalid API response, check the network tab');
    }
    return data;
  } catch (err) {
    console.log('an error occurred', err);
    //Logs any caught error. 
    // Use during development after handling other errors (like returning an empty array/object)
    // Comment out or remove before deployment.
    return {};
  }
};

export { searchGithub, searchGithubUser };
