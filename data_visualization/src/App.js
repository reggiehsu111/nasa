import React from 'react';
import MapContainer from "./MapContainer";
import axios from 'axios';
import SidebarProfile from './sidebar';
import Example from './Popover';
import './App.css';


class App extends React.Component{

	constructor(props) {
    super(props);
    // initialize our state
    this.state = {
    data: []
  	};
  }

  // componentDidMount(){
  // 	this.getDataFromDb();
  // };

  getDataFromDb = () => {
    fetch('http://localhost:3001/api/getData')
      .then((data) => data.json())
      .then((res) => console.log(res.data));
  };



  render() {
  	console.log(this.state.data);
  	return(
  		<div>
        <MapContainer />
        <SidebarProfile />
        </div>
        )
  }
}



export default App;
