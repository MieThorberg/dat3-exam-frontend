import React from 'react'
import "../styles/Header.css";
import facade from '../apiFacade';
function Header() {

    function logout() {
        facade.logout();
        window.location.reload();
    }

    return (
        <nav>
            <div className='left'>
                <a href='/'>Home</a>
                {
                    facade.getToken() == undefined ?
                        <>
                        
                        </>
                        :

                        (facade.decodeToken().roles.includes("admin") ? 
                        <>
                            {/* <a href='/owners'>Owners</a>
                            <a href='/harbours'>Harbours</a>
                            <a href='/data'>Data</a> */}
                        </>
                        
                        :

                        <>
                            {/* <a href='/owners'>Owners</a>
                            <a href='/harbours'>Harbours</a> */}
                        </>
                        
                        )
                        
                }
            </div>
            <div className='right'>


                {
                    facade.getToken() != undefined ?
                        <div className='dropdown'>
                            <div className='btn-login'>
                                <a style={{ paddingRight: "10px" }}>{facade.decodeToken().username}</a>
                                <i className="material-icons">&#xe55a;</i>
                            </div>
                            <div className='dropdown-content'>
                                <a>Settings</a>
                                <a onClick={logout}>Log out</a>
                            </div>

                        </div>

                        :
                        <a href='/login'>Login</a>
                }



            </div>
        </nav>
    )

}
export default Header;