import React from 'react';
import MapView from 'react-native-maps';
import { processColor } from 'react-native';
import axios from 'axios';

const yelpApiKey = process.env.YELP_API_KEY;

export default class Map extends React.Component {
  constructor(){
    super();

    this.state = {
      isLoading: true,
      origin: { latitude: 35.294401000, longitude: -120.670121000 },
      markers: []
    };

    config = {
      headers: {
        Authorization: `Bearer ${yelpApiKey}`
      },
      params: {
        term: 'Coffee',
        radius: 1,
        latitude: this.state.origin.latitude,
        longitude: this.state.origin.longitude,
        sort_by: 'distance',
        limit: 15,
      },
    };
  }

  async componentDidMount() {
    await this.fetchMarkerData();
  }

  fetchMarkerData() {
    return axios.get(`https://api.yelp.com/v3/businesses/search?term=${config.params.term}&latitude=${config.params.latitude}&longitude=${config.params.longitude}`)
      .then(response => {
        this.setState({
          isLoading: false,
          markers: response.data.businesses.map(x => x),
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // render(){
  //   return(
  //     <MapView
  //       style={{ flex: 1 }}
  //       provider="google"
  //       region={{
  //         latitude: this.state.origin.latitude,
  //         longitude: this.state.origin.longitude,
  //         latitudeDelta: 0.0100,
  //         longitudeDelta: 0.0100,
  //       }}
  //     >

  //       <MapView.Marker coordinate={this.state.origin}/>
  //     </MapView>
  //   );
  // }

  render() {
    console.log('markers: ', this.state.markers);
    return (
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
        {this.state.isLoading
          ? null
          : this.state.markers.map(marker => {
              const coords = {
                latitude: marker.coordinates.latitude,
                longitude: marker.coordinates.longitude,
              };
              const url = marker.url;

              const nameOfMarker = `${marker.name}`;
              const addressOfMarker = `${marker.location.address1}, ${marker.location.city}`;
              return (
                <MapView.Marker
                  key={marker.id}
                  coordinate={coords}
                  title={nameOfMarker}
                  description={addressOfMarker}
                >

                </MapView.Marker>
              );
            })}

        <MapView.Marker coordinate={this.state.origin}>
        </MapView.Marker>
      </MapView>
    );
  }
}
