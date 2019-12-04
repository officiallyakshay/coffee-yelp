import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import SearchBar from './src/components/SearchBar';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
  }
}
export default App;
