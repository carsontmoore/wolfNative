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
		this.incrementHole = this.incrementHole.bind(this);
		this.updateNextWolf = this.updateNextWolf.bind(this);
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

		//logic to update balances if wolf wins and wolf is golfer one
		if(this.state.currentWolf === this.state.golferOne.name) {
			golferOneBalance = golferOneBalance + betUnit*3;
			golferTwoBalance = golferTwoBalance - betUnit;
			golferThreeBalance = golferThreeBalance - betUnit;
			golferFourBalance = golferFourBalance - betUnit;
		}
		//golfer two win
		if(this.state.currentWolf === this.state.golferTwo.name) {
			golferTwoBalance = golferTwoBalance + betUnit*3;
			golferOneBalance = golferOneBalance - betUnit;
			golferThreeBalance = golferThreeBalance - betUnit;
			golferFourBalance = golferFourBalance - betUnit;
		}
		//golfer three win
		if(this.state.currentWolf === this.state.golferThree.name) {
			golferThreeBalance = golferThreeBalance + betUnit*3;
			golferOneBalance = golferOneBalance - betUnit;
			golferTwoBalance = golferTwoBalance - betUnit;
			golferFourBalance = golferFourBalance - betUnit;
		}
		//golfer four win
		if(this.state.currentWolf === this.state.golferFour.name) {
			golferFourBalance = golferFourBalance + betUnit*3;
			golferOneBalance = golferOneBalance - betUnit;
			golferTwoBalance = golferTwoBalance - betUnit;
			golferThreeBalance = golferThreeBalance - betUnit;
		}
		//update state with new data
	  this.setState({
  		golferOne: update(this.state.golferOne, {balance: {$set: golferOneBalance}}),
  		golferTwo: update(this.state.golferTwo, {balance: {$set: golferTwoBalance}}),
  		golferThree: update(this.state.golferThree, {balance: {$set: golferThreeBalance}}),
  		golferFour: update(this.state.golferFour, {balance: {$set: golferFourBalance}})
		})
	}

	handleSheepWin() {
		let betUnit = this.state.betUnit;
		let teamWolf = this.state.teamWolf;
		let teamSheep = this.state.teamSheep;
		let golferOneBalance = this.state.golferOne.balance;
		let golferTwoBalance = this.state.golferTwo.balance;
		let golferThreeBalance = this.state.golferThree.balance;
		let golferFourBalance = this.state.golferFour.balance;

		//logic to update balances if sheep win and wolf is golfer one
		if(this.state.currentWolf === this.state.golferOne.name) {
			golferOneBalance - betUnit*3;
			golferTwoBalance + betUnit;
			golferThreeBalance + betUnit;
			golferFourBalance + betUnit;
		}
		//golfer two loses
		if(this.state.currentWolf === this.state.golferTwo.name) {
			golferTwoBalance - betUnit*3;
			golferOneBalance + betUnit;
			golferThreeBalance + betUnit;
			golferFourBalance + betUnit;
		}
		//golfer three loses
		if(this.state.currentWolf === this.state.golferThree.name) {
			golferThreeBalance - betUnit*3;
			golferOneBalance + betUnit;
			golferTwoBalance + betUnit;
			golferFourBalance + betUnit;
		}
		//golfer four loses
		if(this.state.currentWolf === this.state.golferFour.name) {
			golferFourBalance - betUnit*3;
			golferOneBalance + betUnit;
			golferTwoBalance + betUnit;
			golferThreeBalance + betUnit;
		}
		//update state with new data
		this.setState({
  		golferOne: update(this.state.golferOne, {balance: {$set: golferOneBalance}}),
  		golferTwo: update(this.state.golferTwo, {balance: {$set: golferTwoBalance}}),
  		golferThree: update(this.state.golferThree, {balance: {$set: golferThreeBalance}}),
  		golferFour: update(this.state.golferFour, {balance: {$set: golferFourBalance}})
		})
	}

	incrementHole() {
		let currentHole = this.state.currentHole;
		currentHole ++ ;
		this.setState({
			currentHole: currentHole,
		})
	}

	updateNextWolf() {
		let newWolf;
		let currentWolf = this.state.currentWolf;
		currentWolf === this.state.golferOne.name ? newWolf = this.state.golferTwo.name : currentWolf === this.state.golferTwo.name ? newWolf = this.state.golferThree.name : currentWolf === this.state.golferThree.name ? newWolf = this.state.golferFour.name : currentWolf === this.state.golferFour.name ? newWolf = this.state.golferOne.name : null ;
		this.setState({
			currentWolf : newWolf,
		})
	}

	render(){
		const { navigate } = this.props.navigation;
		const { params } = this.props.navigation.state;
		console.log("initial result render state check: ", this.state)
		console.log("initial result render params check: ",params)

		return (
			<View>
				<Button
				style={styles.buttonStyle}
				textStyle={styles.buttonTextStyle}
				ref="wolfWinsButton"
				onPress={() => {
					this.handleWolfWin(),
					this.incrementHole(),
					this.updateNextWolf()
				}}>
					Team Wolf Wins!
				</Button>
				<Button
				style={styles.buttonStyle}
				textStyle={styles.buttonTextStyle}
				ref="sheepWinsButtons"
				onPress={() => {
					this.handleSheepWin(),
					this.incrementHole()
				}}>
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
				<Text>{this.state.currentWolf} is the new Wolf!</Text>
				<Button
					style={styles.buttonStyle}
					textStyle={styles.buttonTextStyle}
					onPress={() => {
						navigate('Scorecard', {
							golferOne: this.state.golferOne,
							golferTwo: this.state.golferTwo,
							golferThree: this.state.golferThree,
							golferFour: this.state.golferFour,
							currentHole: this.state.currentHole,
							currentWolf: this.state.currentWolf,
							betUnit: this.state.betUnit,
							rabbitUnit: this.state.rabbitUnit,
							snakeUnit: this.state.snakeUnit,
							teamSheep: this.state.teamSheep,
							teamWolf:this.state.teamWolf
						})
					}}>
						Advance to hole {this.state.currentHole}
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
