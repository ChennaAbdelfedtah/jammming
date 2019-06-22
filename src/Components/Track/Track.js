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
                    <p>{this.props.track.artist} | {this.props.track.album} </p>
                </div>

                <div className="Track-action">        
                        if (this.props.isRemoval) {
                            <button className="Track-action" onClick ={this.onRemove}> - </button>
                        } else{
                            <button className="Track-action" onClick ={this.addTrack}> + </button>
                        }                   
                </div>   
            </div>
        );
    }
}

export default Track;