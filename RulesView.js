'use-strict';
import React, { Component } from 'react';
import {
	Text,
	View,
	StyleSheet,
	ScrollView
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Button from 'apsl-react-native-button';
import OptionsView from './OptionsView';

export default class RulesView extends Component {
	static navigationOptions = {
		title: 'Rules',
		headerTintColor: 'darkgreen'
	}
	render() {
		const { navigate } = this.props.navigation;
		return (
			<ScrollView style={styles.scrollView}>
				<View style={styles.container}>
					<Text style={styles.headerStyle}>
						How to play:
					</Text>
					<Text style={styles.ruleStyle}>
						1. Each hole, the wolf controls the box. Players rotate control based on turn-order determined before the round.
					</Text>
					<Text style={styles.ruleStyle}>
						2. Before the initial drive, the wolf has the option to play as a 'blind wolf' - doing so triples the current bet and forces the wolf to play 3v1.
					</Text>
					<Text style={styles.ruleStyle}>
						3. After the initial drive, the wolf has the option to play as a 'lone wolf' - doing so doubles the bet and forces the wolf to play 3v1.
					</Text>
					<Text style={styles.ruleStyle}>
						4. If the wolf decides not to be blind or lone wolf, the other golfers tee off in turn. After any drive, the wolf may claim that ball (player) as his partner for 2v2 for that hole.
					</Text>
					<Text style={styles.ruleStyle}>
						5. The wolf must claim his partner immediately following that golfer's drive, before another golfer tees off.
					</Text>
					<Text style={styles.ruleStyle}>
						6. If all golfers tee off and the wolf does not partner with the last golfer, he becomes the wolf and plays 3v1, with no bet multiplier.
					</Text>
					<Text style={styles.ruleStyle}>
						7. Low score wins the hole, and the loser(s) pay the bet to winner(s).
					</Text>
					<Button
						style={styles.buttonStyle}
						textStyle={styles.buttonTextStyle}
						onPress={() => navigate('Options')}>Addtional Game Options Explained
					</Button>
				</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	scrollView : {
		flex: 1
	},
	container : {
		flex: 1,
		alignItems: 'stretch'
	},
	textStyle : {
		color: 'darkgreen',
		padding: 10
	},
	ruleStyle : {
		color: 'darkgreen',
		marginLeft: 10,
		marginRight: 10,
		padding: 10
	},
	buttonStyle: {
  	marginTop: 15,
  	marginBottom: 15,
  	marginLeft: 50,
  	marginRight: 50,
  	borderColor: 'white',
  	backgroundColor: 'green'
  },
	buttonTextStyle: {
  	color: 'white',
  },
  headerStyle: {
  	color: 'darkgreen',
  	marginLeft: 10,
  	marginRight: 10,
  	padding: 10,
  	fontWeight: 'bold',
  	fontSize: 18,
  },
})


