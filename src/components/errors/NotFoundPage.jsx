import React from 'react'
import { useNavigate } from 'react-router-dom';


function NotFoundPage() {
    const navigate = useNavigate();

    function goToHome() {
        navigate("/")
    }

    return (
        <main>
            <section>
                <h2>404 - Not found</h2>
                <p style={{ marginTop: "10px", marginBottom: "50px" }}>The page does not exist.</p>
                <button onClick={goToHome} style={{ maxWidth: "200px" }} className='btn-black'>Go back to home ></button>
            </section>
        </main>
    )

}
export default NotFoundPage;