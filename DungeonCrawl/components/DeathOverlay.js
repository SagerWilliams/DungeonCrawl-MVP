import React from 'react';
import { Text, View } from 'react-native';
import {Button, Overlay, ThemeProvider, Icon, registerCustomIconType, ScrollView} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
registerCustomIconType('font-awesome-5', FontAwesome5);

export default function DeathOverlay(props) {
    return (
        <View>
            <Overlay
                overlayStyle={{height: 220, backgroundColor: '#7c7f8f'}}
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
                        Oh dear, you're dead!
                    </Text>
                    <Icon
                        type='font-awesome-5'
                        name='skull-crossbones'
                        underlayColor='#42465e'
                        color='#e6a825'
                        size={75}
                        iconStyle={{
                            margin: 10,
                            marginBottom: 20
                        }}
                    />
                    <ThemeProvider theme={theme}>
                        <Button
                        buttonStyle={{
                            backgroundColor: '#42465e',
                        }}
                        title="Try again"
                        onPress={() => {
                            props.resetGame();
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