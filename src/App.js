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
      output: '',
      first: '',
      operator: '',
      operatorsList: ["*", "/", "+"],
      hash: {
        "/": (first, second) => +first / +second,
        "*": (first, second) => +first * +second,
        "-": (first, second) => +first - +second,
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
    let answer = '0';
    if(this.state.first && this.state.operator){
      if(!this.state.hash[this.state.output]){
        answer = (this.state.operator(this.state.first, this.state.output));

      }
    }
    return this.setState({
      first: '' + answer,
      operator: '',
      operatorsList: ["*", "/", "+"],
      output: '' + answer,
    });
  }

  checkDecimal(value){
    if(this.state.output.includes(".")) {
      console.log("Only one decimal!");
      return;
    }
    return this.setState({
      output: this.state.output + value,
      operatorsList: ["*", "/", "+"],

    }, () => console.log(this.state));
  }

  clear(){
    this.setState({
         output: '',
         first: '',
         second: '',
         operator: '',
         operatorsList: ["*", "/", "+"]
    });
  }

  checkOperator(value){
    if (this.state.operator){
      if(this.state.output !== '-') this.evaluate();
      return this.setState({
        operator: this.state.hash[value],
        output: '',
        operatorsList: ["*", "/", "+"]
      });
    } else {
      return this.setState({
           first: this.state.output,
           output: '',
           operator: this.state.hash[value],
           operatorsList: ["*", "/", "+"]
         });
    }
  }

  handleClick = ({target}) => {
    const {value} = target;
    if(value === ".") {
      return this.checkDecimal(value);
    } else if(value === "0" && this.state.output === "") {
      return console.log("No leading multiple zeroes!!");
    } else if(value === "CLEAR") {
      return this.clear();
    } else if(value === "=") {
      return this.evaluate();
    } else if(this.state.operatorsList.includes(value)) {
      return this.checkOperator(value);
    } 
    else {
        this.setState({
             operatorsList: ["*", "/", "+", "-"],
             output: this.state.output + value,
           });
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
            >{this.state.output || '0'}</span>
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
