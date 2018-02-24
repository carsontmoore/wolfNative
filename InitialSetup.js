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
import { StackNavigator } from 'react-navigation';
import Button from 'apsl-react-native-button';
import GameSetupFourSome from './GameSetupFourSome';
import GameSetupThreeSome from './GameSetupThreeSome';

export default class InitialSetup extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	static navigationOptions = {
		title: 'Setup',
		headerTintColor: 'darkgreen',
	}

	render() {
		const { navigate } = this.props.navigation
		return (
			<View style={styles.container}>
				<Button
					style={styles.buttonStyle}
					textStyle={styles.textStyle}
					onPress={() => navigate('Foursome')}>
					Foursome
				</Button>
				<Text style={styles.welcome}>
					OR
				</Text>
				<Button
					style={styles.buttonStyle}
					textStyle={styles.textStyle}
					onPress={() => navigate('Threesome')}>
					Threesome
				</Button>
			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  welcome: {
  	justifyContent: 'center',
  	alignItems: 'center',
  	alignContent: 'center',
  	color: 'darkgreen',
  	fontFamily: 'Arial',
  	textAlign: 'center',
  	fontSize: 18,
  	fontWeight: 'bold',
  	marginTop: 25
  },
  buttonStyle: {
  	marginTop: 50,
  	marginBottom: 50,
  	marginLeft: 25,
  	marginRight: 25,
  	borderColor: 'white',
  	backgroundColor: 'green'
  },
  textStyle: {
  	color: 'white',
  },
});