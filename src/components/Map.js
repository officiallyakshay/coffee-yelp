import React from 'react';
import MapView from 'react-native-maps';

export default class Map extends React.Component {
  constructor(){
    super();

    this.state = {
      origin: { latitude: 35.294401000, longitude: -120.670121000 },
    };


  }
  render(){
    return(
      <MapView
        style={{ flex: 1 }}
        provider="google"
        region={{
          latitude: this.state.origin.latitude,
          longitude: this.state.origin.longitude,
          latitudeDelta: 0.0100,
          longitudeDelta: 0.0100,
        }}
      >
        <MapView.Marker coordinate={this.state.origin}/>
      </MapView>
    );
  }
}
