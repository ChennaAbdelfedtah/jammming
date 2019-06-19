import React from 'react';
import './Track';

class Track extends React.Component{
    constructor(props){
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }

    addTrack(){
        this.props.onAdd(this.props.Track);
    }

    removeTrack(){
        this.props.onRemove(this.props.Track);
    }
    render(){
        return(
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p></p>
                </div>
                <button className="Track-action" onClick ={this.addTrack}> + </button>
                <button className="Track-action" onClick ={this.onRemove}> - </button>
            </div>
        );
    }
}

export default Track;