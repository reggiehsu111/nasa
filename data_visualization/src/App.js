import React from 'react';
import MapContainer from "./MapContainer";
import axios from 'axios';
import SidebarProfile from './sidebar';
import Example from './Popover';
import People from './people';
import './App.css';



class App extends React.Component{

	constructor(props) {
    super(props);
    // initialize our state
    this.state = {
    data: [],
    peopleClicked: false
  	};
  	this.onSetPeopleClicked = this.onSetPeopleClicked.bind(this);
    this.onClickPeople = this.onClickPeople.bind(this);
  }

  onSetPeopleClicked(peopleClicked) {
    this.setState({ peopleClicked });
    console.log(this.state.peopleClicked);
  }

  onClickPeople(ev){
    ev.preventDefault();
    this.onSetPeopleClicked(!this.state.peopleClicked);
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
  		<div>
        <MapContainer />
        </div>
        <div>
        {this.state.peopleClicked ? <People />:<div></div>}
        <SidebarProfile onClickPeople={this.onClickPeople.bind(this)}/>
        </div>
        </div>
        )
  }
}



export default App;
