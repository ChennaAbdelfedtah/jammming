import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component{
    constructor(props){
        super(props);
        this.handleNameChange= this.handleNameChange.bind(this);
    }

    handleNameChange(e){
        this.props.onNameChange(e.targt.Value());
    }

    render(){
        return(
            <div className="Playlist">
                <input defaultValue="New Playlist" onChange={this.handleNameChange}/>
                <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
                {/* New TrackList*/}
                <TrackList  tracks ={this.props.playlistTracks} onRemove={this.props.onRemove} isRemovel={true}/>
            </div>
        );
    }
}

export default Playlist;