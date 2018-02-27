'use-strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Slider,
  TextInput,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Button from 'apsl-react-native-button';
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
import Scorecard from './Scorecard';
import update from 'immutability-helper';


export default class GameSetupFourSome extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formData : {},
			betUnit : this.betUnit,
			rabbitUnit: this.rabbitUnit,
			snakeUnit: this.snakeUnit,
			golferOne: {name:'', balance:0, rabbitCount:0, snakeCount:0},
			golferTwo: {name:'', balance:0, rabbitCount:0, snakeCount:0},
			golferThree: {name:'', balance:0, rabbitCount:0, snakeCount:0},
			golferFour: {name: '', balance:0, rabbitCount:0, snakeCount:0},
			initialBetUnit: this.betUnit
		};
		this.handleFormChange = this.handleFormChange.bind(this);
		this.handleFormFocus = this.handleFormFocus.bind(this);
	}

	static navigationOptions = {
		title: 'Foursome',
		headerTintColor: 'darkgreen',
	}

	handleFormChange(formData) {
		let firstName = formData.golferOneName;
		let secondName = formData.golferTwoName;
		let thirdName = formData.golferThreeName;
		let fourthName = formData.golferFourName;
		this.setState({
			formData : formData,
			golferOne: update(this.state.golferOne, {name: {$set: firstName}}),
			golferTwo: update(this.state.golferTwo, {name: {$set: secondName}}),
			golferThree: update(this.state.golferThree, {name: {$set: thirdName}}),
			golferFour: update(this.state.golferFour, {name: {$set: fourthName}})
		});
		this.props.onFormChange && this.props.onFormChange(formData);
	}

	handleFormFocus(e, component) {
  }

	render() {
		const { navigate } = this.props.navigation;
		return (
			<ScrollView style={styles.scrollView}>
				<Form
					ref="setupForm"
					label="Golfer Names"
					onFocus={this.handleFormFocus}
					onChange={this.handleFormChange}>
					<Text style={styles.textStyle}>
						Add golfers below:
					</Text>
					<InputField
						ref='golferOneName'
						placeholder='Enter name of golfer 1' />
					<InputField
						ref='golferTwoName'
						placeholder='Enter name of golfer 2' />
					<InputField
						ref='golferThreeName'
						placeholder='Enter name of golfer 3' />
					<InputField
					ref='golferFourName'
					placeholder='Enter name of golfer 4' />
					<Separator />
					<SwitchField
						label='Include rabbits'
						ref='rabbitsIncluded' />
					<Separator />
					<SwitchField
						label='Include snakes'
						ref='snakesIncluded' />
					<Separator />
				</Form>
					<Text style={styles.textStyle}>
						Set betting unit per hole: {this.state.betUnit}
					</Text>
					<Slider
						style={styles.sliderStyle}
						maximumTrackTintColor={'darkgrey'}
						minimumTrackTintColor={'darkgreen'}
						maximumValue={20}
						minimum value={1}
						step={1}
						value={this.state.betUnit}
						onValueChange={(betUnit) => this.setState({
							betUnit: betUnit,
							initialBetUnit: betUnit
						})}
						onSlidingComplete={(betUnit) => this.setState({
							betUnit: betUnit,
							initialBetUnit: betUnit
						}) }  />
					{ this.state.formData.rabbitsIncluded ?
						<Text style={styles.textStyle}> Set rabbit amount: {this.state.rabbitUnit}</Text> :
						<Text style={styles.disabledSliderTextStyle}>Set rabbit amount:</Text>
					}
					<Slider
						style={styles.sliderStyle}
						disabled={!this.state.formData.rabbitsIncluded}
						maximumTrackTintColor={'darkgrey'}
						minimumTrackTintColor={'darkgreen'}
						maximumValue={20}
						minimum value={1}
						step={1}
						value={this.state.rabbitUnit}
						onValueChange={(rabbitUnit) => this.setState({rabbitUnit: rabbitUnit})}
						onSlidingComplete={(rabbitUnit) => this.setState({rabbitUnit: rabbitUnit}) }/>
					{ this.state.formData.snakesIncluded ?
						<Text style={styles.textStyle}> Set snake amount: {this.state.snakeUnit}</Text> :
						<Text style={styles.disabledSliderTextStyle}>Set snake amount:</Text>
					}
					<Slider
						style={styles.sliderStyle}
						disabled={!this.state.formData.snakesIncluded}
						maximumTrackTintColor={'darkgrey'}
						minimumTrackTintColor={'darkgreen'}
						maximumValue={20}
						minimum value={1}
						step={1}
						value={this.state.snakeUnit}
						onValueChange={(snakeUnit) => this.setState({snakeUnit: snakeUnit})}
						onSlidingComplete={(snakeUnit) => this.setState({snakeUnit: snakeUnit}) }/>
						<TextInput />
						<Button
							style={styles.buttonStyle}
							textStyle={styles.buttonTextStyle}
							onPress={() => navigate('Scorecard', {
								golferOne: this.state.golferOne,
								golferTwo: this.state.golferTwo,
								golferThree: this.state.golferThree,
								golferFour: this.state.golferFour,
								betUnit : this.state.betUnit,
								rabbitUnit: this.state.rabbitUnit,
								snakeUnit: this.state.snakeUnit,
								currentWolf: this.state.golferOne.name,
								currentHole: 1,
								initialBetUnit: this.state.initialBetUnit
							})}>
							Start Round!
						</Button>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	scrollView : {
		flex: 1
	},
	textStyle: {
		color: 'darkgreen',
		padding: 5,
		fontSize: 16,
		fontWeight: 'bold',
		marginTop: 10
	},
	sliderStyle: {
		padding: 5,
		flex: 1,
	},
	disabledSliderTextStyle: {
		color: 'darkgrey',
		padding: 5,
		fontSize: 16,
		marginTop: 10
	},
	buttonStyle: {
  	marginTop: 50,
  	marginBottom: 50,
  	marginLeft: 25,
  	marginRight: 25,
  	borderColor: 'white',
  	backgroundColor: 'green'
  },
  buttonTextStyle: {
  	color: 'white',
  },
})