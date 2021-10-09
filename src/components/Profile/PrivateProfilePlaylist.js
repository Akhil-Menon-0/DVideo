import React from 'react'

function PrivateProfilePlaylist(props) {
    return (
        <h1>List videos of {props.playlistName} playlist for currently logged in user(fectch from context)</h1>
    )
}

export default PrivateProfilePlaylist