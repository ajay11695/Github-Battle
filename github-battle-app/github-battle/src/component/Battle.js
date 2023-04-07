import { useState } from "react"

function Battle() {
    let [player1, setPlayer1] = useState(null)
    let [player2, setPlayer2] = useState(null)
    let [playerCount, setPlayerCount] = useState(0)
    let [isBattle, setIsBattle] = useState(false)

    function handleSubmit(event) {
        event.preventDefault()
        let username = event.target.firstElementChild.value
        fetch(`https://api.github.com/users/${username}`)
            .then(res => res.json())
            .then(data => {
                data.score = data.followers * 20 + data.public_repos
                if (event.target[0].id === 'One') {
                    setPlayer1(data)
                    setPlayerCount(playerCount + 1)
                } else {
                    setPlayer2(data)
                    setPlayerCount(playerCount + 1)
                }
            })
    }

    function handleClose(event) {
        let player = event.target.id
        if (player === 'One') {
            setPlayer1(null)
            setPlayerCount(playerCount--)
        } else {
            setPlayer1(null)
            setPlayerCount(playerCount--)
        }
    }

    function handleBattle() {
        if (player1.score === player2.score) {
            return alert('TIE both user have same score')
        }
        if (player1.login === player2.login) {
            return alert('you can not have same user ')
        }

        setIsBattle(true)
    }

    function handleReset(){
        setIsBattle(false)
        setPlayer1(null)
        setPlayer2(null)
        setPlayerCount(0)
    }

    if (isBattle) {
        return (
            <>
                {player1.score > player2.score ?
                    <div className="flex justify-center">
                        <CardUI status={'Winner'} player={player1} />
                        <CardUI status={'Lower'} player={player2} />
                    </div>
                    :
                    <div className="flex justify-center">
                        <CardUI status={'Lower'} player={player1} />
                        <CardUI status={'Winner'} player={player2} />
                    </div>
                }
              <div className="textalign battlebtn font-600 curser" onClick={handleReset}>RESET</div>
            </>
        )
    }

    return (
        <>
            <div>
                <h1 className="textalign font-3 margin-t-1">Intructions</h1>
                <ul className="flex justify-center margin-t-2 ">
                    <li className="textalign battle-icon">
                        <h2 className="font-2">Enter two Github users</h2>
                        <i className="fa-solid fa-user-group"></i>
                    </li>
                    <li className="textalign battle-icon">
                        <h2 className="font-2">Battle</h2>
                        <i className="fa-sharp fa-solid fa-jet-fighter"></i>
                    </li>
                    <li className="textalign battle-icon">
                        <h2 className="font-2">See the winner</h2>
                        <i className="fa-solid fa-trophy"></i>
                    </li>
                </ul>
                <h1 className="textalign font-3 margin-t-2">Players</h1>
                <div className="flex between">
                    {!player1 ? <Input player='One' handleSubmit={handleSubmit} /> : <Profile player='One' profile={player1} handleClose={handleClose} />}
                    {!player2 ? <Input player='Two' handleSubmit={handleSubmit} /> : <Profile player='Two' profile={player2} handleClose={handleClose} />}
                </div>
                {playerCount > 1 && <div className="textalign battlebtn font-600 curser" onClick={handleBattle}>BATTLE</div>}
            </div>

        </>
    )
}


function Input({ player, handleSubmit }) {
    return (
        <div className="player">
            <h1 className="font-2">Player {player}</h1>
            <form className="margin-t-1" onSubmit={handleSubmit}>
                <input className="userInput" type='text' id={player} placeholder="github user name" />
                <input className="inputbtn" type="submit" value='SUBMIT' />
            </form>
        </div>
    )
}


function Profile({ player, profile, handleClose }) {
    return (
        <div className="player">
            <h1 className="font-2">Player {player}</h1>
            <div className="profile flex between margin-t-1 align-center">
                <figure className="flex align-center profile-img">
                    <img src={profile.avatar_url} alt="pic" />
                    <a className="font-1 font-600" href={profile.html_url}>{profile.login}</a>
                </figure>
                <span className="curser profilebtn font-600 font-1" id={player} onClick={handleClose}>X</span>
            </div>
        </div>
    )
}

function CardUI({status,player}) {
    return (
        <div className="battle-card">
            <div className="flex column align-center">
                <h2 className="font-3 ">{status}</h2>
                <figure className="width-64 margin-t-1">
                    <img src={player.avatar_url} alt="pic" />
                </figure>
                <p className="margin-t-1 font-1 font-600">Score: {player.score}</p>
                <a  className="margin-t-1 font-2 font-600" href={player.html_url}>{player.login}</a>
            </div>
            <ul>
                <li className=" font-1 font-600 margin-t-1"><i className="fa-solid fa-user"></i> {player.login} </li>
                <li className=" font-1 font-600 margin-t-1"><i className="fa-solid fa-compass"></i> {player.location || 'null'}</li>
                <li className=" font-1 font-600 margin-t-1"><i className="fa-solid fa-users"></i>{player.followers} followers</li>
                <li className=" font-1 font-600 margin-t-1"><i className="fa-solid fa-user-group"></i> {player.following} following</li>
                <li className=" font-1 font-600 margin-t-1"><i className="fa-solid fa-code"></i>{player.public_repos} repositories</li>
            </ul>
        </div>
    )
}


export default Battle