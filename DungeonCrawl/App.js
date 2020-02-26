import React, { Component } from 'react';
import { Platform, Text, View, ScrollView } from 'react-native';
import {Header, Button, Overlay, ThemeProvider, Icon, registerCustomIconType} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
registerCustomIconType('font-awesome-5', FontAwesome5);

import MainHeader from './components/MainHeader.js';
import MainOverlay from './components/MainOverlay.js';
import ItemStatHud from './components/ItemStatHud.js';
import StatHud from './components/StatHud.js';
import Floors from './components/Floors.js';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialIsVisible: true,
      level: 1,
      xp: 0,
      health: 70,
      defence: 1,
      attack: 1,
      coins: 5,
      potions: 1,
      floors: [1,2,3,4,5,6,7,8,9,10],
      currentFloor: 5,
    };

    this.toggleVisible = this.toggleVisible.bind(this);
    this.usePotion = this.usePotion.bind(this);
    this.levelUp = this.levelUp.bind(this);
  }

  toggleVisible() {
    this.setState({initialIsVisible: !this.state.initialIsVisible});
  }

  levelUp() {
    if (this.state.xp >= 100) {
      this.setState({xp: this.state.xp - 100, level: this.state.level + 1})
    }
  }

  usePotion() {
    if (this.state.potions) {
      if (this.state.health > 75) {
        return;
      }
      this.setState({potions: this.state.potions - 1, health: this.state.health + 25});
      return;
    }
    if (this.state.coins >= 10) {
      this.setState({coins: this.state.coins - 10, potions: this.state.potions + 1}, () => {
        this.usePotion();
      });
      return;
    }
  }

  render() {
    return (
      <View style={{
        height: '100%',
        backgroundColor: '#7c7f8f',
      }}>
        <MainOverlay visible={this.state.initialIsVisible} toggleVisible={this.toggleVisible} />
        <MainHeader toggleVisible={this.toggleVisible} />
        <ItemStatHud coins={this.state.coins} potions={this.state.potions} xp={this.state.xp} usePotion={this.usePotion} />
        <StatHud health={this.state.health} defence={this.state.defence} attack={this.state.attack} level={this.state.level} />
        <Floors floors={this.state.floors} currentFloor={this.state.currentFloor} />
      </View>
    );
  }
}
