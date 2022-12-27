import React, { Component } from 'react'

export default class NewsItem extends Component {

    render() {

        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;

        return (
            <div>
                <div className="card">
                    
                    <div className="container" style = { { display: "flex", justifyContent: "flex-end", position: "absolute", right: "0", padding: "0"} }>
                        <span className="badge rounded-pill bg-danger" style={ {zIndex: '1', left: "90%" } }> {source} </span>
                    </div>

                    <img src={imageUrl ? imageUrl : "https://www.reuters.com/resizer/3cOZejx9E8tVQLXICOeE-O_LeKA=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/ZQ4KYJVHTRJDLPCOCQ3CVZYYTY.jpg"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text mt-2"><small className="text-muted">By {author} on {new Date(date).toGMTString()}.</small></p>
                        <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>

            </div>
        )
    }
}
