import React from 'react';
import MapContainer from "./MapContainer"
import axios from 'axios';


class App extends React.Component{

	constructor(props) {
    super(props);
    // initialize our state
    this.state = {
    data: []
  	};
  }

  componentDidMount(){
  	this.getDataFromDb();
  };

  getDataFromDb = () => {
    fetch('http://localhost:3001/api/getData')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
  };



  render() {
  	console.log(this.state.data);
  	return(
        <MapContainer />
        )
  }
}



export default App;
