import React, { Component } from 'react';
import { Platform, Text, View, ScrollView } from 'react-native';
import {Header, Button, Overlay, ThemeProvider, Icon, registerCustomIconType} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
registerCustomIconType('font-awesome-5', FontAwesome5);

import MainHeader from './components/MainHeader.js';
import MainOverlay from './components/MainOverlay.js';
import DeathOverlay from './components/DeathOverlay.js';
import SkillCheckOverlay from './components/SkillCheckOverlay.js';
import FloorOverlay from './components/FloorOverlay.js';
import LevelupOverlay from './components/LevelupOverlay.js';
import ItemStatHud from './components/ItemStatHud.js';
import StatHud from './components/StatHud.js';
import Floors from './components/Floors.js';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialIsVisible: false,
      deathIsVisible: false,
      skillCheckOverlay: false,
      skillCheckOn: false,
      skillCheckTop: true,
      skillCheckPercent: 0,
      skillCheckResult: 0,
      skillCheckHealth: 0,
      floorOverlayVisible: false,
      levelOverlayVisible: false,
      level: 1,
      xpToLevel: 100,
      xp: 0,
      health: 100,
      defense: 1,
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
    this.resetGame = this.resetGame.bind(this);
    this.selectFloor = this.selectFloor.bind(this);
    this.applyRewards = this.applyRewards.bind(this);
    this.levelUp = this.levelUp.bind(this);
    this.chooseAttribute = this.chooseAttribute.bind(this);
    this.usePotion = this.usePotion.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.skillCheck = this.skillCheck.bind(this);
    this.addFloors = this.addFloors.bind(this);
  }

  toggleVisible(toggle) {
    let target = {};
    target[toggle] = !this.state[toggle];
    this.setState(target);
  }
  
  skillCheck() {
    let percentChange = .1;
    this.setState({
      skillCheckOn: !this.state.skillCheckOn
    }, () => {
      if (this.state.skillCheckOn) {
        let interval = setInterval(() => {
          if (!this.state.skillCheckOn) {
            clearInterval(interval);
            return;
          }
          if (this.state.skillCheckTop && this.state.skillCheckPercent <= 1) {
            this.setState({
              skillCheckPercent: this.state.skillCheckPercent+=percentChange
            }, () => {
              if (this.state.skillCheckPercent >= 1) {
                this.setState({
                  skillCheckTop: false
                });
              }
            });
          } else {
            this.setState({
              skillCheckTop: false
            }, () => {
              this.setState({
                skillCheckPercent: this.state.skillCheckPercent-=percentChange
              }, () => {
                if (this.state.skillCheckPercent <= 0) {
                  this.setState({
                    skillCheckTop: true
                  });
                }
              });
            });
          }
        }, 50);
      } else {
        setTimeout(() => {
          this.setState({
            skillCheckOn: false,
            skillCheckResult: 0,
            skillCheckTop: true,
            skillCheckOverlay: false,
          }, () => {
            if (this.state.skillCheckPercent >= .47 && this.state.skillCheckPercent <= .53) {
              this.setState({
                skillCheckPercent: 0,
                skillCheckResult: 2,
                skillCheckHealth: .75
              }, () => {
                this.selectFloor();
                return;
              });
            } else if (this.state.skillCheckPercent >= .33 && this.state.skillCheckPercent < .47 ||
                      this.state.skillCheckPercent > .53 && this.state.skillCheckPercent <= .67) {
              this.setState({
                skillCheckPercent: 0,
                skillCheckResult: 1.75,
                skillCheckHealth: 1.25
              }, () => {
                this.selectFloor();
                return;
              });
            } else if (this.state.skillCheckPercent >= 0 && this.state.skillCheckPercent < .33 ||
                      this.state.skillCheckPercent > .67 && this.state.skillCheckPercent <= 1) {
              this.setState({
                skillCheckPercent: 0,
                skillCheckResult: 1,
                skillCheckHealth: 1.75
              }, () => {
                this.selectFloor();
                return;
              });
            }
          });
          return;
        }, 1000);
      }
    });
  }

  selectFloor() {
    this.setState({
      rewards: {
        xp: Math.ceil(this.state.skillCheckResult * Math.round(Math.random() * 25)),
        health: Math.ceil(this.state.skillCheckHealth * Math.round(Math.random() * 25) + 1 - (this.state.defense)),
        coins: Math.floor(this.state.skillCheckResult * (Math.round(Math.random() * 2) + (this.state.attack / 2))),
      },
      currentFloor: this.state.floors[this.state.currentFloor],
    }, () => {
      if (!(this.state.currentFloor % 10)) {
        this.addFloors();
      }
      this.setState({
        floorOverlayVisible: !this.state.floorOverlayVisible,
      });
    });
  }

  applyRewards() {
    if ((this.state.health - this.state.rewards.health) <= 0) {
      this.gameOver();
      return;
    }
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
    if (this.state.xp >= this.state.xpToLevel) {
      this.setState({
        xpToLevel: this.state.xpToLevel + 75,
        xp: this.state.xp - 100,
        level: this.state.level + 1,
        levelOverlayVisible: true
      });
    }
  }

  chooseAttribute(attribute) {
    let levelup = {}
    levelup[attribute] = this.state[attribute] + 1;
    this.setState(levelup);
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

  addFloors() {
    let newFloors = [];
    for (let i = this.state.floors.length + 1; i < this.state.floors.length + 11; i++) {
      newFloors.push(i);
    }
    this.setState({floors: this.state.floors.concat(newFloors)});
  }

  gameOver() {
    if ((this.state.health - this.state.rewards.health ) <= 0 || this.state.health <= 0) {
      this.toggleVisible('deathIsVisible');
    }
  }

  resetGame() {
    this.setState({
      initialIsVisible: true,
      deathIsVisible: false,
      skillCheckOverlay: false,
      skillCheckOn: false,
      skillCheckTop: true,
      skillCheckPercent: 0,
      skillCheckResult: 0,
      skillCheckHealth: 0,
      floorOverlayVisible: false,
      levelOverlayVisible: false,
      level: 1,
      xpToLevel: 100,
      xp: 0,
      health: 100,
      defense: 1,
      attack: 1,
      coins: 5,
      potions: 1,
      floors: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
      currentFloor: 1,
      rewards: {
        xp: 0,
        health: 0,
        coins: 0,
      },
    });
  }

  render() {
    return (
      <View style={{
        height: '100%',
        backgroundColor: '#7c7f8f',
      }}>
        <MainOverlay visible={this.state.initialIsVisible} toggleVisible={this.toggleVisible} />
        <DeathOverlay visible={this.state.deathIsVisible} resetGame={this.resetGame} />
        <SkillCheckOverlay skillCheck={this.skillCheck} skillCheckPercent={this.state.skillCheckPercent} visible={this.state.skillCheckOverlay} toggleVisible={this.toggleVisible} />
        <FloorOverlay rewards={this.state.rewards} applyRewards={this.applyRewards} visible={this.state.floorOverlayVisible} toggleVisible={this.toggleVisible} />
        <LevelupOverlay chooseAttribute={this.chooseAttribute} visible={this.state.levelOverlayVisible} toggleVisible={this.toggleVisible} />
        <MainHeader toggleVisible={this.toggleVisible} />
        <ItemStatHud xpToLevel={this.state.xpToLevel} coins={this.state.coins} potions={this.state.potions} xp={this.state.xp} usePotion={this.usePotion} />
        <StatHud health={this.state.health} defense={this.state.defense} attack={this.state.attack} level={this.state.level} />
        <Floors toggleVisible={this.toggleVisible} floors={this.state.floors} currentFloor={this.state.currentFloor} />
      </View>
    );
  }
}
