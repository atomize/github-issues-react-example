import React from 'react';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as appHelpers from '../utils/appHelpers';
import Comments from './Comments';
import FixedHeaderComponent from './FixedHeaderComponent';
import Labels from './Labels';
import Milestones from './Milestones';
import PaginationComponent from './PaginationComponent';
import StackedIcons from './StackedIcons';
import TimeAgoComponent from './TimeAgoComponent';

import 'bulma/css/bulma.css';
import '../css/GithubIssues.css';

function incrementPage(page) {
    return (previousState) => {
        return { ...previousState, page: page, currentPageNumber: +page.split('=').pop(), loading: true };
    };
}

function changeFilter(filterObj) {
    return (previousState) => {
        let stateTest = previousState.listFilter.state !== filterObj.state ? true : false
        return { ...previousState, listFilter: filterObj, loading: stateTest };
    };
}
function changeRepo(user,repo) {
    return (previousState) => {
       
        return { ...previousState, user: user,repo: repo, loading: true };
    };
}
const headers = {
    headers: {
        Authorization: "token 60e07ff280c786e523a632be9af8f992270a5c5b",
        Accept: "application/vnd.github.v3+json,application/vnd.github.machine-man-preview+json",
    }
};

const baseUrl = "https://api.github.com/repos"



class GithubIssues extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: 'angular',
            repo: 'angular',
            listFilter: { state: "open", choice: "issues" },
            since: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            per_page: 40,
            sort: "created",
            page: '',
            currentPageNumber: 1,
            pages: {},
            issues: [],
            loading: true,
            error: null,
            showBody: {},
        };
        // fix the this value
        this.getIssues = this.getIssues.bind(this);
        this.handleRepoChange = this.handleRepoChange.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);

    }

    componentDidMount() {
        /**
         * From Bulma Docs to activate responsive menu burger
         */
        const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
        if ($navbarBurgers.length > 0) {
            $navbarBurgers.forEach(el => {
                el.addEventListener('click', () => {
                    const target = el.dataset.target;
                    const $target = document.getElementById(target);
                    el.classList.toggle('is-active');
                    $target.classList.toggle('is-active');

                });
            });
        }
        // Get the avatar for the user/org and put it in the header
      
        // Get the issues and populate the panel
        this.getIssues();
    }


    shouldComponentUpdate(previousState, nextState) {
        if (previousState.page !== nextState.page) {
            return true;
        }
        if (previousState.listFilter !== nextState.listFilter) {
            return true;
        }
        return false;
    }

  
    /**
     * Fetch issues for repository
     */
    getIssues() {
        // 7 days ago from today in ISO - to be used for GH API parameter
        const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
        // GET parameters to send to GH Issues API 
        // `this.state.listFilter.state` - this is ~confusing because GH refers to 
        // 'open, closed' as 'state' of an issue/PR
        const params = appHelpers.encodeQueryString({ state: this.state.listFilter.state, since: since, per_page: 40, sort: "created" })
        // Need an empty string to store Link headers from GET response since we need to reference it within promise chain - used for pagination
        let linkHeaders = ''
        // Build the URL from props/state(for the page) - [note: when state.page changes, we update]
        let userRepoIssues = `${this.state.user}/${this.state.repo}/issues`
        let fullUrl = `${baseUrl}/${userRepoIssues}${params}${this.state.page}`

        fetch(fullUrl, headers)
            .then(response => {
                // If we have Link headers, parse them in to an object to store via appHelpers.parseLinkHeaders
                if (response.headers.get('Link')) {
                    linkHeaders = appHelpers.parseLinkHeader(response.headers.get('Link'))
                }
                if (response.ok) return response.json();
                throw new Error('Request failed.');
            })
            .then(data => {
                // set our state with the response
                this.setState({
                    pages: linkHeaders,
                    issues: data,
                    loading: false,
                    error: null,
                    showBody: {},
                });
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    error: error
                });
            });
    }

    // Render a loading bar during HTTP Request
    renderLoading() {
        return <progress className="progress is-large is-dark" max="100"></progress>;
    }

    // Render an error message
    renderError() {
        return (
            <div>
                Uh oh: {this.state.error.message}
            </div>
        );
    }

    /**
     * 
     * @param {String} page
     * expects a URL parameter like the end of pagination url - i.e '&page=2'
     */
    handlePageChange(page) {
        this.setState(incrementPage(page), () => {
            this.getIssues()
        })
    }

    // Handles interaction with header filter buttons
    handleFilterChange(toFilter) {
        let newObj = { ...this.state.listFilter, ...toFilter }
        this.setState(changeFilter(newObj), () => {
            Object.keys(toFilter)[0] === "state" && this.getIssues()
        })


    }
