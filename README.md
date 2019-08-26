# React + Github Issues API v3


  <p align="center">
    An example application that retrieves the issues from a particular Github repository and displays them. Includes pagination and some light filtering functionality. Clicking on an issue reveals the body with Gihub markdown parsed to display as HTML in the preview box. This particular repository is structured like a standalone React app, but it only consists of one main component, GithubIssues.jsx, that takes two props: 'user' & repo'. All of the other components are rendered as children to Changing the 'user' and 'repo' props of the GithubIssues component will initally render the issues for that user/repository accordingly. Clicking the left icon in the nav header opens a modal where you can enter a new user/repository to load dynamically.</p>
    

    
  <a href="https://atomize.github.io/github-issues-react-example/"><h2 align="center">View Demo</h2></a>


### Built With

* [React - A declarative, efficient, and flexible JavaScript library for building user interfaces.](https://github.com/facebook/react)

* [Showdown - a Javascript Markdown to HTML converter](https://github.com/showdownjs/showdown)

* [React Swipeable - React swipe event handler component & hook](https://github.com/dogfessional/react-swipeable)

* [Bulma - Modern CSS framework based on Flexbox](https://github.com/jgthms/bulma)

* [react-fontawesome - Font Awesome 5 React component using SVG with JS](https://github.com/FortAwesome/react-fontawesome)



### Example usage in code:
### index.html
```html
<!DOCTYPE html>
<html class="has-navbar-fixed-bottom has-navbar-fixed-top">
  <head>
    <meta charset="utf-8" />
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Github Issues Example"
    />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>Github Issues</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

```
### index.js
```js
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './app/App';
import * as serviceWorker from './utils/serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();

```
  ### App.js
   ```js
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
  ```





<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.


### Installation
 
1. Clone the github-issues-react-example

```sh
git clone https:://github.com/atomize/github-issues-react-example.git
```

2. Install dependencies

```sh
yarn install
```

<!-- USAGE EXAMPLES -->
## Development:
1. Start the development server
```sh
yarn start
```
Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

2. Run interactive tests
```sh
yarn test
```
Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.


## Production:
1. Build bundle for production
```sh
yarn build
```

---
<!-- LICENSE -->
## License

Distributed under the MIT License.

<!-- CONTACT -->
## Contact

Berti - jonathan.berti@gmail.com

Project Link: [https://github.com/atomize/github-issues-react-example/](https://github.com/atomize/github-issues-react-example/)






<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[product-screenshot]: images/screenshot.png