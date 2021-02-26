import React from 'react';
import { Link } from "@reach/router";

class Navbar extends React.Component {
    render() {
        return ( 
            <header>
                <div className="container mx-auto">
                    <div className="row">
                        <div className="col-12 header-wrapper centered">
                            <div className="logo">
                                <span className="logo__bolder">Wojciech</span> <span>Borys</span>
                            </div>
                            <nav className="navbar navbar-expand-lg navbar-light">
                                <div id="navbarNavDropdown" className="collapse navbar-collapse">
                                    <ul className="navbar-nav">
                                        <li className="nav-link"><Link className="nav-item" to="/">Home</Link></li>
                                        <li className="nav-link"><a href="#">Works</a></li>
                                        <li className="nav-link"><a href="#">Notes</a></li>
                                        <li className="nav-link"><a href="#">Let's Talk!</a></li>
                                    </ul>
                                </div>
                            </nav>

                            <div className="links">
                                <a href="#" className="links__github">GitHub</a>
                                <a href="#" className="links__email">Contact me</a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

export default Navbar;