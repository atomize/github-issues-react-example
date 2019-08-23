import React from 'react';
import GithubIssues from '../components/GithubIssues.jsx'
function App() {
  return (
    <>
    <div className="App">   
      <GithubIssues  user="angular" repo="angular" />
    </div>
  </>
  );
}

export default App;
