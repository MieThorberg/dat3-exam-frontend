import facade from "./apiFacade";

function GameController() {
    function createGame() { }
    function createPlayer() { }
    function createRound() { }
    function assignCharacters(id) {
        facade.assignCharacters(id);
    }

    function cleanVoting() { }
    //vote from one player
    function vote(gameid, userid, playerid) {
        facade.vote(gameid, userid, playerid);
    }

    function getResult(id) {
        const player = facade.getVoteResult(id);
        return killPlayer(id, player.id);
    }

    const getVotingResult = (id) => {
        return facade.getVoteResult(id);
    }
    function killPlayer(gameid, playerid) { 
        return facade.killPlayer(gameid, playerid);
    }

    function getVictimLatest() { }
    function getVictims() { }

    function getAllPlayers() { }
    function getAlivePlayers() { }
    function getAllWerewolves() { }

    function getDays() { }
    function addDay() { }

    function hasEnded() { }

    //gameid
    function startGame(id) {
        assignCharacters(id);
        //createRound in loop
    }

    return {
        startGame,
        vote,
        getVotingResult,
        killPlayer,
    }
}

const gameController = GameController();
export default gameController;
