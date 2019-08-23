import React from 'react';
import GithubIssues from '../components/GithubIssues.jsx'
function App() {
  return (
    <>
    <div className="App">   
      <GithubIssues  user="facebook" repo="react" />
    </div>
  </>
  );
}

export default App;
