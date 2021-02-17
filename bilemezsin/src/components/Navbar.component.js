import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
<nav className="navbar navbar-expand-md navbar-dark bg-danger">
    <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <Link class="nav-link" to="/">Bahisler</Link>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Kullanıcılar</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Kuponlarım</a>
            </li>
        </ul>
    </div>
    <div class="mx-auto order-0">
        <a class="navbar-brand mx-auto" href="#">Bilemezsin</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
            <span class="navbar-toggler-icon"></span>
        </button>
    </div>
    <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <a class="nav-link" href="#">(Kullanıcı adı)</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Çıkış</a>
            </li>
        </ul>
    </div>
</nav>
    );
  }
}