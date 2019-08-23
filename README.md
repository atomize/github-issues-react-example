
Check out a running example [https://code.berti.dev/react-example](here) that shows the issues from [https://github.com/facebook/react](facebook/react)
An example application that retrieves the issues from the last 7 days of a particular Github repository and displays them. Includes pagination and some light filtering functionality. Clicking on an issues reveals the body of the issues with the Gihub markdown parsed to display as HTML in the preview box. This repo is structured like a standalone React app, but it only consists of one main component, <GithubIssues user="" repo="">. All of the other components are rendered as children to GithubIssues. Changing the 'user' and 'repo' props of the GithubIssues component will render the issues for that user/repository accordingly.
=======
An example application that retrieves the issues from a particular Github repository and displays them. Includes pagination and some light filtering functionality. Clicking on an issues reveals the body of the issues with the Gihub markdown parsed to display as HTML in the preview box. This repo is structured like a standalone React app, but it only consists of one main component, ```<GithubIssues user="" repo="">```. All of the other components are rendered as children to GithubIssues. Changing the 'user' and 'repo' props of the GithubIssues component will render the issues for that user/repository accordingly.


GithubIssues relies on 5 dependencies outside of React in order to achieve its presentation:

    Icons from Font Awesome via their official React package
    @fortawesome/fontawesome-svg-core
    @fortawesome/free-solid-svg-icons
    @fortawesome/react-fontawesome

    Bulma for CSS
    bulma

    Showdown for rendering Github flavored markdown
    showdown




## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
