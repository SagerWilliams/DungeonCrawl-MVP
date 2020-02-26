import React from 'react';
import { Text, View } from 'react-native';
import {Button, Overlay, ThemeProvider, Icon, registerCustomIconType, ScrollView} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
registerCustomIconType('font-awesome-5', FontAwesome5);

export default function FloorOverlay(props) {
    return (
        <View>
            <Overlay
                overlayStyle={{height: 200, backgroundColor: '#7c7f8f'}}
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
                        Floor Results:
                    </Text>
                    <Text style={{
                        color: '#42465e',
                        fontFamily: 'Trebuchet MS',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: 15,
                        margin: 8,
                        fontWeight: 'bold'
                    }}>
                        Damage Taken: {props.rewards.health}
                    </Text>
                    <Text style={{
                        color: '#42465e',
                        fontFamily: 'Trebuchet MS',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: 15,
                        margin: 8,
                        fontWeight: 'bold'
                    }}>
                        XP: {props.rewards.xp}
                    </Text>
                    <Text style={{
                        color: '#42465e',
                        fontFamily: 'Trebuchet MS',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: 15,
                        margin: 8,
                        fontWeight: 'bold'
                    }}>
                        Coins: {props.rewards.coins}
                    </Text>
                    <ThemeProvider theme={theme}>
                        <Button
                        buttonStyle={{
                            backgroundColor: '#42465e',
                        }}
                        title="Close"
                        onPress={() => {
                            props.toggleVisible('floorOverlayVisible');
                            props.applyRewards();
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