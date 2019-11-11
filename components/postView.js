import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class PostView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {}
        };
        this.createMarkup = (html) => ({ __html: html });
    }

    componentDidMount() {
        const slug = this.props.match.params.slug;
        axios
            .get(`https://moveyourbody.pl/wp-json/wp/v2/posts?slug=${slug}`)
            .then(posts => {
                this.setState({
                    post: posts.data[0]
                })
            })
    }

    render() {
        return (
            <>
                { (this.state.post.title) ? (
                    <div>
                        <h1>{this.state.post.title.rendered}</h1>
                        <div dangerouslySetInnerHTML={this.createMarkup(this.state.post.content.rendered)} />
                    </div>
                ) : <div/> }
            </>
        )
    }
}

export default PostView;