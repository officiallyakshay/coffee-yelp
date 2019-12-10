import React from 'react';
import MapView from 'react-native-maps';
import { Linking, Alert } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class Map extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      markers: [],
      origin: { latitude: 35.294401000, longitude: -120.670121000 },
    };

    config = {
      headers: {
        Authorization: `Bearer ocpJnYtP2Hn27Vh5JsqPQdADhObneTs-66I5PnH9GfDPAkts8XCClBd-ikbn3e1Y2ZpW4IUM1ixZfHvKdCb-KhOj8z88hBiB8XXsnpQ3AS0QEcVfUZX9wsJO7i_nXXYx`,
      },
      params: {
        term: 'Coffee',
        raduis: 1,
        latitude: this.state.origin.latitude,
        longitude: this.state.origin.longitude,
        sort_by: 'distance',
        limit: 15,
      },
    };
  }

  getLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => {
          let newOrigin = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          config.params.latitude = newOrigin.latitude;
          config.params.longitude = newOrigin.longitude;

          this.setState({
            origin: newOrigin,
          });
          resolve(true);
        },
        err => {
          console.log('error');
          console.log(err);
          reject(reject);
        },
        { enableHighAccuracy: true, timeout: 2000, maximumAge: 1000 }
      );
    });
  };

  async componentDidMount() {
    await this.getLocation();
    await this.fetchMarkerData();
  }

  fetchMarkerData() {
    // changing to this api because the other one did not work
    return axios
      .get(`https://api.yelp.com/v3/businesses/search`, config)
      .then(responseJson => {
        this.setState({
          isLoading: false,
          markers: responseJson.data.businesses.map(x => x),
        });
      })
      .catch(error => {
        console.log(error);
      });
  }


  render() {
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

              const nameOfMarker = `${marker.name}(${marker.rating} rating)`;
              const addressOfMarker = `${marker.location.address1}, ${marker.location.city}`;
              return (
                <MapView.Marker
                  key={marker.id}
                  coordinate={coords}
                  title={nameOfMarker}
                  description={addressOfMarker}
                  onPress={() =>
                    Alert.alert(
                      'Redirect to yelp?',
                      'or cancel to wing it ;) ',
                      [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        { text: 'OK', onPress: () => Linking.openURL(url) },
                      ],
                      { cancelable: false }
                    )}
                >

                  <Icon name="map-marker" size={30} color={'#ff0000'} />

                </MapView.Marker>
              );
            })}

        <MapView.Marker coordinate={this.state.origin}>
          <Icon name="street-view" size={40} color={'#76BBB7'} />
        </MapView.Marker>
      </MapView>
    );
  }
}
