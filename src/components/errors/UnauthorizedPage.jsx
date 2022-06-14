import React from 'react'
import { useNavigate } from 'react-router-dom';


function UnauthorizedPage() {
    const navigate = useNavigate();

    function goToHome() {
        navigate("/")
    }

    return (
        <main>
            <section>

                <h2>401 - Unauthorized</h2>
                <p style={{ marginTop: "10px", marginBottom: "50px" }}>You are not authorized.</p>
                <button onClick={goToHome} style={{ maxWidth: "200px" }} className='btn-black'>Go back to home ></button>

            </section>
        </main>
    )

}
export default UnauthorizedPage;