import React from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {Component} from 'react/cjs/react.production.min';
import Button from './src/components/Button';
import Display from './src/components/Display';

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

export default class App extends Component {
  state = {...initialState};

  addDigit = n => {
    const clearDisplay =
      this.state.displayValue === '0' || this.state.clearDisplay;

    if (n === '.' && !clearDisplay && this.state.displayValue.includes('.')) {
      return;
    }

    const currentValue = clearDisplay ? '' : this.state.displayValue;
    const displayValue = currentValue + n;
    this.setState({displayValue, clearDisplay: false});

    if (n !== '.') {
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];
      values[this.state.current] = newValue;
      this.setState({values});
    }
  };

  clearMemory = () => {
    this.setState({displayValue: '0'});
    this.setState({...initialState});
  };

  setOperation = operation => {
    if (this.state.curret === 0) {
      this.setState({operation, current: 1, clearDisplay: true});
    } else {
      const equals = operation === '=';
      const values = [...this.state.values];
      try {
        // eslint-disable-next-line no-eval
        values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`);
      } catch (e) {
        values[0] = this.state.values[0];
      }

      values[1] = 0;
      this.setState({
        //concatenei para garantir que sempre vai ser string o valor de value
        displayValue: `${values[0]}`,
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: true,
        //nao preciso passar value: values
        values,
      });
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Display value={this.state.displayValue} />
        <View style={styles.buttons}>
          <Button label="AC" triple onCLick={this.clearMemory} />
          <Button label="/" operation onClick={this.setOperation} />
          <Button label="7" onCLick={this.addDigit} />
          <Button label="8" onCLick={this.addDigit} />
          <Button label="9" onCLick={this.addDigit} />
          <Button label="*" operation onCLick={this.setOperation} />
          <Button label="4" onCLick={this.addDigit} />
          <Button label="5" onCLick={this.addDigit} />
          <Button label="6" onCLick={this.addDigit} />
          <Button label="-" operation onCLick={this.setOperation} />
          <Button label="1" onCLick={this.addDigit} />
          <Button label="2" onCLick={this.addDigit} />
          <Button label="3" onCLick={this.addDigit} />
          <Button label="+" operation onCLick={this.setOperation} />
          <Button label="0" double onCLick={this.addDigit} />
          <Button label="." onCLick={this.addDigit} />
          <Button label="=" operation onCLick={this.setOperation} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  instructions: {},
});
