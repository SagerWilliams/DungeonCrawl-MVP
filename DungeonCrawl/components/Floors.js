import React, { Component } from 'react';
import { Platform, Text, View, ScrollView } from 'react-native';
import {Header, Button, Overlay, ThemeProvider, Icon, registerCustomIconType} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
registerCustomIconType('font-awesome-5', FontAwesome5);

export default function Floors(props) {
    return (
        <View>
            <ScrollView style={{
                height: '75%',
            }}
            contentContainerStyle={{
                alignItems: 'center'
            }}>
                {props.floors.map(floor => {
                    if (floor > props.currentFloor) {
                        return (
                            <Button key={floor}
                            containerStyle={{
                                marginVertical: 15,
                            }}
                            buttonStyle={{
                                height: 150,
                                width: 150,
                                backgroundColor: '#42465e',
                                borderStyle: 'solid',
                                borderWidth: 5,
                                borderColor: '#545978',
                                borderRadius: 20,
                            }}
                            titleStyle={{
                                fontFamily: 'Trebuchet MS',
                                fontWeight: 'bold',
                                color: '#e6a825',
                                textAlign: 'center'
                            }}
                            title={'Floor ' + floor}
                            icon={
                                <Icon
                                    type='font-awesome-5'
                                    name='lock'
                                    underlayColor='#42465e'
                                    color='#e6a825'
                                    iconStyle={{
                                        marginRight: 5
                                    }}
                                />
                            }
                        />
                        );
                    }
                    else if (floor < props.currentFloor) {
                        return (
                            <Button key={floor}
                            containerStyle={{
                                marginVertical: 15,
                            }}
                            buttonStyle={{
                                width: 150,
                                height: 150,
                                backgroundColor: '#42465e',
                                borderStyle: 'solid',
                                borderWidth: 5,
                                borderColor: '#545978',
                                borderRadius: 20,
                            }}
                            titleStyle={{
                                fontFamily: 'Trebuchet MS',
                                fontWeight: 'bold',
                                color: '#e6a825',
                                textAlign: 'center'
                            }}
                            title={'Floor ' + floor}
                            icon={
                                <Icon
                                    type='font-awesome-5'
                                    name='medal'
                                    underlayColor='#42465e'
                                    color='#e6a825'
                                    iconStyle={{
                                        marginRight: 5
                                    }}
                                />
                            }
                        />
                        );
                    }
                    return (
                        <Button key={floor}
                            containerStyle={{
                                marginVertical: 15,
                            }}
                            buttonStyle={{
                                height: 200,
                                width: 200,
                                backgroundColor: '#42465e',
                                borderStyle: 'solid',
                                borderWidth: 5,
                                borderColor: '#545978',
                                borderRadius: 20,
                            }}
                            titleStyle={{
                                fontFamily: 'Trebuchet MS',
                                fontWeight: 'bold',
                                color: '#e6a825',
                                textAlign: 'center'
                            }}
                            title={'Floor ' + floor}
                            icon={
                                <Icon
                                    type='font-awesome-5'
                                    name='map-marker-alt'
                                    underlayColor='#42465e'
                                    color='#e6a825'
                                    iconStyle={{
                                        marginRight: 5
                                    }}
                                />
                            }
                        />
                    );
                })}
            </ScrollView>
        </View>
    );
}