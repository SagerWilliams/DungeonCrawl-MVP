import React from 'react';
import { Text, View } from 'react-native';
import {Button, Overlay, ThemeProvider, Icon, registerCustomIconType, ScrollView} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
registerCustomIconType('font-awesome-5', FontAwesome5);

export default function FloorOverlay(props) {
    return (
        <View>
            <Overlay
                overlayStyle={{
                    height: 200,
                    backgroundColor: '#7c7f8f',
                }}
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
                        Level Up!
                    </Text>
                    <Text style={{
                        color: '#42465e',
                        fontFamily: 'Trebuchet MS',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: 15,
                        textAlign: 'center',
                        margin: 10,
                        fontWeight: 'bold'
                    }}>
                        Choose an attribute to advance:
                    </Text>
                    <ThemeProvider theme={theme} style={{
                    }}>
                        <Button
                        containerStyle={{
                            alignItems: 'center'
                        }}
                        buttonStyle={{
                            backgroundColor: '#42465e',
                            width: 100
                        }}
                        title="Defence"
                        onPress={() => {
                            props.toggleVisible('levelOverlayVisible');
                            props.chooseAttribute('defence');
                        }}
                        />
                        <Button
                        containerStyle={{
                            alignItems: 'center',
                            marginTop: 10
                        }}
                        buttonStyle={{
                            backgroundColor: '#42465e',
                            width: 100
                        }}
                        title="Attack"
                        onPress={() => {
                            props.toggleVisible('levelOverlayVisible');
                            props.chooseAttribute('attack');
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