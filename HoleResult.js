'use-strict';
import React, { Component } from 'react';
import {
  Alert,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Slider
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
import update from 'immutability-helper';

export default class HoleResult extends Component {
	constructor(props){
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
			currentWolf : this.props.navigation.state.params.currentWolf,
      initialBetUnit: this.props.navigation.state.params.initialBetUnit,
      holePushCounter: this.props.navigation.state.params.holePushCounter,
			teamWolf : this.props.navigation.state.params.teamWolf,
			teamSheep : this.props.navigation.state.params.teamSheep,
		}
		this.handleWolfWin = this.handleWolfWin.bind(this);
		this.handleSheepWin = this.handleSheepWin.bind(this);
		this.incrementHole = this.incrementHole.bind(this);
		this.updateNextWolf = this.updateNextWolf.bind(this);
    this.resetBetUnit = this.resetBetUnit.bind(this);
    this.handleHolePush = this.handleHolePush.bind(this);
    this.resetHolePushCounter = this.resetHolePushCounter.bind(this);
	}

	static navigationOptions = ({navigation}) => ({
		title: 'HoleResult',
		headerTintColor: 'darkgreen',
		headerTitle: 'Hole Results'
	})

	handleWolfWin() {
		let betUnit = this.state.betUnit;
		let teamWolf = this.state.teamWolf;
		let teamSheep = this.state.teamSheep;
		let golferOneBalance = this.state.golferOne.balance;
		let golferTwoBalance = this.state.golferTwo.balance;
		let golferThreeBalance = this.state.golferThree.balance;
		let golferFourBalance = this.state.golferFour.balance;
    // logic to update golfers' balances for solo wolf win
    if(teamWolf.length === 1) {
      //golferOne is wolf
      if(this.state.currentWolf === this.state.golferOne.name) {
        golferOneBalance = golferOneBalance + betUnit*3;
        golferTwoBalance = golferTwoBalance - betUnit;
        golferThreeBalance = golferThreeBalance - betUnit;
        golferFourBalance = golferFourBalance - betUnit;
      }
      //golferTwo is wolf
      if(this.state.currentWolf === this.state.golferTwo.name) {
        golferTwoBalance = golferTwoBalance + betUnit*3;
        golferOneBalance = golferOneBalance - betUnit;
        golferThreeBalance = golferThreeBalance - betUnit;
        golferFourBalance = golferFourBalance - betUnit;
      }
      //golferThree is wolf
      if(this.state.currentWolf === this.state.golferThree.name) {
        golferThreeBalance = golferThreeBalance + betUnit*3;
        golferOneBalance = golferOneBalance - betUnit;
        golferTwoBalance = golferTwoBalance - betUnit;
        golferFourBalance = golferFourBalance - betUnit;
      }
      //golfeFour is wolf
      if(this.state.currentWolf === this.state.golferFour.name) {
        golferFourBalance = golferFourBalance + betUnit*3;
        golferOneBalance = golferOneBalance - betUnit;
        golferTwoBalance = golferTwoBalance - betUnit;
        golferThreeBalance = golferThreeBalance - betUnit;
      }
    }
    // logic to update golfers' balances for two wolf winners
    if(teamWolf.length === 2) {
      if(teamWolf.includes(this.state.golferOne.name) && teamWolf.includes(this.state.golferTwo.name)) {
        golferOneBalance = golferOneBalance + betUnit;
        golferTwoBalance = golferTwoBalance + betUnit;
        golferThreeBalance = golferThreeBalance - betUnit;
        golferFourBalance = golferFourBalance - betUnit;
      }
      if(teamWolf.includes(this.state.golferOne.name) && teamWolf.includes(this.state.golferThree.name)) {
        golferOneBalance = golferOneBalance + betUnit;
        golferThreeBalance = golferThreeBalance + betUnit;
        golferTwoBalance = golferTwoBalance - betUnit;
        golferFourBalance = golferFourBalance - betUnit;
      }
      if(teamWolf.includes(this.state.golferOne.name) && teamWolf.includes(this.state.golferFour.name)) {
        golferOneBalance = golferOneBalance + betUnit;
        golferFourBalance = golferFourBalance + betUnit;
        golferTwoBalance = golferTwoBalance - betUnit;
        golferThreeBalance = golferThreeBalance - betUnit;
      }
      if(teamWolf.includes(this.state.golferTwo.name) && teamWolf.includes(this.state.golferThree.name)) {
        golferTwoBalance = golferTwoBalance + betUnit;
        golferThreeBalance = golferThreeBalance + betUnit;
        golferOneBalance = golferOneBalance - betUnit;
        golferFourBalance = golferFourBalance - betUnit;
      }
      if(teamWolf.includes(this.state.golferTwo.name) && teamWolf.includes(this.state.golferFour.name)) {
        golferTwoBalance = golferTwoBalance + betUnit;
        golferFourBalance = golferFourBalance + betUnit;
        golferOneBalance = golferOneBalance - betUnit;
        golferThreeBalance = golferThreeBalance - betUnit;
      }
      if(teamWolf.includes(this.state.golferThree.name) && teamWolf.includes(this.state.golferFour.name)) {
        golferThreeBalance = golferThreeBalance + betUnit;
        golferFourBalance = golferFourBalance + betUnit;
        golferOneBalance = golferOneBalance - betUnit;
        golferTwoBalance = golferTwoBalance - betUnit;
      }
    }
    //update state with new balances
    this.setState({
      golferOne: update(this.state.golferOne, {balance: {$set: golferOneBalance}}),
      golferTwo: update(this.state.golferTwo, {balance: {$set: golferTwoBalance}}),
      golferThree: update(this.state.golferThree, {balance: {$set: golferThreeBalance}}),
      golferFour: update(this.state.golferFour, {balance: {$set: golferFourBalance}})
    })
	}

	handleSheepWin() {
		let betUnit = this.state.betUnit;
		let teamWolf = this.state.teamWolf;
		let teamSheep = this.state.teamSheep;
		let golferOneBalance = this.state.golferOne.balance;
		let golferTwoBalance = this.state.golferTwo.balance;
		let golferThreeBalance = this.state.golferThree.balance;
		let golferFourBalance = this.state.golferFour.balance;

    //logic to update balances for teamSheep win with one wolf
    if(teamWolf.length === 1) {
      //wolf is golferOne
      if(this.state.currentWolf === this.state.golferOne.name) {
        golferOneBalance = golferOneBalance - betUnit * 3;
        golferTwoBalance = golferTwoBalance + betUnit;
        golferThreeBalance = golferThreeBalance + betUnit;
        golferFourBalance = golferFourBalance + betUnit;
      }
      //wolf is golferTwo
      if(this.state.currentWolf === this.state.golferTwo.name) {
        golferTwoBalance = golferTwoBalance - betUnit * 3;
        golferOneBalance = golferOneBalance + betUnit;
        golferThreeBalance = golferThreeBalance + betUnit;
        golferFourBalance = golferFourBalance + betUnit;
      }
      //wolf is golferThree
      if(this.state.currentWolf === this.state.golferThree.name) {
        golferThreeBalance = golferThreeBalance - betUnit * 3;
        golferOneBalance = golferOneBalance + betUnit;
        golferTwoBalance = golferTwoBalance + betUnit;
        golferFourBalance = golferFourBalance + betUnit;
      }
      //wolf is golferFour
      if(this.state.currentWolf === this.state.golferFour.name) {
        golferFourBalance = golferFourBalance - betUnit * 3;
        golferOneBalance = golferOneBalance + betUnit;
        golferTwoBalance = golferTwoBalance + betUnit;
        golferThreeBalance = golferThreeBalance + betUnit;
      }
    }
    if(teamSheep.length === 2) {
      if(teamSheep.includes(this.state.golferOne.name) && teamSheep.includes(this.state.golferTwo.name)) {
        golferOneBalance = golferOneBalance + betUnit;
        golferTwoBalance = golferTwoBalance + betUnit;
        golferThreeBalance = golferThreeBalance - betUnit;
        golferFourBalance = golferFourBalance - betUnit;
      }
      if(teamSheep.includes(this.state.golferOne.name) && teamSheep.includes(this.state.golferThree.name)) {
        golferOneBalance = golferOneBalance + betUnit;
        golferThreeBalance = golferThreeBalance + betUnit;
        golferTwoBalance = golferTwoBalance - betUnit;
        golferFourBalance = golferFourBalance - betUnit;
      }
      if(teamSheep.includes(this.state.golferOne.name) && teamSheep.includes(this.state.golferFour.name)) {
        golferOneBalance = golferOneBalance + betUnit;
        golferFourBalance = golferFourBalance + betUnit;
        golferThreeBalance = golferThreeBalance - betUnit;
        golferTwoBalance = golferTwoBalance - betUnit;
      }
      if(teamSheep.includes(this.state.golferTwo.name) && teamSheep.includes(this.state.golferThree.name)) {
        golferTwoBalance = golferTwoBalance + betUnit;
        golferThreeBalance = golferThreeBalance + betUnit;
        golferOneBalance = golferOneBalance - betUnit;
        golferFourBalance = golferFourBalance - betUnit;
      }
      if(teamSheep.includes(this.state.golferTwo.name) && teamSheep.includes(this.state.golferFour.name)) {
        golferTwoBalance = golferTwoBalance + betUnit;
        golferFourBalance = golferFourBalance + betUnit;
        golferThreeBalance = golferThreeBalance - betUnit;
        golferOneBalance = golferOneBalance - betUnit;
      }
      if(teamSheep.includes(this.state.golferThree.name) && teamSheep.includes(this.state.golferFour.name)) {
        golferThreeBalance = golferThreeBalance + betUnit;
        golferFourBalance = golferFourBalance + betUnit;
        golferOneBalance = golferOneBalance - betUnit;
        golferTwoBalance = golferTwoBalance - betUnit;
      }
    }
    //update state with new data
    this.setState({
      golferOne: update(this.state.golferOne, {balance: {$set: golferOneBalance}}),
      golferTwo: update(this.state.golferTwo, {balance: {$set: golferTwoBalance}}),
      golferThree: update(this.state.golferThree, {balance: {$set: golferThreeBalance}}),
  		golferFour: update(this.state.golferFour, {balance: {$set: golferFourBalance}})
		})
	}

  handleHolePush() {
    let betUnit;
    let initialBetUnit = this.state.initialBetUnit;
    let holePushCounter = this.state.holePushCounter;
    holePushCounter = holePushCounter + 1;
    console.log("holePushCounter after increment: ",holePushCounter)
    betUnit = initialBetUnit * (holePushCounter+1);
    console.log("betUnit before setState upadate: ",betUnit)
    this.setState({
      betUnit: betUnit,
      holePushCounter: holePushCounter
    });
  }

  incrementHole() {
    let currentHole = this.state.currentHole;
    currentHole ++ ;
    this.setState({currentHole : currentHole})
  }

  resetBetUnit() {
    let initialBetUnit = this.state.initialBetUnit;
    this.setState({betUnit : initialBetUnit})
  }

  resetHolePushCounter() {
    let holePushCounter = 0;
    this.setState({holePushCounter: holePushCounter});
  }

  checkHoleNumber() {
    let currentHole = this.state.currentHole;
    let balances = [this.state.golferOne.balance, this.state.golferTwo.balance, this.state.golferThree.balance, this.state.golferFour.balance];
    let golfers = [this.state.golferOne, this.state.golferTwo, this.state.golferThree, this.state.golferFour];
    let lastPlace = [];
    let lowestBalance;
    if(currentHole === 17 || currentHole === 18) {
      lowestBalance = Math.min(...balances);
      for(var i = 0; i < golfers.length; i++) {
        let golferName = golfers[i]['name'];
        if(golfers[i]['balance'] === lowestBalance) {
          lastPlace.push(golferName);
        }
      }
      if(lastPlace.length === 1) {
        let loser = lastPlace[0];
        this.setState({currentWolf : loser})
        Alert.alert(
          loser+' is the wolf for the next hole!',
          'Does '+loser+' want to up the stakes?',
          [
            {text: "Ok!"},
          ],
          { cancelable: false }
        )
      }
      if(lastPlace.length === 2) {
        let loserOne = lastPlace[0];
        let loserTwo = lastPlace[1];
        //engage alert / modal to determine wolf for hole 17
        Alert.alert(
          '2 players tied for last!',
          'Please choose the wolf for the next hole:',
          [
            {text: loserOne, onPress: () => this.setState({currentWolf : loserOne})},
            {text: loserTwo, onPress: () => this.setState({currentWolf : loserTwo})},
          ],
          { cancelable: false }
        )
        let loser = this.state.currentWolf;
        Alert.alert(
          loser+' is the wolf for the next hole!',
          'Does '+loser+' want to up the stakes?',
          [
            {text: "Yes - change the bet!", onPress: () => this.setState({openModal : true})},
            {text: "No - the next hole will be worth "+this.state.betUnit, onPress: () => this.setState({openModal : false}), style: 'cancel'}
          ],
          { cancelable: false }
        )
      }
    }
  }

  updateNextWolf() {
		let newWolf;
		let currentWolf = this.state.currentWolf;
		currentWolf === this.state.golferOne.name ? newWolf = this.state.golferTwo.name : currentWolf === this.state.golferTwo.name ? newWolf = this.state.golferThree.name : currentWolf === this.state.golferThree.name ? newWolf = this.state.golferFour.name : currentWolf === this.state.golferFour.name ? newWolf = this.state.golferOne.name : null ;
		this.setState({currentWolf : newWolf})
	}

	render(){
		const { navigate } = this.props.navigation;
		const { params } = this.props.navigation.state;
		console.log("Result state: ", this.state)
		return (
			<View>
				<Button
				style={styles.buttonStyle}
				textStyle={styles.buttonTextStyle}
				ref="wolfWinsButton"
				onPress={() => {
					this.handleWolfWin(),
					this.incrementHole(),
					this.updateNextWolf(),
          this.resetBetUnit(),
          this.resetHolePushCounter()
				}}>
					Team Wolf Wins!
				</Button>
				<Button
				style={styles.buttonStyle}
				textStyle={styles.buttonTextStyle}
				ref="sheepWinsButtons"
				onPress={() => {
					this.handleSheepWin(),
					this.incrementHole(),
          this.updateNextWolf(),
          this.resetBetUnit(),
          this.resetHolePushCounter()
				}}>
					Team Sheep Wins!
				</Button>
        <Button
        style={styles.buttonStyle}
        textStyle={styles.buttonTextStyle}
        onPress={() => {
          this.handleHolePush(),
          this.incrementHole(),
          this.updateNextWolf()
        }}>
          Push - bet carries over!
        </Button>
				<Button
				style={styles.buttonStyle}
				textStyle={styles.buttonTextStyle}>
					Add Rabbits
				</Button>
				<Button
				style={styles.buttonStyle}
				textStyle={styles.buttonTextStyle}>
					Add Snakes
				</Button>
				<Text>{this.state.currentWolf} is the new Wolf!</Text>
        <Text>The starting bet for the next hole is {this.state.betUnit}</Text>
				<Button
					style={styles.buttonStyle}
					textStyle={styles.buttonTextStyle}
					onPress={() => {
						navigate('Scorecard', {
							golferOne: this.state.golferOne,
							golferTwo: this.state.golferTwo,
							golferThree: this.state.golferThree,
							golferFour: this.state.golferFour,
							currentHole: this.state.currentHole,
							currentWolf: this.state.currentWolf,
							betUnit: this.state.betUnit,
							rabbitUnit: this.state.rabbitUnit,
							snakeUnit: this.state.snakeUnit,
							teamSheep: this.state.teamSheep,
							teamWolf:this.state.teamWolf,
              initialBetUnit: this.state.initialBetUnit,
              holePushCounter: this.state.holePushCounter
						})
					}}>
						Advance to hole {this.state.currentHole}
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
