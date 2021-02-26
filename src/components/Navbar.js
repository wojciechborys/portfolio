import React from 'react';
import { Link } from "@reach/router";

class Navbar extends React.Component {
    render() {
        return ( 
            <header>
                <div class="container mx-auto">
                    <div class="row">
                        <div class="col-12 header-wrapper centered">
                            <div class="logo">
                                <span class="logo__bolder">Wojciech</span> <span>Borys</span>
                            </div>
                            <nav class="navbar navbar-expand-lg navbar-light">
                                <div id="navbarNavDropdown" class="collapse navbar-collapse">
                                    <ul class="navbar-nav">
                                        <li class="nav-link"><Link className="nav-link" to="/">Home</Link></li>
                                        <li class="nav-link"><a href="#">Works</a></li>
                                        <li class="nav-link"><a href="#">Notes</a></li>
                                        <li class="nav-link"><a href="#">Let's Talk!</a></li>
                                    </ul>
                                </div>
                            </nav>

                            <div class="links">
                                <a href="#" class="links__github">GitHub</a>
                                <a href="#" class="links__email">Contact me</a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

export default Navbar;