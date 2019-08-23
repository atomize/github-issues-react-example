import React from 'react';
const titleCase = (inStr) => {
    return inStr.replace(/\w\S*/g, function (tStr) {
        return tStr.charAt(0).toUpperCase() + tStr.substr(1).toLowerCase();
    });
}
const NavbarButtonGroup = ({ buttonArray, filterType, clickFunction, listFilter }) => {

    return (
        <div className="buttons has-addons" onClick={clickFunction}>
            {buttonArray.map((stateChoice, i) => {
                return (
                    <span key={i} data-choice={stateChoice}
                        data-list-filter={filterType}
                        className={"button " + (listFilter[filterType] === stateChoice ? "is-selected is-active is-info" : "")}>{titleCase(stateChoice)}
                    </span>
                )
            })}
        </div>
    )
}
class FixedHeaderComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: "https://github.githubassets.com/images/icons/emoji/octocat.png",

        };
        this.handleFilter = this.handleFilter.bind(this);
        this.getAvatar = this.getAvatar.bind(this);
    }

    componentDidMount() {
        this.getAvatar()

    }

    shouldComponentUpdate(previousProps, previousState) {
        if (previousProps.listFilter !== this.props.listFilter) {
            return true;
        }
        if (previousState.avatar !== this.state.avatar) {
            return true;
        }
        return false;
    }

    getAvatar() {
        const headers = {
            headers: {
                Authorization: "token 60e07ff280c786e523a632be9af8f992270a5c5b",
                Accept: "application/vnd.github.v3+json,application/vnd.github.machine-man-preview+json",
            }
        };
        const baseUrl = "https://api.github.com/repos"
        const avatarUrlBase = `${baseUrl}/${this.props.user}/${this.props.repo}`
        fetch(avatarUrlBase, headers)
            .then(response => {
                if (response.ok) return response.json();
                throw new Error('Request failed.');
            }).then(data => {
                this.setState({ avatar: data.owner.avatar_url })
            })
    }

    handleFilter(e) {
        e.preventDefault();
        const value = e.target.dataset.choice
        const type = e.target.dataset.listFilter
        let obj = {}
        obj[type] = value
        this.props.onFilterChange(obj);
    }

    render() {

        const date = new Date(this.props.since);
        const dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
            .toISOString()
            .split("T")[0];

        const { state, choice } = this.props.listFilter
        const titleString = `${titleCase(state)} ${choice === "all" ? "issues/PRs" : choice} since ${dateString}`
        return (

            <nav className="navbar is-fixed-top navbar-center panel-heading" role="navigation">
                <div className="navbar-brand navbar-center">
                    <a className="navbar-item" href="#">
                        <img src={this.state.avatar} width="28px" height="28px" />
                    </a>
                    <span className="navbar-item ">
                        <p className="is-unselectable is-mobile  title-string">{titleString}</p ></span>
                    <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>


                {
                    <div className="navbar-center">
                        <div id="navbarBasicExample" className="navbar-menu navbar-center">
                            <a className="navbar-item ">
                                <NavbarButtonGroup
                                    buttonArray={["issues", "pull requests", "all"]}
                                    filterType="choice"
                                    clickFunction={this.handleFilter}
                                    listFilter={this.props.listFilter}
                                />
                            </a>

                            <a className="navbar-item">
                                <NavbarButtonGroup
                                    buttonArray={["open", "closed", "all"]}
                                    filterType="state"
                                    clickFunction={this.handleFilter}
                                    listFilter={this.props.listFilter}
                                />
                            </a>
                        </div>
                    </div>
                }
            </nav>
        );
    }
}
export default FixedHeaderComponent;