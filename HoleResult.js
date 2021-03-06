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
import Modal from "react-native-modal";

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
      teamWolfDisabled : false,
      teamSheepDisabled : false,
      teamPigDisabled : false,
      pushBetDisabled : false,
      addRabbitsDisabled : true,
      addSnakesDisabled : true,
      advanceHoleDisabled : true,
      rabbitModalVisible : false,
      snakeModalVisible : false,
      addRabbitGolferOne : false,
      addRabbitGolferTwo : false,
      addRabbitGolferThree : false,
      addRabbitGolferFour : false,
      addSnakeGolferOne : false,
      addSnakeGolferTwo : false,
      addSnakeGolferThree : false,
      addSnakeGolferFour : false,
      isPigSelected: this.props.navigation.state.params.isPigSelected,
      initialWolf : this.props.navigation.state.params.initialWolf
		}
		this.handleWolfWin = this.handleWolfWin.bind(this);
		this.handleSheepWin = this.handleSheepWin.bind(this);
		this.incrementHole = this.incrementHole.bind(this);
		this.updateNextWolf = this.updateNextWolf.bind(this);
    this.resetBetUnit = this.resetBetUnit.bind(this);
    this.handleHolePush = this.handleHolePush.bind(this);
    this.resetHolePushCounter = this.resetHolePushCounter.bind(this);
    this.toggleRabbitModal = this.toggleRabbitModal.bind(this);
    this.toggleSnakeModal = this.toggleSnakeModal.bind(this);
    this.incrementRabbitGolferOne = this.incrementRabbitGolferOne.bind(this);
    this.incrementRabbitGolferTwo = this.incrementRabbitGolferTwo.bind(this);
    this.incrementRabbitGolferThree = this.incrementRabbitGolferThree.bind(this);
    this.incrementRabbitGolferFour = this.incrementRabbitGolferFour.bind(this);
    this.addSnakeGolferOne = this.addSnakeGolferOne.bind(this);
    this.addSnakeGolferTwo = this.addSnakeGolferTwo.bind(this);
    this.addSnakeGolferThree = this.addSnakeGolferThree.bind(this);
    this.addSnakeGolferFour = this.addSnakeGolferFour.bind(this);
    this.handlePigWin = this.handlePigWin.bind(this);
    this.updateWolfifPig = this.updateWolfifPig.bind(this);
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
      golferFour: update(this.state.golferFour, {balance: {$set: golferFourBalance}}),
      teamWolfDisabled: true,
      teamSheepDisabled: true,
      pushBetDisabled: true,
      addRabbitsDisabled: false,
      addSnakesDisabled: false,
      advanceHoleDisabled: false
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
  		golferFour: update(this.state.golferFour, {balance: {$set: golferFourBalance}}),
      teamWolfDisabled : true,
      teamSheepDisabled : true,
      pushBetDisabled : true,
      addRabbitsDisabled : false,
      addSnakesDisabled : false,
      advanceHoleDisabled : false
		})
	}
  handlePigWin() {
    let betUnit = this.state.betUnit;
    let currentWolf = this.state.currentWolf;
    let golferOneBalance = this.state.golferOne.balance;
    let golferTwoBalance = this.state.golferTwo.balance;
    let golferThreeBalance = this.state.golferThree.balance;
    let golferFourBalance = this.state.golferFour.balance;
    if(currentWolf === this.state.golferOne.name) {
      golferOneBalance = golferOneBalance + betUnit*3;
      golferTwoBalance = golferTwoBalance - betUnit;
      golferThreeBalance = golferThreeBalance - betUnit;
      golferFourBalance = golferFourBalance - betUnit;
    }
    if(currentWolf === this.state.golferTwo.name) {
      golferTwoBalance = golferTwoBalance + betUnit*3;
      golferOneBalance = golferOneBalance - betUnit;
      golferThreeBalance = golferThreeBalance - betUnit;
      golferFourBalance = golferFourBalance - betUnit;
    }
    if(currentWolf === this.state.golferThree.name) {
      golferThreeBalance = golferThreeBalance + betUnit*3;
      golferOneBalance = golferOneBalance - betUnit;
      golferTwoBalance = golferTwoBalance - betUnit;
      golferFourBalance = golferFourBalance - betUnit;
    }
    if(currentWolf === this.state.golferFour.name) {
      golferFourBalance = golferFourBalance + betUnit*3;
      golferOneBalance = golferOneBalance - betUnit;
      golferTwoBalance = golferTwoBalance - betUnit;
      golferThreeBalance = golferThreeBalance - betUnit;
    }
    this.setState({
      golferOne: update(this.state.golferOne, {balance: {$set: golferOneBalance}}),
      golferTwo: update(this.state.golferTwo, {balance: {$set: golferTwoBalance}}),
      golferThree: update(this.state.golferThree, {balance: {$set: golferThreeBalance}}),
      golferFour: update(this.state.golferFour, {balance: {$set: golferFourBalance}}),
      teamWolfDisabled: true,
      teamSheepDisabled: true,
      teamPigDisabled: true,
      pushBetDisabled: true,
      addRabbitsDisabled: false,
      addSnakesDisabled: false,
      advanceHoleDisabled: false
    });
  }

  handleHolePush() {
    let betUnit;
    let initialBetUnit = this.state.initialBetUnit;
    let holePushCounter = this.state.holePushCounter;
    holePushCounter = holePushCounter + 1;
    betUnit = initialBetUnit * (holePushCounter+1);
    this.setState({
      betUnit: betUnit,
      holePushCounter: holePushCounter,
      teamWolfDisabled : true,
      teamSheepDisabled : true,
      pushBetDisabled : true,
      addRabbitsDisabled : false,
      addSnakesDisabled : false,
      advanceHoleDisabled : false
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

  updateNextWolf() {
		let newWolf;
		let currentWolf = this.state.currentWolf;
		currentWolf === this.state.golferOne.name ? newWolf = this.state.golferTwo.name : currentWolf === this.state.golferTwo.name ? newWolf = this.state.golferThree.name : currentWolf === this.state.golferThree.name ? newWolf = this.state.golferFour.name : currentWolf === this.state.golferFour.name ? newWolf = this.state.golferOne.name : null ;
		this.setState({currentWolf : newWolf});
	}

  updateWolfifPig() {
    let newWolf;
    let initialWolf = this.state.initialWolf;
    initialWolf === this.state.golferOne.name ? newWolf = this.state.golferTwo.name : initialWolf === this.state.golferTwo.name ? newWolf = this.state.golferThree.name : initialWolf === this.state.golferThree.name ? newWolf = this.state.golferFour.name : initialWolf === this.state.golferFour.name ? newWolf = this.state.golferOne.name : null ;
    this.setState({currentWolf: newWolf});
  }

  toggleRabbitModal() {
    this.setState({rabbitModalVisible : !this.state.rabbitModalVisible});
  }

  toggleSnakeModal() {
    this.setState({snakeModalVisible : !this.state.snakeModalVisible});
  }

  incrementRabbitGolferOne() {
    let rabbitCount = this.state.golferOne.rabbitCount;
    let golfer = this.state.golferOne.name;
    rabbitCount ++ ;
    Alert.alert(
      'Give rabbit to ' +golfer+ ' ?',
      '',
      [
        {text: "Yes", onPress: () => {this.setState({
          golferOne : update(this.state.golferOne, {rabbitCount: {$set: rabbitCount}}),
          addRabbitGolferOne : true
        })}},
        {text: "No"}
      ],
      { cancelable : false }

    )
  }

  incrementRabbitGolferTwo() {
    let rabbitCount = this.state.golferTwo.rabbitCount;
    let golfer = this.state.golferTwo.name;
    rabbitCount ++ ;
    Alert.alert(
      'Give rabbit to ' +golfer+ ' ?',
      '',
      [
        {text: "Yes", onPress: () => {this.setState({
          golferTwo : update(this.state.golferTwo, {rabbitCount: {$set: rabbitCount}}),
          addRabbitGolferTwo : true
        })}},
        {text: "No"}
      ],
      { cancelable : false }
    )
  }

  incrementRabbitGolferThree() {
    let rabbitCount = this.state.golferThree.rabbitCount;
    let golfer = this.state.golferThree.name;
    rabbitCount ++ ;
    Alert.alert(
      'Give rabbit to ' +golfer+ ' ?',
      '',
      [
        {text: "Yes", onPress: () => {this.setState({
          golferThree : update(this.state.golferThree, {rabbitCount: {$set: rabbitCount}}),
          addRabbitGolferThree : true
        })}},
        {text: "No"}
      ],
      { cancelable : false }
    )
  }

  incrementRabbitGolferFour() {
    let rabbitCount = this.state.golferFour.rabbitCount;
    let golfer = this.state.golferFour.name;
    rabbitCount ++ ;
    Alert.alert(
      'Give rabbit to ' +golfer+ ' ?',
      '',
      [
        {text: "Yes", onPress: () => {this.setState({
          golferFour: update(this.state.golferFour, {rabbitCount: {$set: rabbitCount}}),
          addRabbitGolferFour : true
        })}},
        {text: "No"}
      ],
      { cancelable : false }
    )
  }

  addSnakeGolferOne() {
    let snakeCount = this.state.golferOne.snakeCount;
    let golfer = this.state.golferOne.name;
    snakeCount ++ ;
    Alert.alert(
      'Assign snake to ' +golfer+ ' ?',
      '',
      [
        {text: "Yes", onPress: () => {this.setState({
            golferOne: update(this.state.golferOne, {snakeCount: {$set: snakeCount}}),
            addSnakeGolferOne: true,
            addSnakeGolferTwo: true,
            addSnakeGolferThree: true,
            addSnakeGolferFour: true
        })}},
        {text: "No"}
      ],
      { cancelable: false }
    )
  }

  addSnakeGolferTwo() {
    let snakeCount = this.state.golferTwo.snakeCount;
    let golfer = this.state.golferTwo.name;
    snakeCount ++ ;
    Alert.alert(
      'Assign snake to ' +golfer+ ' ?',
      '',
      [
        {text: "Yes", onPress: () => {this.setState({
            golferTwo: update(this.state.golferTwo, {snakeCount: {$set: snakeCount}}),
            addSnakeGolferOne: true,
            addSnakeGolferTwo: true,
            addSnakeGolferThree: true,
            addSnakeGolferFour: true
        })}},
        {text: "No"}
      ],
      { cancelable: false }
    )
  }

  addSnakeGolferThree() {
    let snakeCount = this.state.golferThree.snakeCount;
    let golfer = this.state.golferThree.name;
    snakeCount ++ ;
    Alert.alert(
      'Assign snake to ' +golfer+ ' ?',
      '',
      [
        {text: "Yes", onPress: () => {this.setState({
            golferThree: update(this.state.golferThree, {snakeCount: {$set: snakeCount}}),
            addSnakeGolferOne: true,
            addSnakeGolferTwo: true,
            addSnakeGolferThree: true,
            addSnakeGolferFour: true
        })}},
        {text: "No"}
      ],
      { cancelable: false }
    )
  }

  addSnakeGolferFour() {
    let snakeCount = this.state.golferFour.snakeCount;
    let golfer = this.state.golferFour.name;
    snakeCount ++ ;
    Alert.alert(
      'Assign snake to ' +golfer+ ' ?',
      '',
      [
        {text: "Yes", onPress: () => {this.setState({
            golferFour: update(this.state.golferFour, {snakeCount: {$set: snakeCount}}),
            addSnakeGolferOne: true,
            addSnakeGolferTwo: true,
            addSnakeGolferThree: true,
            addSnakeGolferFour: true
        })}},
        {text: "No"}
      ],
      { cancelable: false }
    )
  }

	render(){
		const { navigate } = this.props.navigation;
		const { params } = this.props.navigation.state;
		return (
			<View>
        {this.state.isPigSelected ?
          <Button
            style={styles.buttonStyle}
            textStyle={styles.buttonTextStyle}
            isDisabled={this.state.teamPigDisabled}
            disabledStyle={styles.disabledButtonStyle}
            onPress={() => {
              this.handlePigWin(),
              this.incrementHole(),
              this.updateWolfifPig(),
              this.resetBetUnit(),
              this.resetHolePushCounter()
          }}>
            Pig Wins!
          </Button>
          :
          <Button
            style={styles.buttonStyle}
            textStyle={styles.buttonTextStyle}
            ref="wolfWinsButton"
            isDisabled={this.state.teamWolfDisabled}
            disabledStyle={styles.disabledButtonStyle}
            onPress={() => {
              this.handleWolfWin(),
              this.incrementHole(),
              this.updateNextWolf(),
              this.resetBetUnit(),
              this.resetHolePushCounter()
          }}>
            Team Wolf Wins!
          </Button>
        }
				<Button
  				style={styles.buttonStyle}
  				textStyle={styles.buttonTextStyle}
  				ref="sheepWinsButtons"
          isDisabled={this.state.teamSheepDisabled}
          disabledStyle={styles.disabledButtonStyle}
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
          isDisabled={this.state.pushBetDisabled}
          disabledStyle={styles.disabledButtonStyle}
          onPress={() => {
            this.handleHolePush(),
            this.incrementHole(),
            this.updateNextWolf()
        }}>
          Push - bet carries over!
        </Button>
				<Button
  				style={styles.buttonStyle}
  				textStyle={styles.buttonTextStyle}
          isDisabled={this.state.addRabbitsDisabled}
          disabledStyle={styles.disabledButtonStyle}
          onPress={() => {
            this.toggleRabbitModal()
        }}>
					Add Rabbits
				</Button>
        <Modal
          isVisible={this.state.rabbitModalVisible}
          backdropColor="black"
          backdropOpacity={.9}>
          <View style={{ flex: 1 }}>
            <Text style={styles.modalText}>Who earned a rabbit?</Text>
            <Button
              style={styles.modalButtonStyle}
              textStyle={styles.buttonTextStyle}
              isDisabled={this.state.addRabbitGolferOne}
              disabledButtonStyle={styles.disabledButtonStyle}
              onPress={() => {
                this.incrementRabbitGolferOne()
              }}>
              {this.state.golferOne.name}
            </Button>
            <Button
              style={styles.modalButtonStyle}
              textStyle={styles.buttonTextStyle}
              isDisabled={this.state.addRabbitGolferTwo}
              disabledButtonStyle={styles.disabledButtonStyle}
              onPress={() => {
                this.incrementRabbitGolferTwo()
              }}>
              {this.state.golferTwo.name}
            </Button>
            <Button
              style={styles.modalButtonStyle}
              textStyle={styles.buttonTextStyle}
              isDisabled={this.state.addRabbitGolferThree}
              disabledButtonStyle={styles.disabledButtonStyle}
              onPress={() => {
                this.incrementRabbitGolferThree()
              }}>
              {this.state.golferThree.name}
            </Button>
            <Button
              style={styles.modalButtonStyle}
              textStyle={styles.buttonTextStyle}
              isDisabled={this.state.addRabbitGolferFour}
              disabledButtonStyle={styles.disabledButtonStyle}
              onPress={() => {
                this.incrementRabbitGolferFour()
              }}>
              {this.state.golferFour.name}
            </Button>
            <Button
              style={styles.closeModalButtonStyle}
              textStyle={styles.buttonTextStyle}
              onPress={() => {
                this.toggleRabbitModal()
            }}>
              Close
            </Button>
          </View>
        </Modal>
				<Button
  				style={styles.buttonStyle}
  				textStyle={styles.buttonTextStyle}
          isDisabled={this.state.addSnakesDisabled}
          disabledStyle={styles.disabledButtonStyle}
          onPress={() => {
            this.toggleSnakeModal()
        }}>
					Add Snakes
				</Button>
        <Modal
          isVisible={this.state.snakeModalVisible}
          backdropColor='black'
          backdropOpacity={.9}>
          <View style={{ flex: 1 }}>
            <Text style={styles.modalText}>Who gets the snake?</Text>
            <Button
              style={styles.modalButtonStyle}
              textStyle={styles.buttonTextStyle}
              isDisabled={this.state.addSnakeGolferOne}
              disabledButtonStyle={styles.disabledButtonStyle}
              onPress={() => {
                this.addSnakeGolferOne()
              }}>
              {this.state.golferOne.name}
            </Button>
            <Button
              style={styles.modalButtonStyle}
              textStyle={styles.buttonTextStyle}
              isDisabled={this.state.addSnakeGolferTwo}
              disabledButtonStyle={styles.disabledButtonStyle}
              onPress={() => {
                this.addSnakeGolferTwo()
              }}>
              {this.state.golferTwo.name}
            </Button>
            <Button
              style={styles.modalButtonStyle}
              textStyle={styles.buttonTextStyle}
              isDisabled={this.state.addSnakeGolferThree}
              disabledButtonStyle={styles.disabledButtonStyle}
              onPress={() => {
                this.addSnakeGolferThree()
              }}>
              {this.state.golferThree.name}
            </Button>
            <Button
              style={styles.modalButtonStyle}
              textStyle={styles.buttonTextStyle}
              isDisabled={this.state.addSnakeGolferFour}
              disabledButtonStyle={styles.disabledButtonStyle}
              onPress={() => {
                this.addSnakeGolferFour()
              }}>
              {this.state.golferFour.name}
            </Button>
            <Button
              style={styles.closeModalButtonStyle}
              textStyle={styles.buttonTextStyle}
              onPress={() => {
                this.toggleSnakeModal()
            }}>
              Close
            </Button>
          </View>
        </Modal>
        {this.state.currentHole <= 18 ?
				<Button
					style={styles.buttonStyle}
					textStyle={styles.buttonTextStyle}
          isDisabled={this.state.advanceHoleDisabled}
          disabledStyle={styles.disabledButtonStyle}
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
        :
        <Button
          style={styles.buttonStyle}
          textStyle={styles.buttonTextStyle}
          isDisabled={this.state.advanceHoleDisabled}
          disabledStyle={styles.disabledButtonStyle}
          onPress={() => {
            navigate('FinalScorecard', {
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
          Final scores!
        </Button>
        }
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
  disabledButtonStyle: {
    backgroundColor: 'darkgrey',
    padding: 5,
    marginTop: 10
},
  modalButtonStyle: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 40,
    marginRight: 40,
    borderColor: 'white',
    backgroundColor: 'green'
  },
  closeModalButtonStyle: {
    marginTop: 40,
    marginBottom: 10,
    marginLeft: 40,
    marginRight: 40,
    borderColor: 'white',
    backgroundColor: 'red'
  },
  modalText: {
    color: 'white',
    padding: 20,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    alignSelf: 'center'
  }
})
