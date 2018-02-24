'use-strict';
import React, { Component } from 'react';
import Button from 'apsl-react-native-button';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Slider,
  FlatList,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import HoleSetup from './HoleSetup';

export class HoleInstance extends Component {
	constructor(props){
		super(props);
	}

	static navigationOptions = ({navigation}) => ({
		title: 'HoleInstance',
		headerTintColor: 'darkgreen',
	})

	render() {
		// const { navigate } = this.props.navigation;
		const {params} = this.props.navigation.state;

		return (
			<Button style={styles.buttonStyle}
				textStyle={styles.buttonTextStyle}
				onPress={() => this.props.navigation.navigate('HoleSetup', {
					golferOne: this.props.navigation.state.params.golferOne,
					golferTwo: this.props.navigation.state.params.golferTwo,
					golferThree: this.props.navigation.state.params.golferThree,
					golferFour: this.props.navigation.state.params.golferFour,


				})}>
					Play hole {this.props.holeNumber}
			</Button>
			)
	}
}

export default withNavigation(HoleInstance);

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
		alignItems: 'center',
	},
})