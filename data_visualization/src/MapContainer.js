import React from 'react';
import { Map, GoogleApiWrapper, Marker, HeatMap } from 'google-maps-react';



// Put your token here
const Token = "AIzaSyA7b3wUGDeSW7MnoSrDPVbV_VUCup1Y814";


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



export default GoogleApiWrapper({
  apiKey: Token,
  libraries: ["visualization"]
})(MapContainer);