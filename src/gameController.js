
import facade from "./apiFacade";

function GameController() {
    function createGame() { }
    function createPlayer() { }

    function round(state) {

        switch (state) {
            case "createRound":
                createRound();
                break;
            case "vote":
                cleanVotes();
                // stuff
                break;
            case "getRoundResult":
                getRoundResult();
                break;
        }

    }

    function getCurrentRound(id) {
        return facade.getCurrentRound(id);
    }

    //TODO: refactor method later...
    function setCurrent(data) {
        return data.isDay;
    }

    function createRound(id) {

        facade.getCurrentRound(id).then(data => {

            if (data.isDay) {
                const night = facade.createNightRound(id);
            } else {
                addDay(id);
                const day = facade.createDayRound(id);
            }
        });
    }

    function getRoundResult(gameId) {
        return facade.getCurrentRound(gameId).then(data => {
            if (data.isDay) {
                return facade.dayRoundResult(gameId);
            } else {
                return facade.nightRoundResult(gameId);
            }
        });
    }


    /*     function getNightRound(gameid, day) {
            facade.getNightRound(gameid, day);
        }
        function getDayRound(gameid, day) {
            facade.getDayRound(gameid, day);
        } */

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

    
    // not in use
    function getResult(id) {
        const player = facade.getVoteResult(id);
        return killPlayer(id, player.id);
    }

    
    const getVotingResult = (id) => {
        return facade.getVoteResult(id);
    }

    // not in use
    function killPlayer(gameid, playerid) {
        /*  cleanVotes(gameid); */
        return facade.killPlayer(gameid, playerid);
    }

    function getVictimLatest(gameid) {
        return facade.getVictimLatest(gameid);
    }

    function getVictims() { }

    function getAllPlayers(gameId) { 
       return facade.getPlayers(gameId)
    }

    function getAlivePlayers(gameId) {
       return facade.getAlivePlayers(gameId)
     }

    function getAllWerewolves(gameId) {
       return facade.getWereWolves(gameId)
     }

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


    function getGameByPin(pin) {
        return facade.getGameByPin(pin);
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
        createRound,
        getCurrentRound,
        getRoundResult,
        getGameByPin,
        cleanVotes,
    }
}

const gameController = GameController();
export default gameController;
