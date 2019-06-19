import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }

    search(){
        this.props.onSearch;
    }

    handleTermChange(e){
        this.props.search(e.target.value());
    }

    render(){
        return(
            <div className="SearchBar">
                <input onChange={this.handleTermChange} placeholder= "Enter a song, Album or Artist..."/>
                <button className="SearchButton" onClick={this.search}>Search</button>
            </div>
        )
    };
}

export default SearchBar;