import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { randomNumberGenerator } from '../../database/fakeData/overviewDummyData';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productDescription: '',
      weight: '',
    };
  }

  componentDidMount() {
    const randomId = randomNumberGenerator(100);
    axios.get(`/overview/icons?product_id=${randomId}`)
      .then((response) => {
        console.log(response.data);
        // set the state with this product info, render it to the dom
        this.setState({
          productDescription: response.data.product_description,
          weight: response.data.weight,
        });
      })
      .catch((error) => console.log('FAILED ON CLIENT SIDE: ', error));
  }

  render() {
    return (
      <div>
        <h1>{ this.state.productDescription }</h1>
        <h3>{ this.state.weight }</h3>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
