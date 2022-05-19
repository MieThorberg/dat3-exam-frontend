import React from 'react'
import { useNavigate } from 'react-router-dom'

const NoMatch = ({mode}) => {
  const navigate = useNavigate();
  function goToStartPage() {
    navigate("/");
  }

  return (
        <div>

            <div className='background-container'>
                <div id='background-img' style={{ backgroundImage: `url(${mode.image})` }}></div>
                <div id='background-img-blur' style={{ backgroundColor: `${mode.blur}` }}></div>
            </div>

            <div className='main'>
                {/* TODO: make background image work */}

                <div className="main-container">
                    {/* <!-- Column 1 (empty) --> */}
                    <div></div>
                    {/* <!-- Column 2 (start section) --> */}
                    <div className="section">
                        <div className="header-large">
                            <h1 style={{fontSize: "40px"}}>There's nothing here :(</h1>
                            <button className='btn-purple' onClick={goToStartPage}>Go to startpage</button>
                        </div>
                    </div>
                    {/* <!-- Column 3 (empty) --> */}
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default NoMatch