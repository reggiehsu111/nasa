import React from 'react';
import { Map, Marker, HeatMap, GoogleApiWrapper } from 'google-maps-react';



const mapStyles = {
  width: '100%',
  height: '100%',
};

export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      stores: [{latitude: 51, longitude: -0.12}]
    }
  }

  displayMarkers = () => {
    return this.state.stores.map((store, index) => {
      return <Marker key={index} id={index} position={{
       lat: store.latitude,
       lng: store.longitude
     }}
     onClick={() => console.log("You clicked me!")} />
    })
  }

  render() {
    return (
      <div className="map-container">
        <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: 51, lng: -0.12}}
        >
          <HeatMap
            positions={[{ lat: 51, lng: -0.12}]}
            opacity={1}
            radius={20}
          />
          {this.displayMarkers()}
        </Map>
      </div>
    );
  }
}

let token = "AIzaSyB7Lc_yGhFP6sGyg5EK5niszTkXqv9BmtM";

// fetch('http://localhost:3001/api/getToken')
//       .then((data) => data.text())
//       .then((res) => token = res);


export default GoogleApiWrapper({
  apiKey: token,
  libraries: ["visualization"]
}) (MapContainer);