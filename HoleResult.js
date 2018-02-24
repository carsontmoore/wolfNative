'use-strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
 } from 'react-native';
import { StackNavigator }  from 'react-navigation';
import Button from'apsl-react-native-button';
import {
	Form,
	PickerField,
	DatePickerField,
	TimePickerField,
	InputField,
	LinkField,
	Separator,
	SwitchField,
} from 'react-native-form-generator';
import update from 'immutability-helper';

export default class HoleResult extends Component {
	constructor(props){
		super(props);
		this.state = {
			golferOne : this.props.navigation.state.params.golferOne,
			golferTwo : this.props.navigation.state.params.golferTwo,
			golferThree : this.props.navigation.state.params.golferThree,
			golferFour : this.props.navigation.state.params.golferFour,
			betUnit : this.props.navigation.state.params.betUnit,
			rabbitUnit : this.props.navigation.state.params.rabbitUnit,
			snakeUnit : this.props.navigation.state.params.snakeUnit,
			currentHole : this.props.navigation.state.params.currentHole,
			currentWolf : this.props.navigation.state.params.currentWolf,
			teamWolf : this.props.navigation.state.params.teamWolf,
			teamSheep : this.props.navigation.state.params.teamSheep,
		}
		this.handleWolfWin = this.handleWolfWin.bind(this);
		this.handleSheepWin = this.handleSheepWin.bind(this);
	}

	static navigationOptions = ({navigation}) => ({
		title: 'HoleResult',
		headerTintColor: 'darkgreen',
		headerTitle: 'Hole Results'
	})

	handleWolfWin() {
		let betUnit = this.state.betUnit;
		let teamWolf = this.state.teamWolf;
		let teamSheep = this.state.teamSheep;
		let golferOneBalance = this.state.golferOne.balance;
		let golferTwoBalance = this.state.golferTwo.balance;
		let golferThreeBalance = this.state.golferThree.balance;
		let golferFourBalance = this.state.golferFour.balance;
		let currentHole = this.state.currentHole;
		currentHole ++;
		console.log("current hole: ", currentHole)

		//logic to update balances if wolf wins and wolf is golfer one
		if(this.state.currentWolf === this.state.golferOne.name) {
			golferOneBalance += betUnit*3;
			golferTwoBalance -= betUnit;
			golferThreeBalance -= betUnit;
			golferFourBalance -= betUnit;
		}
		//golfer two win
		if(this.state.currentWolf === this.state.golferTwo.name) {
			golferTwoBalance += betUnit*3;
			golferOneBalance -= betUnit;
			golferThreeBalance -= betUnit;
			golferFourBalance -= betUnit;
		}
		//golfer three win
		if(this.state.currentWolf === this.state.golferThree.name) {
			golferThreeBalance += betUnit*3;
			golferOneBalance -= betUnit;
			golferTwoBalance -= betUnit;
			golferFourBalance -= betUnit;
		}
		//golfer four win
		if(this.state.currentWolf === this.state.golferFour.name) {
			golferFourBalance += betUnit*3;
			golferOneBalance -= betUnit;
			golferTwoBalance -= betUnit;
			golferThreeBalance -= betUnit;
		}
		//update state with new data
		this.setState({
  		golferOne: update(this.state.golferOne, {balance: {$set: golferOneBalance}}),
  		golferTwo: update(this.state.golferTwo, {balance: {$set: golferTwoBalance}}),
  		golferThree: update(this.state.golferThree, {balance: {$set: golferThreeBalance}}),
  		golferFour: update(this.state.golferFour, {balance: {$set: golferFourBalance}}),
  		currentHole: update(this.state.currentHole, {$set: currentHole})
		})
	}

	handleSheepWin() {
		let betUnit = this.state.betUnit;
		let teamWolf = this.state.teamWolf;
		let teamSheep = this.this.state.teamSheep;
	}

	render(){
		const { navigate } = this.props.navigation;
		const { params } = this.props.navigation.state;
		console.log("HOLE RESULTS state on initial render: ", this.state)

		return (
			<View>
				<Button
				style={styles.buttonStyle}
				textStyle={styles.buttonTextStyle}
				ref="wolfWinsButton"
				onPress={() => {
					this.handleWolfWin(),
					navigate('Scorecard', {
						golferOne: this.state.golferOne,
						golferTwo: this.state.golferTwo,
						golferThree: this.state.golferThree,
						golferFour: this.state.golferFour,
						currentHole: this.state.currentHole,
					})
				}}>
					Team Wolf Wins!
				</Button>
				<Button
				style={styles.buttonStyle}
				textStyle={styles.buttonTextStyle}
				ref="sheepWinsButtons"
				onPress={() => this.handleSheepWin()}>
					Team Sheep Wins!
				</Button>
				<Button
				style={styles.buttonStyle}
				textStyle={styles.buttonTextStyle}>
					Add Rabbits
				</Button>
				<Button
				style={styles.buttonStyle}
				textStyle={styles.buttonTextStyle}>
					Add Snakes
				</Button>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	buttonStyle: {
  	marginTop: 10,
  	marginBottom: 10,
  	marginLeft: 25,
  	marginRight: 25,
  	borderColor: 'white',
  	backgroundColor: 'green'
  },
  buttonTextStyle: {
  	color: 'white',
  },
  textStyle: {
		color: 'darkgreen',
		padding: 5,
		fontSize: 16,
		fontWeight: 'bold',
		marginTop: 10
	},
})
