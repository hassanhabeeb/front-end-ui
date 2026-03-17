import React, { useEffect, useState } from 'react'
import pic from '../../assets/images/user.jpg';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';

const Header = () => {    
    const navigate = useNavigate();
    const [username, setUsername] = useState("Admin");

    const handleSignOut = () => {
        localStorage.clear();
        navigate("/login");        
    };

    useEffect(() =>{
        // Check if window is defined to access localStorage
        if (typeof window !== "undefined") {
            const storedUsername = localStorage.getItem("username");
            if (storedUsername) {
                setUsername(storedUsername);
            }
        }
    },[]);

    return (    
        <div className='navbar-section'>
            <div className='main d-flex justify-content-end'>
                <ul>
                    <li>
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic">
                                <div 
                                    className='profile-pic d-flex justify-content-end'                                     
                                >
                                    <img src={pic} className='img-fluid' alt='Profile' style={{width: "40px", height: "40px"}}/>
                                </div>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item >
                                    <div className='details-main'>
                                        <div className='details'>
                                            <div className='top-box d-flex align-items-center mt-2'>
                                                <div className='profile-pic'>
                                                    <img src={pic} className='img-fluid' alt='Profile' style={{width: "40px", height: "40px"}}/>
                                                </div>
                                                <div className='email'>
                                                    <span style={{textTransform: "capitalize"}}>{username}</span>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className='bottom-box' onClick={handleSignOut}>
                                                <span>Sign Out</span>
                                            </div>
                                        </div>
                                    </div>
                                </Dropdown.Item>                        
                            </Dropdown.Menu>
                        </Dropdown>                                       
                    </li>
                </ul>            
            </div>
        </div>
    )
}

export default Header