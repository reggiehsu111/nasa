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
    // fetch('../city_data.json')
    // .then((data) => {data.json()})
    // .then((res) => {this.setState({data: res})})
    this.state = {
    }
  }

  displayHeatmap = () => {
    if (this.props.cityData == null){return <div></div>}
    let positions = [];
    for (const [key, value] of Object.entries(this.props.cityData)) {
      if (this.props.cityData.hasOwnProperty(key) && value.city.geo !== null && value.aqi !== '-') {
        positions.push({
          lat: value.city.geo[0],
          lng: value.city.geo[1],
          weight: 2 ** value.aqi
        });
        // console.log(value.aqi)
      }
    }
    return <HeatMap
      positions={positions}
      opacity={0.5}
      radius={1}
      gradient={gradient}
      dissipating={false}
    />;
  };

  displayMarkers = () => {
    if (this.props.cityData == null){return <div></div>}
    let markers = [];
    for (const [idx, [key, value]] of
        Object.entries(Object.entries(this.props.cityData))) {
      if (this.props.cityData.hasOwnProperty(key) && value.city.geo !== null) {
        markers.push(<Marker
          key={idx}
          position={{
            lat: value.city.geo[0],
            lng: value.city.geo[1]
          }}
          icon={
            `http://chart.apis.google.com/chart?chst=d_map_pin_letter&` +
            `chld=${value.aqi}|${markerColor[value.aqi - 1]}|000000`
          }
          onClick={() => console.log("You clicked me!")}
        />);
      }
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
