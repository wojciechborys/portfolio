import React from 'react';
import Navbar from "./Navbar";
import axios from 'axios';
import { Link } from '@reach/router';
import renderHTML from 'react-render-html';
import Moment from 'react-moment';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../node_modules/swiper/swiper.min.css';

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
		const wordPressSiteURL = 'http://portfolio.test/';

		this.setState( { loading: true }, () => {
			axios.get( `${wordPressSiteURL}/wp-json/wp/v2/portfolio` )
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

                               
                { posts.length ? (
                    <div className="portfolio">
                        <div className="container mx-auto">
                            <div className="row">
                                <div className="col-12">   
                                    <Swiper
                                        spaceBetween={50}
                                        slidesPerView={1}
                                        onSlideChange={() => console.log('slide change')}
                                        onSwiper={(swiper) => console.log(swiper)}
                                        >
                                        { posts.map ( (post, index) => (
                                            <SwiperSlide key={index} > 
                                                <p>{index +1}</p>
                                                <div class="row">
                                                    <div className="col-lg-6"> 
                                                        <Link to={`/post/${post.id }`}>
                                                            <h3>{ post.title.rendered }</h3>
                                                        </Link>
                                                    </div>
                                                    <div className="col-lg-4 ml-auto">
                                                        <Link className="d-block" to={`/post/${post.id }`}>
                                                            <img className="w-100" src={ post.featured_image_src } />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </SwiperSlide>

                                        ) ) }
                                    </Swiper>
                                </div> 
                            </div>
                        </div>
                    </div>
                ) : '' }
            </main>
        )
    }
}

export default Home;