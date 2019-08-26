import React from 'react';

import {Swipeable} from 'react-swipeable'

// small swipable wrapper around the pagination component for a little mobile sugar

class SwipeComponent extends React.Component {
    render() {
        return (
            <Swipeable
                onSwipedLeft={this.props.onSwipingLeft}
                onSwipedRight={this.props.onSwipingRight}
              >
              {this.props.children}
      </Swipeable>
        )
    }
}

// Pagination component to navigate API reponse in full
class PaginationComponent extends React.Component {
    constructor(props) {
        super(props);
        this.sendPageNumber = this.sendPageNumber.bind(this);
        this.swipingLeft = this.swipingLeft.bind(this);
        this.swipingRight = this.swipingRight.bind(this);
    }

    sendPageNumber(e) {
        this.props.onPageChange(`${e.currentTarget.dataset.url}`);
    }
   
    swipingLeft(e, absX) {
       
        const lastpage = this.props.pages.last ? this.props.pages.last.split("=").pop() : this.props.pages.prev ? +this.props.pages.prev.split("=").pop() + 1 : 1
        if(this.props.currentPageNumber<lastpage){
        this.props.onPageChange(`&page=${this.props.currentPageNumber + 1}`)};
    }
    swipingRight(e, absX) {
        if (this.props.currentPageNumber >1 ) {
            this.props.onPageChange(`&page=${this.props.currentPageNumber - 1}`)
        };
    }

    render() {
      
        const pages = this.props.pages;
        const currentPageNumber = this.props.currentPageNumber
        // determines the last page(total pages) from the parsed Link headers - if there is only one page, it returns 1
        const lastpage = pages.last ? pages.last.split("=").pop() : pages.prev ? +pages.prev.split("=").pop() + 1 : 1
        // make an array with the page number strings (i.e &page=1) to map
        const pageButtons = Array.apply(null, { length: lastpage })
            .map(Number.call, Number)
            .map(x => `&page=${x + 1}`)
       
        return (
            <SwipeComponent onSwipingLeft={this.swipingLeft} onSwipingRight={this.swipingRight}>
            <nav className="pagination is-medium is-centered" role="navigation" aria-label="pagination">
                <button
                    className={"pagination-previous " + (currentPageNumber > 1 ? "" : " is-invisible")}
                    data-url={`&page=${currentPageNumber - 1}`}
                    onClick={this.sendPageNumber}>
                    ◄◄
                </button>
                <button
                    className="pagination-link is-hidden-tablet">{`${currentPageNumber}/${lastpage}`}
                </button>
                <button 
                    className={"pagination-next " + (currentPageNumber < lastpage ? "" : " is-invisible")}
                    data-url={`&page=${currentPageNumber + 1}`}
                    onClick={this.sendPageNumber}>
                    ►►
                </button>
                <ul className="pagination-list">
                    {pageButtons.map((page, i) => {
                        const p = +page.split("=").pop()
                        return <li key={i} className="is-hidden-mobile">
                            <button 
                                data-url={page}
                                onClick={this.sendPageNumber}
                                className={"pagination-link " + (p === (currentPageNumber) ? " is-current" : p)}
                                aria-label={"Goto page " + p} >{p}
                            </button>
                        </li>
                    }
                    )}
                </ul>
                
                </nav>
                </SwipeComponent >
        );
    }
}
export default PaginationComponent;