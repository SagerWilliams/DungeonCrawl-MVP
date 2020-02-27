import React from 'react';
import { Text, View } from 'react-native';
import {Button, Overlay, ThemeProvider, Icon, registerCustomIconType, ScrollView} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
registerCustomIconType('font-awesome-5', FontAwesome5);
import * as Progress from 'react-native-progress';

export default function SkillCheckOverlay(props) {
    return (
        <View>
            <Overlay
                overlayStyle={{height: 170, backgroundColor: '#7c7f8f'}}
                isVisible={props.visible}
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
                        fontWeight: 'bold'
                    }}>
                        Skill Check
                    </Text>
                    <Text style={{
                        color: '#42465e',
                        fontFamily: 'Trebuchet MS',
                        width: '50%',
                        fontSize: 32,
                        textAlign: 'center',
                        position: 'absolute',
                        left: '25%',
                        right: '25%',
                        top: 51,
                        zIndex: 10,
                        // fontWeight: 'bold'
                    }}>|   ||   |</Text>
                    <Progress.Bar 
                        style={{
                            marginVertical: 15,
                            marginBottom: 20,
                            backgroundColor: '#545978'
                        }}
                        // indeterminate={true}
                        progress={props.skillCheckPercent}
                        width={315}
                        height={25}
                        borderColor={'#42465e'}
                        borderWidth={2}
                        color={'#d64545'}
                        // unfilledColor={'red'}
                    />
                    <ThemeProvider theme={theme}>
                        <Button
                        buttonStyle={{
                            backgroundColor: '#42465e',
                        }}
                        title="Start/Stop Bar"
                        onPress={() => {
                            props.skillCheck();
                        }}
                        />
                    </ThemeProvider>
                </View>
            </Overlay>
        </View>
    );
}

const theme = {
  Button: {
    titleStyle: {
      fontFamily: 'Trebuchet MS', 
      color: '#e6a825',
    },
  },
}