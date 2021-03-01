import React, { useEffect, useState } from 'react';
import Navbar from "./Navbar";
import axios from 'axios';
import { Link } from '@reach/router';
import Moment from 'react-moment';
import SwiperCore, { Pagination} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../node_modules/swiper/swiper.min.css';
import '../../node_modules/swiper/components/pagination/pagination.min.css';
import renderHTML from 'react-render-html';

class Home extends React.Component {

    constructor( props ) {
        super( props );

        this.state = {
            loading: false,
            posts: [],
            pages: [],
            error: '',
            visible: true
        }
    }
 
    componentDidMount() {
		const wordPressSiteURL = 'http://portfolio.test/';
        window.addEventListener('scroll', () => {
            let activeClass = 'normal';
            if(window.scrollY === 0){
                activeClass = 'top';
            }
            this.setState({ activeClass });
         });

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

        this.setState( { loading: true }, () => {
			axios.get( `${wordPressSiteURL}/wp-json/wp/v2/pages` )
                .then( res => {
                    if ( res.data.length ) {
                        this.setState( { loading: false, pages: res.data } );
                    } else {
                        this.setState( { loading: false, error: 'No Posts Found' } );
                    }
                } )
				.catch( err => this.setState( { loading: false, error: err.response.data.message } ) );
		} )
	}


    render() {
        const { posts } = this.state;
        const { pages } = this.state;

        SwiperCore.use(Pagination);

        return (
            <main className={`main ${this.state.activeClass}`}>
                <Navbar />
                <div className="hero">
                    <div className="container mx-auto h-100">
                        <div className="row h-100">
                            <div className="col-12 h-100">
                                <div className="centered-absolute">
                                    <div className="button-medium mb-4">WordPress Developer</div>
                                    <h1 className="text-uppercase">I provide high-quality solutions</h1>
                                    <p className="large-text-regular open-sans">Obsługuję duże i małe firmy, z polski i zza granicy.</p>
                                </div>
                                <Link to="#" className="hero__scroller open-sans"><span className="hero__scroller--elem"></span>SCROLL DOWN</Link>
                            </div>
                        </div>
                    </div>
                </div>

                { posts.length ? (
                    <div className="portfolio">
                        <div className="container mx-auto h-100">
                            <div className="row h-100">
                                <div className="col-12 h-100">   
                                    <Swiper
                                        spaceBetween={50}
                                        slidesPerView={1}
                                        pagination={{ clickable: true }}
                                        onSlideChange={() => console.log('slide change')}
                                        onSwiper={(swiper) => console.log(swiper)}
                                        >
                                        { posts.map ( (post, index) => (
                                            <SwiperSlide key={index} > 
                                                <div className="row">
                                                    <div className="col-lg-6 centered-absolute"> 
                                                        <h2 className="portfolio__header">My work</h2>
                                                        <p className="portfolio__index">0{index +1}</p>
                                                        <Link to={`/post/${post.id }`}>
                                                            <h3>{ post.title.rendered }</h3>
                                                            <span className="portfolio__type" >{ post.acf.rodzaj_oprogramowania }</span> - <span className="portfolio__client">{ post.acf.nazwa_organizacji }</span>
                                                        </Link>
                                                    </div>

                                                    <div className="col-lg-4 ml-auto portfolio__image centered-absolute" style={{backgroundImage: "url(" + post.featured_image_src + ")"}} >
                                                        <Link className="d-block" to={`/post/${post.id }`}>
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

                { pages.length ? (
                    <section class="information">
                        <div className="about">
                            <div className="container mx-auto">
                                <div className="row">
                                    <div className="col-6"> 
                                        { renderHTML(pages[0].acf.o_mnie_tekst) }
                                    </div> 

                                    <div className="col-lg-4 mx-auto about__image" style={{backgroundImage: "url(" + pages[0].acf.zdjecie.sizes.medium + ")"}} >
                                    </div>
                                </div>
                            </div>
                        </div>

                        <aside class="stack">
                            <div className="container mx-auto">
                                <div class="row justify-content-between">
                                    <div class="col-12 mb-5">
                                        { renderHTML(pages[0].acf.technologie_opis) }
                                    </div>

                                    { pages[0].acf.technologie_lista.map ( (field, index) => (
                                        <div key={index} className="portfolio__single-field text-center">
                                            <div className="logo-wrapper centered justify-content-center"> 
                                                <img className="portfolio__single-field--logo" src={ field.logotyp.sizes.thumbnail } />
                                            </div>  
                                            <p class="medium-text-bold">{ field.nazwa_technologii }</p>
                                        </div>
                                    ) ) } 
                                </div>

                                <div class="row mt-5 pt-5">
                                    <div class="col-12 mb-5">
                                        <h2>Find me</h2>
                                        <p class="medium-text-medium">Hey! Don't go yet, find me on one of those websites!</p>
                                    </div>

                                    <a href="#" className="large-text-bold mr-3">GitHub</a>
                                    <a href="#" className="large-text-bold  mr-3">LinkedIn</a>
                                    <a href="#" className="large-text-bold" >Facebook</a>
                                </div>
                            </div>
                        </aside>
                    </section>
                ) : '' }

            </main>
        )
    }
}

export default Home;