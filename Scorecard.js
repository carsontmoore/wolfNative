'use-strict';
import React, { Component } from 'react';
import { Alert, AppRegistry, FlatList, Modal, ScrollView, Slider, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Button from 'apsl-react-native-button';
import { DatePickerField, Form, InputField, LinkField, PickerField, Separator, SwitchField,TimePickerField } from 'react-native-form-generator';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';



export default class Scorecard extends Component {
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
		title: 'Scorecard',
		headerTintColor: 'darkgreen',
	})

	checkHoleNumber() {
    let currentHole = this.state.currentHole;
    let balances = [this.state.golferOne.balance, this.state.golferTwo.balance, this.state.golferThree.balance, this.state.golferFour.balance];
    let golfers = [this.state.golferOne, this.state.golferTwo, this.state.golferThree, this.state.golferFour];
    let lastPlace = [];
    let lowestBalance;
    if(currentHole === 17 || currentHole === 18) {
      lowestBalance = Math.min(...balances);
      for(var i = 0; i < golfers.length; i++) {
        let golferName = golfers[i]['name'];
        if(golfers[i]['balance'] === lowestBalance) {
          lastPlace.push(golferName);
        }
      }
      if(lastPlace.length === 1) {
        let loser = lastPlace[0];
        this.setState({currentWolf : loser})
        Alert.alert(
          loser + ' is the wolf for the next hole!'
        )
      }
      if(lastPlace.length === 2) {
        let loserOne = lastPlace[0];
        let loserTwo = lastPlace[1];
        Alert.alert(
          '2 players tied for last!',
          'Please choose the wolf for the next hole:',
          [
            {text: loserOne, onPress: () => this.setState({currentWolf : loserOne})},
            {text: loserTwo, onPress: () => this.setState({currentWolf : loserTwo})}
          ],
          { cancelable: false }
        )
      }
      if(lastPlace.length === 3) {
      	let loserOne = lastPlace[0];
      	let loserTwo = lastPlace[1];
      	let loserThree = lastPlace[2];
      	Alert.alert(
      		'3 players tied for last!',
      		'Please choose the wolf for the next hole:',
      		[
	      		{text: loserOne, onPress: () => this.setState({currentWolf : loserOne})},
	      		{text: loserTwo, onPress: () => this.setState({currentWolf : loserTwo})},
	      		{text: loserThree, onPress: () => this.setState({currentWolf : loserThree})}
      		],
      		{ cancelable: false }
      	)
      }
    }
  }

	componentWillMount() {
		this.checkHoleNumber();
  }

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
				{this.state.currentHole === 17 || this.state.currentHole === 18 ?
					<Button
						style={styles.buttonStyle}
						textStyle={styles.buttonTextStyle}
						onPress={() => navigate('FinalHoleSetup', {
							golferOne: this.state.golferOne,
							golferTwo: this.state.golferTwo,
							golferThree: this.state.golferThree,
							golferFour: this.state.golferFour,
							rabbitUnit: this.state.rabbitUnit,
							snakeUnit: this.state.snakeUnit,
							betUnit : this.state.betUnit,
							currentHole: this.state.currentHole,
							currentWolf: this.state.currentWolf,
							initialBetUnit: this.state.initialBetUnit,
							holePushCounter: this.state.holePushCounter
						})}>
						Play Hole {this.state.currentHole}
					</Button>:
					<Button
						style={styles.buttonStyle}
						textStyle={styles.buttonTextStyle}
						onPress={() => navigate('HoleSetup', {
							golferOne: this.state.golferOne,
							golferTwo: this.state.golferTwo,
							golferThree: this.state.golferThree,
							golferFour: this.state.golferFour,
							rabbitUnit: this.state.rabbitUnit,
							snakeUnit: this.state.snakeUnit,
							betUnit : this.state.betUnit,
							currentHole: this.state.currentHole,
							currentWolf: this.state.currentWolf,
							initialBetUnit: this.state.initialBetUnit,
							holePushCounter: this.state.holePushCounter
						})}>
						Play Hole {this.state.currentHole}
					</Button>
				}
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