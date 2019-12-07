import React from 'react';
import { Provider } from 'react-redux';
import MapView from 'react-native-maps';
import store from './src/redux/store';
import SearchBar from './src/components/SearchBar';
import Map from './src/components/Map';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        {/* <SearchBar /> */}
        <Map />
      </Provider>
    );
  }
}
export default App;
