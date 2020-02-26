import React, { Component } from 'react';
import { Platform, Text, View } from 'react-native';
import {Header, Button, Overlay, ThemeProvider, Icon, registerCustomIconType} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
registerCustomIconType('font-awesome-5', FontAwesome5);

import HudItem from './components/HudItem.js';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialIsVisible: true,
      health: 100,
      defence: 1,
      attack: 1,
      coins: 5,
    };
  }
  render() {
    return (
      <View style={{
        height: '100%',
        backgroundColor: '#e9e9f2',
      }}>
        <Overlay
          overlayStyle={{height: 100, backgroundColor: '#e9e9f2'}}
          isVisible={this.state.initialIsVisible}
          onBackdropPress={() => this.setState({ initialIsVisible: false })}
        >
          <View>
            <Text style={{
              color: '#42465e',
              fontFamily: 'Trebuchet MS',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 20,
              textAlign: 'center',
              margin: 10,
            }}>
              Welcome to DungeonCrawl!
            </Text>
            <ThemeProvider theme={theme}>
              <Button
                buttonStyle={{
                  backgroundColor: '#42465e',
                }}
                title="Enter Dungeon"
                onPress={() => this.setState({ initialIsVisible: false })}
              />
            </ThemeProvider>
          </View>
        </Overlay>
        <Header
          containerStyle={{
            // height: 125,
            backgroundColor: '#42465e',
            justifyContent: 'space-around',
          }}
          
          // leftComponent={}
          centerComponent={{ text: 'DungeonCrawl', style: { fontFamily: 'Trebuchet MS', color: '#e6a825', fontSize: 25, fontWeight: 'bold'},  }}
          rightComponent={<Icon type='font-awesome-5' name='dungeon' underlayColor='#42465e' color='#7c7f8f' onPress={() => {this.setState({ initialIsVisible: true })}} />}
        />
        <Header
          containerStyle={{
            height: 50,
            position: 'relative',
            top: -1,
            paddingTop: 0,
            backgroundColor: '#42465e',
            justifyContent: 'space-around',
          }}
          
          // leftComponent={}
          centerComponent={
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
              <HudItem name={'heartbeat'} color={'#d64545'} text={this.state.health} />
              <HudItem name={'shield-alt'} color={'#555ded'} text={this.state.defence} />
              <HudItem name={'fist-raised'} color={'#d64545'} text={this.state.attack} />
              <HudItem name={'coins'} color={'#e6a825'} text={this.state.coins} />
            </View>
          }
          // rightComponent={}
        />
      </View>
    );
  }
}

const theme = {
  Button: {
    titleStyle: {
      fontFamily: 'Trebuchet MS', 
      color: '#e6a825',
    },
  },
}