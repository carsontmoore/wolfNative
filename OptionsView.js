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

export default class Options extends Component {
	static navigationOptions = {
		title: 'Additional Game Options',
		headerTintColor: 'darkgreen'
	}

	render() {
		return (
			<ScrollView style={styles.scrollView}>
				<View style={styles.container}>
					<Text style={styles.headerStyle}>
						Rabbits :
					</Text>
					<Text style={styles.ruleStyle}>
						A rabbit is given to any player on any hole whenever a putt is holed from outside an agreed upon distance - typically the length of the flagstick.
					</Text>
					<Text style={styles.ruleStyle}>
						Rabbits are tallied at the end of the round. One rabbit equates to one unit owed to the golfer from the others.
					</Text>
					<Text style={styles.headerStyle}>
						Snakes :
					</Text>
					<Text style={styles.ruleStyle}>
						Simply, a snake is any 3 putt from on the putting surface. This means that if a golfer elected to putt off the fringe and 3-putted, he would not be given a snake.
					</Text>
					<Text style={styles.ruleStyle}>
						There can never be more than one snake assigned per hole. To determine who takes the responsibility in the event of multiple golfers 3-putting on the same green, the snake is given to the player who was closest to the hole prior to his first putt.
					</Text>
					<Text style={styles.headerStyle}>
						Pig:
					</Text>
					<Text style={styles.ruleStyle}>
						Any golfer who is chosen by the wolf as his partner has the option to "pig" the wolf. The pig is now the wolf (1v3) for that hole, and the bet is doubled.
					</Text>
					<Text style={styles.headerStyle}>
						Bogey Bob / Double-Bogey Dave :
					</Text>
					<Text style={styles.ruleStyle}>
						Wolf can be adapted to play with 3 players with the addition of Bogey Bob or Double-bogey Dave. Before beginning play, your group should choose which fictional golfer (score) to add to each hole for the entire round. Partners of Bob / Dave are responsible for their debt on each hole, and by the same token will collect extra if their team wins the hole.
					</Text>
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
	ruleStyle : {
		color: 'darkgreen',
		marginLeft: 20,
		marginRight: 10,
		padding: 2
	},
	headerStyle : {
		color: 'darkgreen',
		marginLeft: 10,
		marginRight: 10,
		fontWeight: 'bold',
		fontSize: 18,
		padding: 5
	},

})