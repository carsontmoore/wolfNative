'use-strict';
import React, { Component } from 'react';
import { AppRegistry, FlatList, Modal, ScrollView, Slider, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Button from 'apsl-react-native-button';
import { DatePickerField, Form, InputField, LinkField, PickerField, Separator, SwitchField,TimePickerField } from 'react-native-form-generator';
import HoleSetup from './HoleSetup';
import HoleInstance from './HoleInstance';

export default class Scorecard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			golferOne : { name: this.props.navigation.state.params.golferOneName, balance: 0, rabbitCount: 0, snakeCount: 0},
			golferTwo : { name: this.props.navigation.state.params.golferTwoName, balance: 0, rabbitCount: 0, snakeCount: 0},
			golferThree : { name: this.props.navigation.state.params.golferThreeName, balance: 0, rabbitCount: 0, snakeCount: 0},
			golferFour : {name: this.props.navigation.state.params.golferFourName, balance: 0, rabbitCount: 0, snakeCount: 0},
			rabbitUnit : this.props.navigation.state.params.rabbitUnit,
			snakeUnit: this.props.navigation.state.params.snakeUnit,
			betUnit: this.props.navigation.state.params.betUnit,
			currentHole: 1
		}
	}

	static navigationOptions = ({navigation}) => ({
		title: 'Scorecard',
		headerTintColor: 'darkgreen',
	})

	shouldComponentUpdate() {

	}

	// render() {
	// 	const { params } = this.props.navigation.state;
	// 	const { navigate } = this.props.navigation;
	// 	console.log("SCORECARD PARAMS: ", params)
	// 	return (
	// 		<ScrollView style={styles.scrollView}>
	// 			<HoleInstance holeNumber={1}
	// 				currentWolf={this.state.golferOne.name}
	// 				golferOne={this.state.golferOne}
	// 				golferTwo={this.state.golferTwo}
	// 				golferThree={this.state.golferThree}
	// 				golferFour={this.state.golferFour}
	// 				rabbitUnit={this.state.rabbitUnit}
	// 				snakeUnit={this.state.snakeUnit}
	// 				betUnit={this.state.betUnit}
	// 				currentHole={this.state.currentHole}/>
	// 			<HoleInstance holeNumber={2}
	// 				currentWolf={this.state.golferTwo.name}
	// 				disabled={true}/>
	// 			<HoleInstance holeNumber={3}
	// 				currentWolf={this.state.golferThree.name}/>
	// 			<HoleInstance holeNumber={4}
	// 				currentWolf={this.state.golferFour.name}/>
	// 			<HoleInstance holeNumber={5}
	// 				currentWolf={this.state.golferOne.name}/>
	// 			<HoleInstance holeNumber={6}
	// 				currentWolf={this.state.golferTwo.name}/>
	// 			<HoleInstance holeNumber={7}
	// 				currentWolf={this.state.golferThree.name}/>
	// 			<HoleInstance holeNumber={8}
	// 				currentWolf={this.state.golferFour.name}/>
	// 			<HoleInstance holeNumber={9}
	// 				currentWolf={this.state.golferOne.name}/>
	// 			<HoleInstance holeNumber={10}
	// 				currentWolf={this.state.golferTwo.name}/>
	// 			<HoleInstance holeNumber={11}
	// 				currentWolf={this.state.golferThree.name}/>
	// 			<HoleInstance holeNumber={12}
	// 				currentWolf={this.state.golferFour.name}/>
	// 			<HoleInstance holeNumber={13}
	// 				currentWolf={this.state.golferOne.name}/>
	// 			<HoleInstance holeNumber={14}
	// 				currentWolf={this.state.golferTwo.name}/>
	// 			<HoleInstance holeNumber={15}
	// 				currentWolf={this.state.golferThree.name}/>
	// 			<HoleInstance holeNumber={16}
	// 				currentWolf={this.state.golferFour.name}/>
	// 			<HoleInstance holeNumber={17}
	// 				/>
	// 			<HoleInstance holeNumber={18}
	// 				/>
	// 		</ScrollView>
	// 	)
	// }

	render() {
		const { params } = this.props.navigation.state;
		const { navigate } = this.props.navigation;
		console.log("SCORECARD PARAMS: ", params)
		return (
			<ScrollView style={styles.scrollView}>
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
						currentWolf: this.state.golferOne.name,
					})}>
					Play Hole {this.state.currentHole}
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
		marginTop: 5,
		marginBottom: 5,
		marginLeft: 25,
		marginRight: 25,
		borderColor: 'white',
		backgroundColor: 'green'
	},
	buttonTextStyle: {
		color: 'white',
	},
})