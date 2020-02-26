import React from 'react';
import { Platform, Text, View } from 'react-native';
import {Icon, registerCustomIconType} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
registerCustomIconType('font-awesome-5', FontAwesome5);

export default function HudItem(props) {
    return (
        <View style={{marginHorizontal: 5}}>
            <Text style={{textAlign: 'center', fontFamily: 'Trebuchet MS', fontWeight: 'bold', color: props.color}}>{props.text}</Text>
            <Icon type='font-awesome-5' name={props.name} underlayColor='#42465e' color={props.color} onPress={() => props.onPress()} />
        </View>
    );
}