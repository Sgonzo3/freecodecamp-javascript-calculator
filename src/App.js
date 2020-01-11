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
        <span>Made by <a href="https://sgonzo3.github.io/">Santos Gonzalez</a></span>
      </footer>
    </div>
  );
}

export default App;

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // input: null,
      output: '0',
      first: '',
      operator: '',
      // second: 0,
      hash: {
        "7": 7,
        "8": 8,
        "9": 9,
        "/": (first, second) => +first / +second,
        "4": 4,
        "5": 5,
        "6": 6,
        "*": (first, second) => +first * +second,
        "1": 1,
        "2": 2,
        "3": 3,
        "-": (first, second) => +first - +second,
        ".": ".",
        "0": 0,
        "=": (first, second) => console.log("="),
        "+": (first, second) => +first + +second,
      },
      buttons: ["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", ".", "0", "=", "+"],
      ids: ["seven", "eight", "nine", "divide", "four", "five", "six", "multiply", "one", "two", "three", "subtract", "decimal", "zero", "equals", "add"]

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

  evaluate = () => {
    let answer = this.state.output;
    // console.log(this.state);
    if(this.state.first && this.state.operator){
      answer = (this.state.operator(this.state.first, this.state.output));
    }
    return this.setState({
      // input: answer,
      first: '' + answer,
      operator: '',
      output: '' + answer,
    },() => console.log(this.state))

  }

  checkDecimal(value){
    console.log(this.state);
    if(this.state.output.includes(".")) {
      console.log("Only one decimal!");
      return;
    }
    return this.setState({
      // input: this.state.input + value,
      output: this.state.output + value,
    }, () => console.log(this.state));
  }
  clear(){
    this.setState({
         // input: [],
         output: '0',
         first: '',
         second: '',
         operator: ''
       }, () => console.log(this.state))
  }
  checkOperator(value){
    if (this.state.operator){
      this.evaluate();
      return this.setState({
        operator: this.state.hash[value],
        output: '0',
      });
    } else {
      return this.setState({
           // input: this.state.input + value,
           first: this.state.output,
           output: '0',
           operator: this.state.hash[value],
         }, () => console.log(this.state));
    }
  }
  handleClick = ({target}) => {
    const {value} = target;
    const operators = ["*", "/", "+"];
    if(value === ".") {
      return this.checkDecimal(value);
    } else if(value === "0" && this.state.output === "0") {
      return console.log("No leading multiple zeroes!!");
    } else if(value === "CLEAR") {
      return this.clear();
    } else if(value === "=") {
      return this.evaluate();
    } else if(operators.includes(value)) {
      return this.checkOperator(value);
    } else if(value === "-"){
      if(this.state.output === "0"){
        this.setState({
          // input: this.state.input + value,
          output: (this.state.output === '0') ? value : this.state.output + value,
        }, () => console.log(this.state));
      } else {return this.checkOperator(value)}
    } else {
        this.setState({
             // input: this.state.input + value,
             output: (this.state.output === '0') ? value : this.state.output + value,
           }, () => console.log(this.state));
    }
  }

  render(){
    return(
      <main className="Calculator">
        <section
          className="display-field"
          >
          <Button
            key="CLEAR"
            value="CLEAR"
            id="clear"
            onClick={this.handleClick}
            />
          <span className="input"></span>
          <span
            className="output"
            id="display"
            >{this.state.output}</span>
        </section>
        <aside className="panel">
          {this.renderButtons()}
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
