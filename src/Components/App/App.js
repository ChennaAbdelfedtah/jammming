import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

//import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SearchResults: [
        {id:'',
        name: '',
        artist: '',
        album :''
      }],

      PlaylistTracks: [
        {id: '',
        name: '',
        artist: '',
        album: ''
      }],
      playlistName:'New Playlist'
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if(track.id === this.props.playlistTracks.id){
      return;
    }
    this.setState({track:track});
  }

  removeTrack(track){
    if(track.id == this.props.playlistTracks.id){
       track.filter( track => !track.id);
    }
    this.setState({track:track});
  }

  updatePlaylistName(name){
    this.setState({playlistName:name});
  }

  savePlaylist(){
    const trackURIs = this.props.PlaylistTracks.map( track => track=track);
    Spotify.savePlaylist(this.playlistName, trackURIs);
  }
  
  search(term){
    //console.log(term);
    Spotify.search(term);
  }

  render() {
    return (
      <div className="App">
        <h1>Ja<span className="highligh">mmm</span>ing</h1>
        <div className="App">
          <div className="App-playlist">
            <SearchBar  onSearch = {this.search}/>
            <SearchResults searchResults={this.state.SearchResults} onAdd = {this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.PlaylistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
};

export default App;
