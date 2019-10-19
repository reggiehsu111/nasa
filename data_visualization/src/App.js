import React from 'react';
import MapContainer from "./MapContainer";
import SidebarProfile from './sidebar';
import Example from './Popover';
import People from './people';
import './App.css';
import apiKey from './api_key.txt';
import cityData from './city_data.json';


const aqiScale = [
  50, 100, 150, 200, 300, 1000
];

class App extends React.Component{

	constructor(props) {
    super(props);
    // initialize our state
    this.state = {
      data: [],
      peopleClicked: false,
      cityData: {},
      apiKey: undefined
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

  catagorizeAqi = () => {
    for (const [key, value] of Object.entries(cityData)) {
      if (cityData.hasOwnProperty(key) && value.city.geo !== null) {
        for (const [idx, aqi] of aqiScale.entries()) {
          if (value.aqi <= aqi) {
            cityData[key].aqi = idx + 1;
            break;
          }
        }
      }
    }
    this.setState({cityData: cityData});
  };

  componentDidMount(){
    // fetch(cityData)
    //   .then(data => data.json())
    //   .then(res => this.setState({ data: res.data }));
    this.catagorizeAqi();

    fetch(apiKey)
      .then(data => data.text())
      .then(res => this.setState({apiKey: res}));
  };

  render() {
  	return (
      <div>
        {this.state.apiKey === undefined ? null :
          <MapContainer apiKey={this.state.apiKey} cityData={this.state.cityData} />
        }
        {this.state.peopleClicked ? <People />:<div></div>}
        <SidebarProfile onClickPeople={this.onClickPeople.bind(this)}/>
      </div>
    );
  }
}



export default App;
