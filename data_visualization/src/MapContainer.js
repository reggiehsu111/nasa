import React from 'react';
import { Map, Marker, HeatMap, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%',
};

const gradient = [
  'rgba(9, 165, 58, 0)',
  'rgba(9, 165, 58, 1)',
  'rgba(255, 241, 0, 1)',
  'rgba(255, 241, 0, 1)',
  'rgba(235, 97, 0, 1)',
  'rgba(235, 97, 0, 1)',
  'rgba(232, 0, 17, 1)',
  'rgba(232, 0, 17, 1)',
  'rgba(149, 53, 141, 1)',
  'rgba(149, 53, 141, 1)',
  'rgba(149, 53, 141, 1)',
  'rgba(149, 53, 141, 1)',
  'rgba(165, 26, 18, 1)',
  'rgba(165, 26, 18, 1)',
  'rgba(165, 26, 18, 1)',
  'rgba(165, 26, 18, 1)',
  'rgba(165, 26, 18, 1)',
  'rgba(165, 26, 18, 1)',
  'rgba(165, 26, 18, 1)',
  'rgba(165, 26, 18, 1)'
];

const markerColor = [
  '08a33b',
  'fff001',
  'ec6000',
  'e90011',
  '95358d',
  'a61c10'
];

class MapContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  displayHeatmap = () => {
    let positions = [];
    for (const position of this.props.data) {
      positions.push({
        lat: position.lat,
        lng: position.lng,
        weight: position.aqi ** 2
      });
    }
    return <HeatMap
      positions={positions}
      opacity={0.5}
      radius={0.1}
      gradient={gradient}
      dissipating={false}
    />;
  };

  displayMarkers = () => {
    let markers = [];
    for (const [idx, position] of this.props.data.entries()) {
      markers.push(<Marker
        key={idx}
        position={{
          lat: position.lat,
          lng: position.lng
        }}
        icon={
          `http://chart.apis.google.com/chart?chst=d_map_pin_letter&` +
          `chld=${position.aqi}|${markerColor[position.aqi - 1]}|000000`
        }
        // onClick={() => console.log("You clicked me!")}
      />);
    }
    return markers
  };

  render() {
    return (
      <div className="map-container">
        <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: 24, lng: 121}}
        >
          {this.displayMarkers()}
          {this.displayHeatmap()}
        </Map>
      </div>
    );
  }
}




export default GoogleApiWrapper((props) => ({
  apiKey: props.apiKey,
  libraries: ["visualization"]
})) (MapContainer);
