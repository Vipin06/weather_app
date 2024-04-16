import React from 'react';
import { Button } from 'react-bootstrap';
import {logout} from "../../redux/actions/auth.actions";
import {useDispatch } from "react-redux";

function Header() {
    const dispatch = useDispatch();
  return (
    <div className='header-main-wraper'>
        <div className='header-logo'>
            <h2>LOGO</h2>
        </div>
        <div className='headerbutton'>
            <Button variant="primary" onClick={()=>dispatch(logout())}>LOGOUT</Button>
        </div>
    </div>
  )
}

export default Header