import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from "react-bootstrap/Badge"
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';

export default function Navbar() {

  //state to view cart
  const [cartView, setCartView] = useState(false)

  //use inorder to show actual item number on badge for mycart
  let data = useCart();

  const navigate = useNavigate();

  const handleLogout = ()=>{
    localStorage.removeItem("authToken");
    navigate("/Login")
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">MyFood</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 ">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>

              {/* to check authentication using authToken which is generated in CreateUser.js file
                  if authToken is valid show/access to My Orders */}

              {(localStorage.getItem("authToken")) ?
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My Orders</Link>
                </li>
                : ""}

            </ul>

            {/* if authToken is not valid or present then show login and signUp */}

            {(!localStorage.getItem("authToken")) ?
              <div className='d-flex'>
                <Link className="btn bg-white text-success mx-1" to="/Login">Login</Link>
                <Link className="btn bg-white text-success mx-1" to="/createuser">SignUp</Link>
              </div>
              :
              <div>
                <div className="btn bg-white text-success mx-2" onClick={()=>{setCartView(true)}}>
                  My Cart {" "}
                  <Badge pill bg="danger"> {data.length} </Badge>
                  </div>
                  {cartView ? <Modal onClose={()=>setCartView(false)}><Cart></Cart></Modal> : null}
                <div className="btn bg-white text-danger mx-2" onClick={handleLogout}>Log Out</div>
              </div>
            } 
          </div>
        </div>
      </nav>
    </div>
  )
}
