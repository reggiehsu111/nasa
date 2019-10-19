import React from 'react';
import MapContainer from "./MapContainer";
// import SidebarProfile from './sidebar';
import Example from './Popover';
import People from './people';
import './App.css';
import apiKey from './api_key.txt';
import cityData from './city_data.json';
import Sidebar from 'react-sidebar';
import MaterialTitlePanel from "./material_title_panel";
import SidebarContent from "./sidebar_content";
import logo2 from "./logo2.png";

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
      data: [],
      peopleClicked: false,
      cityData: {},
      apiKey: undefined,
      docked: false,
      open: false,
      transitions: true,
      touch: true,
      shadow: true,
      pullRight: false,
      touchHandleWidth: 20,
      dragToggleDistance: 30
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
  	const sidebar = <SidebarContent onClickPeople={this.onClickPeople}/>;
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
          	<MapContainer apiKey={this.state.apiKey} cityData={this.state.cityData} />
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
