import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {

    static defaultProps = {
        country: "in",
        ourPageSize: "8",
        category: "general"

    }

    static propTypes = {
        country: PropTypes.string,
        ourPageSize: PropTypes.number,
        category: PropTypes.string
    }

    captializeFirstLetter = (string) => {
        return (string.charAt(0).toUpperCase() + string.slice(1));
    }

    constructor(props) {
        super(props);
        console.log("Hello i am constructor from news component.")
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.captializeFirstLetter(this.props.category)} - NewsMonkey`;
    }

    async updateNews() {

        this.props.setProgress(10);
        
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.ourPageSize}`;
        
        this.setState({
            loading: true
        });
        
        let data = await fetch(url);

        this.props.setProgress(30);
        
        let parsedData = await data.json();
        // console.log(parsedData);
        this.props.setProgress(70);

        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })

        this.props.setProgress(100);

    }

    async componentDidMount() {
        this.updateNews();
    }

    // handlePreviousClick = async () => {
    //     this.setState({
    //         page: this.state.page - 1,
    //     });
    //     this.updateNews();

    // }

    // handleNextClick = async () => {
    //     this.setState({
    //         page: this.state.page + 1,
    //     });
    //     this.updateNews();

    // }

    fetchMoreData = async () => {

        this.setState({
            page: this.state.page + 1
        })

        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.ourPageSize}`;

        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
        })

    };


    render() {
        return (
            <>
                {/* console.log("Inside render"); */}

                <h1 className="my-5 text-center">NewsMonkey - Top {this.captializeFirstLetter(this.props.category)} Headlines.</h1>

                {this.state.loading ? <Spinner /> : ""}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={ this.state.loading ? <Spinner/> : "" } >

                    <div className="container">
                        <div className="row my-3">

                            {this.state.articles.map((element) => {

                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author ? element.author : "unknown"} date={element.publishedAt} source={element.source.name} />
                                </div>

                            })}

                        </div>
                    </div>

                </InfiniteScroll>
                {/* 
                <div className="container d-flex justify-content-between mt-5">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
                    <button disabled={(this.state.page + 1) > Math.ceil(this.state.totalResults / this.props.ourPageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}

            </>
        )
    }
}
