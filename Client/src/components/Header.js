import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

class Header extends Component {
    render() {
        return (
            <div className="sticky-top">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li class="nav-item active">
                            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item active">
                            <a class="nav-link" href="#">About us <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item active">
                            <a class="nav-link" href="#">Team <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item active">
                            <a class="nav-link" href="#">Login <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item active">
                            <a class="nav-link" href="#">Sign up <span class="sr-only">(current)</span></a>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default Header;