handleRepoChange(user, repo) {
        this.setState(changeRepo(user,repo), () => {
            this.getIssues()
        })
    }
    // Renders the panel blocks that contain the issue information
    renderIssues() {
        if (this.state.error) {
            return this.renderError();
        }

        const isVisible = (id) => {
            return this.state.showBody["_" + id] ? " container bodyContainer" : " is-hidden"
        }

        // Accordian behavior on panel blocks that render the issue markdown as html with showdown.js
        const handleClick = (e) => {
            e.preventDefault();
            let obj = {}
            const id = e.currentTarget.dataset.id;
            obj["_" + id] = this.state.showBody["_" + id] === true ? false : true
            this.setState({ showBody: obj })
            if (obj["_" + id]) {
               this.state.issues.map(function(issues) {
                    if (issues.id === +id) {
                        return document.querySelector(`._${id}`).innerHTML = appHelpers.converter.makeHtml(issues.body)
                    }
                    return true
                })
            }
          
        }
        /**
         * 
         * @param Boolean issueOrPr
         * expects true or false based on the presence of 'pull_request' property from issues repsonse object
         */
        const hideMe = (issueOrPr) => {
            let choiceType = issueOrPr ? "issues" : "pull requests"
            return (this.state.listFilter.choice !== (choiceType || "all") ? " " : " is-hidden")
        }
        return (
            < React.Fragment >
                {
                    this.state.issues.map(function (data, index) {

                        return <a href="#" key={index} className={"panel-block" + hideMe(data.pull_request)}>
                            <span data-id={data.id} className="panel-ovr" onClick={handleClick} >
                                <span className="columns is-mobile is-multiline is-vcentered is-2">
                                    <span className=" column is-1">
                                        <span className="panel-icon icon is-small">
                                            <StackedIcons type={!data.pull_request} state={data.state} />
                                        </span>
                                    </span>
                                    <span className="column is-11 info-container">
                                        <span className="_title">{data.title}</span>
                                        <br className="is-hidden-tablet" />
                                        <span className="time is-hidden-tablet">
                                            <TimeAgoComponent data={data} />
                                            <Milestones milestone={data.milestone} _addclass={["is-hidden-mobile"]} />
                                        </span>
                                        <br className="is-hidden-tablet" />
                                        <Labels labels={data.labels} />
                                        <br className="is-hidden-mobile" />
                                        <span className="time is-hidden-mobile">
                                            <TimeAgoComponent data={data} />
                                            <Milestones milestone={data.milestone} />
                                            <Comments data={data} />
                                        </span>
                                    </span>
                                    <span className="column show-body has-text-right is-pulled-right">
                                        <FontAwesomeIcon icon={faEye} />
                                    </span>
                                </span>
                            </span>
                            <span className={"_" + data.id + (isVisible(data.id))}></span>
                        </a>;
                    })
                }

            </ React.Fragment>
        );
    }
    render() {

        return (

            <div className="container">
                <nav className="panel">
                    <FixedHeaderComponent listFilter={this.state.listFilter} onFilterChange={this.handleFilterChange} onRepoChange={this.handleRepoChange} user={this.state.user} repo={this.state.repo} since={this.state.since} />
                    {this.state.loading ?
                        this.renderLoading()
                        : this.renderIssues()}
                    <nav className="navbar  is-fixed-bottom is-transparent">
                        <div className="navbar-start" style={{ flexGrow: 1, justifyContent: "center" }}>
                            <div className="navbar-item">
                                <PaginationComponent pages={this.state.pages} currentPageNumber={this.state.currentPageNumber} onPageChange={this.handlePageChange} />
                            </div>
                        </div>
                    </nav>
                </nav></div>);
    }
}

export default GithubIssues;
