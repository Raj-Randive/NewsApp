import React from 'react'

import { useEffect } from 'react';
import { useState } from 'react';

import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    
    const captializeFirstLetter = (string) => {
        return (string.charAt(0).toUpperCase() + string.slice(1));
    }
    
    
    const updateNews = async () => {
        
        props.setProgress(10);

        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.ourPageSize}`;
        
        setLoading(true); // As data is being fetched...

        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);

        // Setting All States which are defined...
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false); // Now data is fetched completely so loading = false
        
        props.setProgress(100);

    }

    // UseEffect will replace the work which the componentDidMount is doing! 
    useEffect(() => {
        document.title = `${captializeFirstLetter(props.category)} - NewsMonkey`;
        updateNews();
        // eslint-disable-next-line
    }, [])
    
    
    // const handlePreviousClick = async () => {
    //     setPage(page-1);
    //     updateNews();

    // }
    
    // const handleNextClick = async () => {
        //     setPage(page+1);
    //     updateNews();
    
    // }
    
    const fetchMoreData = async () => {
        
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.ourPageSize}`;

        setPage(page+1);
        
        let data = await fetch(url);
        let parsedData = await data.json();

        // Setting States!!
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);

    };

    return (
        <>
            {/* console.log("Inside render"); */}

            <h1 className="my-5 text-center" style={ {marginTop: "90px"} }>NewsMonkey - Top {captializeFirstLetter(props.category)} Headlines.</h1>

            {loading ? <Spinner /> : ""}
            
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={loading ? <Spinner /> : ""} >

                <div className="container">
                    <div className="row my-3">

                        {articles.map((element) => {

                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author ? element.author : "unknown"} date={element.publishedAt} source={element.source.name} />
                            </div>

                        })}

                    </div>
                </div>

            </InfiniteScroll>
            {/* 
                <div className="container d-flex justify-content-between mt-5">
                    <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePreviousClick}>&larr; Previous</button>
                    <button disabled={(page + 1) > Math.ceil(totalResults / props.ourPageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
                </div> */}

        </>
    )
}

News.defaultProps = {
    country: "in",
    ourPageSize: "8",
    category: "general"

}

News.propTypes = {
    country: PropTypes.string,
    ourPageSize: PropTypes.number,
    category: PropTypes.string
}

export default News
