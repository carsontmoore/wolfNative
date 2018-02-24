'use-strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Slider,
 } from 'react-native';
import {
	StackNavigator,
	TabNavigator
} from 'react-navigation';
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
import Modal from 'react-native-simple-modal';

export default class GameSetupThreeSome extends Component {
	constructor(props) {
		super(props);
		this.state = {
			betUnit : 1,
			rabbitUnit: 1,
			snakeUnit: 1,
			golferOne: '',
			golferTwo: '',
			golferThree: '',
			snakeEnabled: false,
			rabbitEnabled: false,
			extraGolfer: false,
			open: false
		}
	}
	static navigationOptions = {
		title: 'Threesome',
		headerTintColor: 'darkgreen'
	}

	render() {
		const { navigate } = this.props.navigation
		return (
			<ScrollView style={styles.scrollView}>
				<Form
					ref="setupForm"
					label="Golfer Names">
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
					<Separator />
					<SwitchField
						label='Include rabbits'
						ref='rabbit_option' />
					<Separator />
					<SwitchField
						label='Include snakes'
						ref='snake_option' />
						<Separator />
					<SwitchField
						label='Bogey Bob / Double-Bogey Dave'
						ref='extra_golfer'
						onValueChange={() => this.setState({open: true})}
					/>
					<Separator />
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
						onValueChange={(betUnit) => this.setState({betUnit: betUnit})}
						onSlidingComplete={(betUnit) => this.setState({betUnit: betUnit}) }  />

					<Text style={styles.textStyle}>
						Set rabbit amount: {this.state.rabbitUnit}
					</Text>
					<Slider
						style={styles.sliderStyle}
						maximumTrackTintColor={'darkgrey'}
						minimumTrackTintColor={'darkgreen'}
						maximumValue={20}
						minimum value={1}
						step={1}
						value={this.state.rabbitUnit}
						onValueChange={(rabbitUnit) => this.setState({rabbitUnit: rabbitUnit})}
						onSlidingComplete={(rabbitUnit) => this.setState({rabbitUnit: rabbitUnit}) }/>

					<Text style={styles.textStyle}>
						Set snake amount: {this.state.snakeUnit}
					</Text>
					<Slider
						style={styles.sliderStyle}
						maximumTrackTintColor={'darkgrey'}
						minimumTrackTintColor={'darkgreen'}
						maximumValue={20}
						minimum value={1}
						step={1}
						value={this.state.snakeUnit}
						onValueChange={(snakeUnit) => this.setState({snakeUnit: snakeUnit})}
						onSlidingComplete={(snakeUnit) => this.setState({snakeUnit: snakeUnit}) }/>
				</Form>
				<Modal
					style={styles.modal}
					open={this.state.open}
					modalDidClose={() => this.setState({open: false})}>
					<View>
						<Text style={styles.modalHeader}>
							Are you sure?
						</Text>
						<Text style={styles.modalText}>
							Enabling Bob or Dave will result in added calculations per hole. Golfers collect for Bob or Dave when partnered together, but also are responsible for paying their debts!
						</Text>
						<Button
							style={styles.modalButton}
							textStyle={styles.modalText}
							onPress={() => this.setState({open: false})}>
							OK
						</Button>
					</View>
				</Modal>
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
	modal : {
		flex: 1,
		alignItems: 'center'
	},
	modalHeader: {
		color: 'darkgreen',
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 10
	},
	modalText: {
		color: 'darkgreen',
		fontSize: 12,
		padding: 5,
		margin: 5
	},
	modalButton: {
		marginLeft: 50,
		marginRight: 50,
		marginTop: 25,
		marginBottom: 25,
		borderColor: 'darkgreen',
		backgroundColor: 'white',
	},
})