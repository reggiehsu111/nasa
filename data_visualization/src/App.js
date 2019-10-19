import React from 'react';
import MapContainer from "./MapContainer";
import Example from './Popover';
import People from './people';
import './App.css';
import apiKey from './api_key.txt';
import cityData from './city_data.json';
import Sidebar from 'react-sidebar';
import MaterialTitlePanel from "./material_title_panel";
import SidebarContent from "./sidebar_content";
import logo2 from "./logo2.png";
import epaData from './epa.json';

const styles = {
  contentHeaderMenuLink: {
    textDecoration: "none",
    color: "white",
    padding: 8
  }
};


const aqiScale = [
  50, 100, 150, 200, 300, 1000
];

class App extends React.Component{

	constructor(props) {
    super(props);
    // initialize our state
    this.state = {
      peopleClicked: false,
      realMapClicked:false,
      apiKey: undefined,
      docked: false,
      open: false,
      transitions: true,
      touch: true,
      shadow: true,
      pullRight: false,
      touchHandleWidth: 20,
      dragToggleDistance: 30,
      data: [],
      apiKey: undefined
  	};
  	this.onSetPeopleClicked = this.onSetPeopleClicked.bind(this);
    // this.onClickPeople = this.onClickPeople.bind(this);
    this.onSetOpen = this.onSetOpen.bind(this);
    // this.menuButtonClick = this.menuButtonClick.bind(this);
  }


  onSetOpen(open) {
    this.setState({ open });
  }

  menuButtonClick = (ev) => {
    ev.preventDefault();
    this.onSetOpen(!this.state.open);
  }
  onSetPeopleClicked(peopleClicked) {
    this.setState({ peopleClicked });
    console.log(this.state.peopleClicked);
  }

  onClickPeople = (ev) => {
    ev.preventDefault();
    this.onSetPeopleClicked(!this.state.peopleClicked);
  }

  onSetRealMapClicked = (realMapClicked) => {
    this.setState({ realMapClicked });
    console.log(this.state.realMapClicked);
  }

  onClickRealMap = (ev) => {
    ev.preventDefault();
    this.onSetRealMapClicked(!this.state.realMapClicked);
	}

  getAqiCatagory = (aqi) => {
    for (const [idx, aqiBound] of aqiScale.entries()) {
      if (aqi <= aqiBound) {
        if (aqi !== '-') {
          return idx + 1;
        } else {
          return '-';
        }
      }
    }
}

  catagorizeAqi = () => {
    let positions = [];
    for (const [key, value] of Object.entries(cityData)) {
      if (cityData.hasOwnProperty(key) && value.city.geo !== null) {
        positions.push({
          lat: value.city.geo[0],
          lng: value.city.geo[1],
          aqi: this.getAqiCatagory(value.aqi)
        });
      }
    }
    console.log(epaData.feeds)
    for (const station of epaData.feeds) {
      positions.push({
        lat: station.Latitude,
        lng: station.Longitude,
        aqi: this.getAqiCatagory(station.AQI)
      });
    }
    this.setState({data: positions});
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
  	const sidebar = <SidebarContent onClickPeople={this.onClickPeople} onClickRealMap={this.onClickRealMap}/>;
    const contentHeader = (
      <span>
        {!this.state.docked && (
          <a
            onClick={this.menuButtonClick}
            href="#"
            style={styles.contentHeaderMenuLink}
          >
            <img src={logo2} height="40" width="auto" alt="="/>
          </a>
        )}
      </span>
    );

    const sidebarProps = {
      sidebar,
      root: { position: undefined },
      docked: this.state.docked,
      sidebarClassName: "custom-sidebar-class",
      contentId: "custom-sidebar-content-id",
      open: this.state.open,
      touch: this.state.touch,
      shadow: this.state.shadow,
      pullRight: this.state.pullRight,
      touchHandleWidth: this.state.touchHandleWidth,
      dragToggleDistance: this.state.dragToggleDistance,
      transitions: this.state.transitions,
      onSetOpen: this.onSetOpen
    };

  	return (
  	<div>
      <Sidebar {...sidebarProps}>
        <MaterialTitlePanel title={contentHeader}>
          <div>
          {this.state.apiKey === undefined ? null :
          	<MapContainer apiKey={this.state.apiKey} data={this.state.realMapClicked?this.state.data:null} />
          }
          </div>
        
        </MaterialTitlePanel>
      </Sidebar>
      {this.state.peopleClicked ? <People />:<div></div>}
     </div>

    );
  }
}



export default App;
