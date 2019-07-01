import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Alert } from 'react-native';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: 1,
    }

  }

  componentDidMount() {
    this.initializeGame();
  }

  initializeGame = () => {
    this.setState({
      gameState:
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: 1,
      })
    }

  getWinner = () => {
    const NUM_TILES = 3
    var sum;
    var board = this.state.gameState

    //check rows
    for (var i = 0; i < NUM_TILES; i++) {
      sum = board[i][0] + board[i][1] + board[i][2];
      if (sum === 3) { return 1; }
      else if (sum === -3) { return -1; }
      }

     //check columnss
    for (var i = 0; i < NUM_TILES; i++) {
      sum = board[0][i] + board[1][i] + board[2][i];
      if (sum === 3) { return 1; }
      else if (sum === -3) { return -1; }
      }

    // check diagonals
    sum = board[0][0] + board[1][1] + board[2][2];
    if (sum === 3) { return 1; }
    else if (sum === -3) { return -1; }


    sum = board[2][0] + board[1][1] + board[0][2];
    if (sum === 3) { return 1; }
    else if (sum === -3) { return -1; }

    // if there are no winners
    return 0;
  }

  onTilePress = (row, col) => {
      // don't allow  tiles to change...
      var value = this.state.gameState[row][col];
      if (value !== 0) { return; }

      // get player and set tile
      var currentPlayer = this.state.currentPlayer;
      var board = this.state.gameState.slice();
      board[row][col] = currentPlayer;
      this.setState({gameState: board})

      // switch to next player
      var nextPlayer = (currentPlayer === 1) ? -1 : 1;
      this.setState({currentPlayer: nextPlayer});

      // check for winners
      var winner = this.getWinner();
      var winnerSaying = ["Woohooo!","YYYYYYAAAAAAAAAAAAAAA!!!!!!!!!!!!!", "You crushed it!", "You rule!"];
      if (winner === 1) {
        Alert.alert("X Wins!\n" + winnerSaying[Math.floor(Math.random() * winnerSaying.length)]);
        this.initializeGame();
      } else if (winner === -1) {
        Alert.alert("O Wins!\n" + winnerSaying[Math.floor(Math.random() * winnerSaying.length)]);
        this.initializeGame();
      }

  }

  onNewGamePress = () => {
    this.initializeGame();
  }

  renderIcon = (row, col) => {
    var value = this.state.gameState[row][col];
    switch(value) {
      case 1: return <Icon name="close" style={styles.tileX} />;
      case -1: return <Icon name="circle-outline" style={styles.tileO} />;
      default: return <View />;
    }
  }

  render() {

    return (
      <View style={styles.container}>

        <View style={{flexDirection: "row"}}>
          <TouchableOpacity onPress={() => this.onTilePress(0, 0)} style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}>
            {this.renderIcon(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(0, 1)} style={[styles.tile, { borderTopWidth: 0 }]} >
            {this.renderIcon(0, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(0, 2)} style={[styles.tile, { borderRightWidth: 0, borderTopWidth: 0 }]}>
          {this.renderIcon(0, 2)}
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: "row"}}>
          <TouchableOpacity onPress={() => this.onTilePress(1, 0)} style={[styles.tile, { borderLeftWidth: 0}]}>
          {this.renderIcon(1, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1, 1)} style={styles.tile}>
            {this.renderIcon(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1, 2)} style={[styles.tile, { borderRightWidth: 0 }]}>
            {this.renderIcon(1, 2)}
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: "row"}}>
          <TouchableOpacity onPress={() => this.onTilePress(2, 0)} style={[styles.tile, { borderLeftWidth: 0, borderBottomWidth: 0 }]}>
            {this.renderIcon(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2, 1)} style={[styles.tile, { borderBottomWidth: 0 }]}>
            {this.renderIcon(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2, 2)} style={[styles.tile, { borderRightWidth: 0, borderBottomWidth: 0 }]}>
            {this.renderIcon(2, 2)}
          </TouchableOpacity>
        </View>

        <View style={{paddingTop: 50}} />
        <Button title="New Game" onPress={this.onNewGamePress} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tile: {
    borderWidth: 10,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tileX: {
    color: "red",
    fontSize: 60,
  },

  tileO: {
    color: "green",
    fontSize: 60,
  }

});
