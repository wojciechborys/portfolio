import React from 'react';
import Navbar from "./Navbar";
import axios from 'axios';
import { Link } from '@reach/router';
import renderHTML from 'react-render-html';
import Moment from 'react-moment';

class Home extends React.Component {

    constructor( props ) {
        super( props );

        this.state = {
            loading: false,
            posts: [],
            error: ''
        }
    }

    componentDidMount() {
		const wordPressSiteURL = 'http://localhost/headless/';
		this.setState( { loading: true }, () => {
			axios.get( `${wordPressSiteURL}/wp-json/wp/v2/posts/` )
                .then( res => {
                    if ( res.data.length ) {
                        this.setState( { loading: false, posts: res.data } );
                    } else {
                        this.setState( { loading: false, error: 'No Posts Found' } );
                    }
                } )
				.catch( err => this.setState( { loading: false, error: err.response.data.message } ) );
		} )
	}


    render() {
        const { posts } = this.state;

        return (
            <main>
                <Navbar/>
                <div className="hero">
                    <div className="container mx-auto h-100">
                        <div className="row h-100">
                            <div className="col-12 h-100">
                                <div className="centered-absolute">
                                    <div className="button-medium mb-4">WordPress Developer</div>
                                    <h1 className="text-uppercase">I provide high-quality solutions</h1>
                                    <p className="large-text-regular open-sans">Obsługuję duże i małe firmy, z polski i zza granicy.</p>
                                </div>
                                <Link to="#" className="hero__scroller open-sans">SCROLL DOWN</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="portfolio">
                    <div className="container mx-auto">
                        <div className="row">
                            <div className="col-12">
                            </div>
                        </div>
                    </div>
                </div>

                { posts.length ? (
                    <div className="">
                        { posts.map ( post => (
                            <div key={ post.id } className="card border-dark-bold mb-3"> 
                                <header>
                                    <Link to={`/post/${post.id }`}>
                                        { post.title.rendered }
                                    </Link>
                                </header>
                                <div>
                                    <Moment format="DD/MM/YYYY">{ post.date }</Moment>
                                    {renderHTML( post.excerpt.rendered )}
                                </div>
                            </div>
                        ) ) }
                    </div>
                ) : '' }
            </main>
        )
    }
}

export default Home;