import React from 'react';
import { View, Text } from 'react-native';
import {Header, registerCustomIconType} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
registerCustomIconType('font-awesome-5', FontAwesome5);
import * as Progress from 'react-native-progress';

import HudItem from './HudItem.js';

export default function ItemStatHud(props) {
    return (
        <View style={{
            zIndex: 1000,
            height: 0,
            position: 'relative',
            bottom: -666,
            shadowOpacity: 1,
            shadowOffset: {width: 0, height: 1}
        }}>
            <Header
                containerStyle={{
                    height: 55,
                    // position: 'relative',
                    // bottom: -656,
                    paddingTop: 0,
                    // paddingBottom: 75,
                    backgroundColor: '#42465e',
                    justifyContent: 'space-around',
                }}
                
                leftComponent={
                    <HudItem name={'coins'} color={'#e6a825'} text={props.coins} />
                }
                centerComponent={
                    <View>
                        <Text style={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: 15,
                            marginBottom: 5,
                            color: '#e6a825',
                        }}>xp</Text>
                        <Progress.Bar progress={props.xp/props.xpToLevel} width={200} color={'#e6a825'} />
                    </View>
                }
                rightComponent={
                    <HudItem name={'prescription-bottle-alt'} color={'#d64545'} text={props.potions} onPress={() => {props.usePotion()}} />
                }
            />
        </View>
    );
}