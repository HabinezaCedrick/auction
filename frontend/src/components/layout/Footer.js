import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'


const Footer = () => {
    return (
        <Fragment>
            
            <footer id="footer">
            <div className="col-12 col-md-3">
                    <div className="navbar-brand">
                        <Link to="/">
                            <img src="/images/shopit_logo.png" alt="ShopIt Ltd"/> 
                        </Link> 
                    </div> 
                </div>
                
                
            <div className="footer-main">
                
                
                <div className="footer-links">
                    <ol> ShopIT Ltd is an online company that works in Rwanda <br></br> where you can order our products and <br></br>then we deliver for free at your home.</ol>
                   
                <ul>
                    <li>Accpted Payment Method:</li>
                    <ol><img src="/images/paylogo.jpg" alt='Payment Methods'/></ol>
                    </ul>
                
                    <ul>
                        <li>Contact Us:</li>
                        <ol>shopitltd@gmail.com</ol>
                        <ol>+250788997616</ol>
                        <ol>+250788872889</ol>
                    </ul>
                    <ul>
                        <li>Our Social Media:</li>
                        <ol><a href="https://facebook.com/" className="fa fa-facebook">  Facebook</a></ol>
                        <ol><a href="https://instagram.com/" class="fa fa-instagram">  Instagram</a></ol>
                        <ol><a href="https://twitter.com/HabinezaCedric/status/1246284234865680386" class="fa fa-twitter">  Twitter</a></ol>
                    </ul>
                    
                </div>
                
                <div className="footer-bar">
                    <p>&copy;ShopIT Ltd - 2020-2022, <a href="www.shopitltd.com">www.shopitltd.com</a> All Rights Reserved</p>
                </div>
            </div>
        </footer>
        
        </Fragment>
    )
}

export default Footer
