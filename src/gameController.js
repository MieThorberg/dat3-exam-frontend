import facade from "./apiFacade";

function GameController() {
    function createGame() { }
    function createPlayer() { }
    function createRound() { }
    function assignCharacters(id) {
        facade.assignCharacters(id);
    }

    //TODO: where to put it?
    function cleanVotes(gameid) {
        facade.cleanVotes(gameid);
    }
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
        /*  cleanVotes(gameid); */
        return facade.killPlayer(gameid, playerid);
    }

    function getVictimLatest(gameid) {
        return facade.getVictimLatest(gameid);
    }
    function getVictims() { }

    function getAllPlayers() { }
    function getAlivePlayers() { }
    function getAllWerewolves() { }

    function getDay(gameid) {
        return facade.getDay(gameid);
    }
    function addDay(gameid) {
        facade.addDay(gameid);
     }

    function hasEnded(gameid) {
        return facade.hasEnded(gameid);
    }

    //gameid
    function startGame(gameid) {
        assignCharacters(gameid);
        //createRound in loop
    }

    return {
        startGame,
        vote,
        getVotingResult,
        killPlayer,
        hasEnded,
        getVictimLatest,
        getDay,
        addDay,
    }
}

const gameController = GameController();
export default gameController;
