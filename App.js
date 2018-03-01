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
import RulesView from './RulesView';
import OptionsView from './OptionsView';
import InitialSetup from './InitialSetup';
import GameSetupFourSome from './GameSetupFourSome';
import GameSetupThreeSome from './GameSetupThreeSome';
import Scorecard from './Scorecard';
import HoleSetup from './HoleSetup';
import HoleResult from './HoleResult';


class HomeScreen extends Component {
	static navigationOptions = {
		title: 'Wolf',
		headerTintColor: 'darkgreen',
	}
	render() {
		const { navigate } = this.props.navigation;
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>
					Welcome to the game of Wolf!
				</Text>
				<Text style={styles.subHeader}>
					--- Please read the rules first ---
				</Text>
				<Text style={styles.subHeader}>
					- There are many variations to the game -
				</Text>
				<Button
					style={styles.buttonStyle}
					onPress={() => navigate('Rules')}
					textStyle={styles.textStyle}
				>Game Rules
				</Button>
				<Text style={styles.welcome}>
					OR
				</Text>
				<Button
					style={styles.buttonStyle}
					onPress={() => navigate('InitialSetup')}
					textStyle={styles.textStyle}
				>Get Started
				</Button>
			</View>
		)
	};
}

export const WolfNative = StackNavigator({
	Home: {screen: HomeScreen},
	Rules: {screen: RulesView},
	Options: {screen: OptionsView},
	InitialSetup: {screen: InitialSetup},
	Foursome: {screen: GameSetupFourSome},
	Threesome: {screen: GameSetupThreeSome},
	Scorecard: {screen: Scorecard},
	HoleSetup: {screen: HoleSetup},
	HoleResult: {screen: HoleResult},

});

export default HomeScreen;

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
  	fontSize: 22,
  	fontWeight: 'bold',
  	marginTop: 25
  },
  subHeader: {
  	justifyContent: 'center',
  	alignItems: 'center',
  	alignContent: 'center',
  	color: 'darkgreen',
  	fontFamily: 'Arial',
  	textAlign: 'center',
  	fontSize: 16,
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

AppRegistry.registerComponent('WolfNative', () => WolfNative );