import React from 'react';
import { View } from 'react-native';
import {Header, registerCustomIconType} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
registerCustomIconType('font-awesome-5', FontAwesome5);

import HudItem from './HudItem.js';

export default function StatHud(props) {
    return (
        <View style={{
            zIndex: 1000,
            height: 0,
            position: 'relative',
            bottom: -715,
        }}>
            <Header
                containerStyle={{
                    height: 150,
                    // position: 'relative',
                    // bottom: -655,
                    paddingTop: 0,
                    paddingBottom: 75,
                    backgroundColor: '#42465e',
                    justifyContent: 'space-around',
                }}
                
                centerComponent={
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                    }}>
                        <HudItem name={'heartbeat'} color={'#d64545'} text={props.health} />
                        <HudItem name={'user-alt'} color={'#555ded'} text={props.level} />
                        <HudItem name={'shield-alt'} color={'#555ded'} text={props.defence} />
                        <HudItem name={'fist-raised'} color={'#d64545'} text={props.attack} />
                    </View>
                }
            />
        </View>
    );
}