import React from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import { useContext } from 'react';
import logo from '../../images/logo.png';
import './Header.css';



const Header = () => {
    const [loggedInUser, setLoggedInUser] =useContext(UserContext);


    return (
        <div className='header'>
            <img src={logo} alt="logo" />
            <nav>
                
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/manage">Manage Inventory</Link>
                <button onClick={() => setLoggedInUser({})} className='btn-signout'>{loggedInUser.email ? 'Sign out' : 'Login'}</button>
            </nav>
        </div>
    );
};

export default Header;

