'use-strict';
import React, { Component } from 'react';
import { Alert, AppRegistry, FlatList, Modal, ScrollView, Slider, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Button from 'apsl-react-native-button';
import { DatePickerField, Form, InputField, LinkField, PickerField, Separator, SwitchField,TimePickerField } from 'react-native-form-generator';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

export default class FinalScorecard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentHole: this.props.navigation.state.params.currentHole,
      currentWolf: this.props.navigation.state.params.currentWolf,
      golferOne: this.props.navigation.state.params.golferOne,
      golferTwo: this.props.navigation.state.params.golferTwo,
      golferThree: this.props.navigation.state.params.golferThree,
      golferFour: this.props.navigation.state.params.golferFour,
      betUnit: this.props.navigation.state.params.betUnit,
      rabbitUnit : this.props.navigation.state.params.rabbitUnit,
      snakeUnit: this.props.navigation.state.params.snakeUnit,
      initialBetUnit: this.props.navigation.state.params.initialBetUnit,
      holePushCounter: this.props.navigation.state.params.holePushCounter,
      modalVisible: false
    }
    this.checkHoleNumber = this.checkHoleNumber.bind(this);
  }

  static navigationOptions = ({navigation}) => ({
    title: 'FinalScorecard',
    headerTintColor: 'darkgreen',
  })

    render() {
    const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;
    console.log("SCORECARD PARAMS: ", params);
    console.log("SCOREDCARD STATE: ", this.state);
    const tableHead = ['Golfer', 'Snakes', 'Rabbits', 'Balance'];
    const tableTitle = [this.state.golferOne.name, this.state.golferTwo.name, this.state.golferThree.name, this.state.golferFour.name];
    const tableData = [
      [this.state.golferOne.snakeCount, this.state.golferOne.rabbitCount, this.state.golferOne.balance],
      [this.state.golferTwo.snakeCount, this.state.golferTwo.rabbitCount, this.state.golferTwo.balance],
      [this.state.golferThree.snakeCount, this.state.golferThree.rabbitCount, this.state.golferThree.balance],
      [this.state.golferFour.snakeCount, this.state.golferFour.rabbitCount, this.state.golferFour.balance]
    ];
    const balanceData = [this.state.golferOne.balance, this.state.golferTwo.balance, this.state.golferThree.balance, this.state.golferFour.balance];
    return (
      <ScrollView style={styles.scrollView}>
        <Table>
          <Row data={tableHead} flexArr={[2, 1, 1, 1]} style={styles.head} textStyle={styles.text}/>
          <TableWrapper style={{flexDirection: 'row'}}>
            <Col data={tableTitle} style={styles.title} textStyle={styles.text}/>
            <Rows data={tableData} flexArr={[1, 1, 1,]} style={styles.row} textStyle={styles.tableDataText}/>
          </TableWrapper>
        </Table>
        <Button
          style={styles.buttonStyle}
          textStyle={styles.buttonTextStyle}
          onPress={() => navigate('Home')}>
          Back to Home
        </Button>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  scrollView : {
    flex: 1
  },
  buttonStyle: {
    marginTop: 25,
    marginBottom: 5,
    marginLeft: 25,
    marginRight: 25,
    borderColor: 'white',
    backgroundColor: 'green'
  },
  buttonTextStyle: {
    color: 'white',
  },
  sliderStyle: {
    padding: 5,
    flex: 1,
  },
  head: {
    height: 40,
    backgroundColor: 'darkgreen'
  },
  title: {
    flex: 2,
    backgroundColor: 'darkgreen'
  },
  row: {
    height: 36,
  },
  text: {
    color: 'white',
    textAlign: 'center'
  },
  tableDataText: {
    textAlign: 'center',
    color: 'darkgreen'
  },
  negativeTableValue: {
    textAlign: 'center',
    color: 'red'
  }
})