import React from 'react';
import './TrackList';
import Track from '../Track/Track';

class TrackList extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="TrackList">
                {
                    this.props.Tracks.map(
                        track => {
                            return<Track track={track} key={track.id} name={this.props.track.name} artist={this.props.track.artist} album={this.props.track.album} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval}/>
                        }
                    )
                }

            </div>
        );
    }
}

export default TrackList;