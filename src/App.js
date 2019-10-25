import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>JavaScript Calculator</h1>
      </header>
      <Calculator/>
      <footer>
        <span>Made by <a href="">Santos Gonzalez</a></span>
      </footer>
    </div>
  );
}

export default App;

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input:[],
      output: 0,
      buttons:
      // {
      //   "7": 7,
      //   "8": 8,
      //   "9": 9,
      //   "/": () => console.log("/"),
      //   "4": 4,
      //   "5": 5,
      //   "6": 6,
      //   "*": () => console.log("*"),
      //   "1": 1,
      //   "2": 2,
      //   "3": 3,
      //   "-": () => console.log("-"),
      //   ".": ".",
      //   "0": 0,
      //   "=": () => console.log("="),
      //   "+": () => console.log("+"),
      // }
      ["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", ".", "0", "=", "+"],
      ids: ["seven", "eight", "nine", "divide", "four", "five", "six", "multiply", "one", "two", "three", "subtract", "decimal", "zero", "equals", "add"]

    }
  }

  handleClick = ({target}) => {
    const {value} = target;
    if(value === "." && this.state.input.includes(".")) {
      console.log("Decimal");
      // Should I set to active or disabled based on logic here?
      return;
    }
    if (typeof this.state.buttons[value] === 'function') {
      const fn = this.state.buttons[value];
    }
    else if(value === "CLEAR") {
      this.setState({
           input: [],
           output: 0
         })
    }
    else {
      this.setState({
           input: this.state.input + value
         })
    }

  }

  renderButtons() {
    return this.state.buttons.map( (button, index) =>
      {
      return(
        <Button
          className={
            (Number(button) >= 0)
              ? "number"
              : "operator"
          }
          key={button}
          id={this.state.ids[index]}
          onClick={this.handleClick}
          value={button}/>
      )
    });
  }

  render(){
    return(
      <main className="Calculator">
        <section className="display" id="display">
          <Button
            key="CLEAR"
            value="CLEAR"
            id="clear"
            onClick={this.handleClick}/>
          <span className="input">{this.state.input}</span>
          <span className="output">{this.state.output}</span>
        </section>
        <aside className="panel">
          {
            this.renderButtons()
        }
        </aside>
      </main>
    )
  }
}

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
