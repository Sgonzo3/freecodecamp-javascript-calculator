import React from 'react';
import './App.css';


  class Button extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
  
      }
    }
    render() {
      return(
        <button
          {...this.props}
          >
          {this.props.value}
        </button>
      )
    }
  }

  export default Button;