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
			currentHole: this.props.navigation.state.params.currentHole,
			currentWolf: this.props.navigation.state.params.currentWolf,
			golferOne: this.props.navigation.state.params.golferOne,
			golferTwo: this.props.navigation.state.params.golferTwo,
			golferThree: this.props.navigation.state.params.golferThree,
			golferFour: this.props.navigation.state.params.golferFour,
			betUnit: this.props.navigation.state.params.betUnit,
			rabbitUnit : this.props.navigation.state.params.rabbitUnit,
			snakeUnit: this.props.navigation.state.params.snakeUnit
		}
	}

	static navigationOptions = ({navigation}) => ({
		title: 'Scorecard',
		headerTintColor: 'darkgreen',
	})

	// componentWillReceiveProps(nextProps) {

	// }

	render() {
		const { params } = this.props.navigation.state;
		const { navigate } = this.props.navigation;
		console.log("SCORECARD PARAMS: ", params);
		console.log("SCOREDCARD STATE: ", this.state);
		return (
			<ScrollView style={styles.scrollView}>
				<Text>{this.state.golferOne.name} : {this.state.golferOne.balance}</Text>
				<Text>{this.state.golferTwo.name} : {this.state.golferTwo.balance}</Text>
				<Text>{this.state.golferThree.name} : {this.state.golferThree.balance}</Text>
				<Text>{this.state.golferFour.name} : {this.state.golferFour.balance}</Text>
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