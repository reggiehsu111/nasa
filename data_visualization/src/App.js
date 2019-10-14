import React from 'react';
import MapChart from "./MapChart";
import { Map, GoogleApiWrapper } from 'google-maps-react';

// function App() {
//   return (
//      <div>
//       <MapChart />
//     </div>
//   );
// }

class App extends React.Component{
  render() {
    return (
        <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: 47.444, lng: -122.176}}
        />
    );
  }
}

export default App;
