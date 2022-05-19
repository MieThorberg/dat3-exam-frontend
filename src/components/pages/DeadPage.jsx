function DeadPage({ deadByVillager, displayCharacter }) {
    return (
        <>
            <div className='game-layout'>
                <div className='header'>
                    <div className='left'></div>
                    <div className='center'></div>
                    <div className='right'></div>
                </div>
                <div className='round-section'>
                    <h1 className='title' style={{ textAlign: "center", color: "red" }}>Your are dead</h1>
                    <p className='description' style={{ padding: "10px 20px 0 20px", width: "400px" }}>
                        {!deadByVillager ?
                            "At sundown the village decided to hang you because of suspicion of you beeing the werewolf"
                            :
                            "In the middle of the night a werewolf came and killed you"
                        }
                    </p>
                </div>
                <div className='footer'>
                    <div className='left'><button className='character-btn' onClick={displayCharacter}><i className="fa fa-user-circle"></i></button></div>
                    <div className='center'></div>
                    <div className='right'></div>
                </div>
            </div>

        </>
    )
}
export default DeadPage;