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

export default class HoleSetup extends Component {
	constructor(props) {
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
			currentWolf: this.props.navigation.state.params.currentWolf,
			teamWolf: [],
			teamSheep: [],
		}
		this.handleWolf = this.handleWolf.bind(this);
		this.handleBlindWolf = this.handleBlindWolf.bind(this);
		this.handleLoneWolf = this.handleLoneWolf.bind(this);
		this.handlePartnerOne = this.handlePartnerOne.bind(this);
		this.handlePartnerTwo = this.handlePartnerTwo.bind(this);
		this.handlePartnerThree = this.handlePartnerThree.bind(this);
	}

	static navigationOptions = ({navigation}) => ({
		title: 'HoleSetup',
		headerTintColor: 'darkgreen',
		headerTitle: 'Hole Setup'
	})

	handleWolf() {
		let teamWolf = [...this.state.teamWolf, this.state.currentWolf];
		let teamSheep;
		this.state.currentWolf === this.state.golferOne.name ? teamSheep = [this.state.golferTwo.name, this.state.golferThree.name, this.state.golferFour.name] : this.state.currentWolf === this.state.golferTwo.name ? teamSheep = [this.state.golferOne.name, this.state.golferThree.name, this.state.golferFour.name] : this.state.currentWolf === this.state.golferThree.name ? teamSheep = [this.state.golferOne.name, this.state.golferTwo.name, this.state.golferFour.name] : this.state.currentWolf === this.state.golferFour.name ? teamSheep = [this.state.golferOne.name, this.state.golferTwo.name, this.state.golferThree.name] : null ;
		this.setState({
			teamWolf : teamWolf,
			teamSheep : teamSheep
		});
	}

	handleLoneWolf() {
		let betUnit = this.state.betUnit;
		betUnit = betUnit * 2;
		let teamWolf = [...this.state.teamWolf, this.state.currentWolf];
		let teamSheep;
		this.state.currentWolf === this.state.golferOne.name ? teamSheep = [...this.state.teamSheep, this.state.golferTwo.name, this.state.golferThree.name, this.state.golferFour.name] : this.state.currentWolf === this.state.golferTwo.name ? teamSheep = [...this.state.teamSheep, this.state.golferOne.name, this.state.golferThree.name, this.state.golferFour.name] : this.state.currentWolf === this.state.golferThree.name ? teamSheep = [...this.state.teamSheep, this.state.golferOne.name, this.state.golferTwo.name, this.state.golferFour.name] : this.state.currentWolf === this.state.golferFour.name ? teamSheep = [...this.state.teamSheep, this.state.golferOne.name, this.state.golferTwo.name, this.state.golferThree.name] : null ;
		this.setState({
			betUnit : betUnit,
			teamWolf : teamWolf,
			teamSheep : teamSheep
		});
	}

	handleBlindWolf() {
		let betUnit = this.state.betUnit;
		betUnit = betUnit * 3;
		let teamWolf = [...this.state.teamWolf, this.state.currentWolf];
		let teamSheep;
		this.state.currentWolf === this.state.golferOne.name ? teamSheep = [...this.state.teamSheep, this.state.golferTwo.name, this.state.golferThree.name, this.state.golferFour.name] : this.state.currentWolf === this.state.golferTwo.name ? teamSheep = [...this.state.teamSheep, this.state.golferOne.name, this.state.golferThree.name, this.state.golferFour.name] : this.state.currentWolf === this.state.golferThree.name ? teamSheep = [...this.state.teamSheep, this.state.golferOne.name, this.state.golferTwo.name, this.state.golferFour.name] : this.state.currentWolf === this.state.golferFour.name ? teamSheep = [...this.state.teamSheep, this.state.golferOne.name, this.state.golferTwo.name, this.state.golferThree.name] : null ;
		this.setState({
			betUnit : betUnit,
			teamWolf : teamWolf,
			teamSheep : teamSheep
		});
	}

	handlePartnerOne() {
		let teamWolf ;
		let teamSheep;
		//Check currentWolf, then assign teams as appropriate
		this.state.currentWolf === this.state.golferOne.name ? (
			teamWolf = [...this.state.teamWolf, this.state.currentWolf, this.state.golferTwo.name],
			teamSheep= [...this.state.teamSheep, this.state.golferThree.name, this.state.golferFour.name]
		) : this.state.currentWolf === this.state.golferTwo.name ? (
			teamWolf = [...this.state.teamWolf, this.state.currentWolf, this.state.golferThree.name],
			teamSheep = [...this.state.teamSheep, this.state.golferOne.name, this.state.golferFour.name]
		) : this.state.currentWolf === this.state.golferThree.name ? (
			teamWolf = [...this.state.teamWolf, this.state.currentWolf, this.state.golferFour.name],
			teamSheep = [...this.state.teamSheep, this.state.golferOne.name, this.state.golferTwo.name]
		) : this.state.currentWolf === this.state.golferFour.name ? (
			teamWolf = [...this.state.teamWolf, this.state.currentWolf, this.state.golferOne.name],
			teamSheep = [...this.state.teamSheep, this.state.golferTwo.name, this.state.golferThree.name]
		) : null ;
		this.setState({
			teamWolf : teamWolf,
			teamSheep : teamSheep
		});
	}

	handlePartnerTwo() {
		let teamWolf;
		let teamSheep;
		this.state.currentWolf === this.state.golferOne.name ? (
			teamWolf = [...this.state.teamWolf, this.state.currentWolf, this.state.golferThree.name],
			teamSheep = [...this.state.teamSheep, this.state.golferTwo.name, this.state.golferFour.name]
		) : this.state.currentWolf === this.state.golferTwo.name ? (
			teamWolf = [...this.state.teamWolf, this.state.currentWolf, this.state.golferFour.name],
			teamSheep = [...this.state.teamSheep, this.state.golferOne.name, this.state.golferThree.name]
		) : this.state.currentWolf === this.state.golferThree.name ? (
			teamWolf = [...this.state.teamWolf, this.state.currentWolf, this.state.golferOne.name],
			teamSheep = [...this.state.teamSheep, this.state.golferTwo.name, this.state.golferFour.name]
		) : this.state.currentWolf === this.state.golferFour.name ? (
			teamWolf = [...this.state.teamWolf, this.state.currentWolf, this.state.golferTwo.name],
			teamSheep = [...this.state.teamSheep, this.state.golferOne.name, this.state.golferThree.name]
		) : null ;
		this.setState({
			teamWolf : teamWolf,
			teamSheep: teamSheep
		});
	}

	handlePartnerThree() {
		let teamWolf;
		let teamSheep;
		this.state.currentWolf === this.state.golferOne.name ? (
			teamWolf = [...this.state.teamWolf, this.state.currentWolf, this.state.golferFour.name],
			teamSheep =[...this.state.teamSheep, this.state.golferTwo.name, this.state.golferThree.name]
		) : this.state.currentWolf === this.state.golferTwo.name ? (
			teamWolf = [...this.state.teamWolf, this.state.currentWolf, this.state.golferOne.name],
			teamSheep = [...this.state.teamSheep, this.state.golferThree.name, this.state.golferFour.name]
		) : this.state.currentWolf === this.state.golferThree.name ? (
			teamWolf = [...this.state.teamWolf, this.state.currentWolf, this.state.golferTwo.name],
			teamSheep = [...this.state.teamSheep, this.state.golferOne.name, this.state.golferFour.name]
		) : this.state.currentWolf === this.state.golferFour.name ? (
			teamWolf = [...this.state.teamWolf, this.state.currentWolf, this.state.golferThree.name],
			teamSheep = [...this.state.teamSheep, this.state.golferOne.name, this.state.golferTwo.name]
		) : null ;
		this.setState({
			teamWolf : teamWolf,
			teamSheep : teamSheep
		});
	}



	//  componentWillReceiveProps() {
	// 	// this is where we should reset state of current wolf and current hole
	// }

	render() {
		const { navigate } = this.props.navigation;
		const { params } = this.props.navigation.state;
		return (
			<View>
				<Text style={styles.textStyle}>
					{this.state.currentWolf} is the Wolf!
				</Text>
				<Button
					style={styles.buttonStyle}
					textStyle={styles.buttonTextStyle}
					ref="wolfButton"
					onPress={() => {
						this.handleWolf()
					}}>
					Wolf
				</Button>
				<Button
					style={styles.buttonStyle}
					textStyle={styles.buttonTextStyle}
					ref="loneWolfButton"
					onPress={() => {
						this.handleLoneWolf()
					}}>
					Lone Wolf (bet x 2)
				</Button>
				<Button
					style={styles.buttonStyle}
					textStyle={styles.buttonTextStyle}
					ref="blindWolfButton"
					onPress={() => {
						this.handleBlindWolf()
				}}>
					Blind Wolf (bet x 3)
				</Button>
				<Text style={styles.textStyle}>
					Or choose a partner for this hole:
				</Text>
				<Button
					style={styles.buttonStyle}
					textStyle={styles.buttonTextStyle}
					ref="partnerOne"
					onPress={() => {
						this.handlePartnerOne()
					}}>
					Partner with{this.state.currentWolf === this.state.golferOne.name ? this.state.golferTwo.name : this.state.currentWolf === this.state.golferTwo.name ? this.state.golferThree.name : this.state.currentWolf === this.state.golferThree.name ? this.state.golferFour.name : this.state.currentWolf === this.state.golferFour.name ? this.state.golferOne.name : null}
				</Button>
				<Button
					style={styles.buttonStyle}
					textStyle={styles.buttonTextStyle}
					ref="partnerTwo"
					onPress={() => {
						this.handlePartnerTwo()
					}}>
					Partner with{this.state.currentWolf === this.state.golferOne.name ? this.state.golferThree.name : this.state.currentWolf === this.state.golferTwo.name ? this.state.golferFour.name : this.state.currentWolf === this.state.golferThree.name ? this.state.golferOne.name : this.state.currentWolf === this.state.golferFour.name ? this.state.golferTwo.name : null}
				</Button>
				<Button
					style={styles.buttonStyle}
					textStyle={styles.buttonTextStyle}
					ref="partnerThree"
					onPress={() => {
						this.handlePartnerThree()
					}}>
					Partner with{this.state.currentWolf === this.state.golferOne.name ? this.state.golferFour.name : this.state.currentWolf === this.state.golferTwo.name ? this.state.golferOne.name : this.state.currentWolf === this.state.golferThree.name ? this.state.golferTwo.name : this.state.currentWolf === this.state.golferFour.name ? this.state.golferThree.name : null}
				</Button>
				<Text>Team Wolf is {this.state.teamWolf}</Text>
				<Text>Team Sheep is {this.state.teamSheep}</Text>
				<Button
				style={styles.buttonStyle}
				textStyle={styles.buttonTextStyle}
				onPress={() => {
					navigate('HoleResult', {
							golferOne: this.state.golferOne,
							golferTwo: this.state.golferTwo,
							golferThree: this.state.golferThree,
							golferFour: this.state.golferFour,
							rabbitUnit: this.state.rabbitUnit,
							snakeUnit: this.state.snakeUnit,
							betUnit : this.state.betUnit,
							currentHole: this.state.currentHole,
							currentWolf: this.state.currentWolf,
							teamWolf : this.state.teamWolf,
							teamSheep : this.state.teamSheep,
						})
				}}>
					Who wins the hole?
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