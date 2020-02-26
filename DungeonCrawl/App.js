import React, { Component } from 'react';
import { Platform, Text, View, ScrollView } from 'react-native';
import {Header, Button, Overlay, ThemeProvider, Icon, registerCustomIconType} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
registerCustomIconType('font-awesome-5', FontAwesome5);

import MainHeader from './components/MainHeader.js';
import MainOverlay from './components/MainOverlay.js';
import FloorOverlay from './components/FloorOverlay.js';
import LevelupOverlay from './components/LevelupOverlay.js';
import ItemStatHud from './components/ItemStatHud.js';
import StatHud from './components/StatHud.js';
import Floors from './components/Floors.js';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialIsVisible: true,
      floorOverlayVisible: false,
      levelOverlayVisible: false,
      level: 1,
      xp: 0,
      health: 100,
      defence: 1,
      attack: 1,
      coins: 5,
      potions: 1,
      floors: [1,2,3,4,5,6,7,8,9,10],
      currentFloor: 1,
      rewards: {
        xp: 0,
        health: 0,
        coins: 0,
      },
    };

    this.toggleVisible = this.toggleVisible.bind(this);
    this.selectFloor = this.selectFloor.bind(this);
    this.applyRewards = this.applyRewards.bind(this);
    this.levelUp = this.levelUp.bind(this);
    this.chooseAttribute = this.chooseAttribute.bind(this);
    this.usePotion = this.usePotion.bind(this);
  }

  toggleVisible(toggle) {
    let target = {};
    target[toggle] = !this.state[toggle];
    this.setState(target);
  }

  selectFloor() {
    this.setState({
      rewards: {
        xp: Math.round(Math.random() * 50),
        health: Math.round(Math.random() * 25),
        coins: Math.round(Math.random() * 5),
      },
      currentFloor: this.state.floors[this.state.currentFloor],
    }, () => {
      this.setState({
        floorOverlayVisible: !this.state.floorOverlayVisible,
      });
    });
  }

  applyRewards() {
    this.setState({
      health: this.state.health - this.state.rewards.health,
      xp: this.state.xp + this.state.rewards.xp,
      coins: this.state.coins + this.state.rewards.coins,
      rewards: {
        xp: 0,
        health: 0,
        coins: 0
      }
    }, () => {
      this.levelUp();
    });
  }

  levelUp() {
    if (this.state.xp >= 100) {
      this.setState({
        xp: this.state.xp - 100,
        level: this.state.level + 1,
        levelOverlayVisible: true
      });
    }
  }

  chooseAttribute(attribute) {
    let levelup = {}
    levelup[attribute] = this.state[attribute] + 1;
    console.log(levelup)
    this.setState(levelup, () => {
      console.log(this.state[attribute], levelup)
    });
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
        <FloorOverlay rewards={this.state.rewards} applyRewards={this.applyRewards} visible={this.state.floorOverlayVisible} toggleVisible={this.toggleVisible} />
        <LevelupOverlay chooseAttribute={this.chooseAttribute} visible={this.state.levelOverlayVisible} toggleVisible={this.toggleVisible} />
        <MainHeader toggleVisible={this.toggleVisible} />
        <ItemStatHud coins={this.state.coins} potions={this.state.potions} xp={this.state.xp} usePotion={this.usePotion} />
        <StatHud health={this.state.health} defence={this.state.defence} attack={this.state.attack} level={this.state.level} />
        <Floors selectFloor={this.selectFloor} floors={this.state.floors} currentFloor={this.state.currentFloor} />
      </View>
    );
  }
}
