import React from 'react';
import { Text, View } from 'react-native';
import {Button, Overlay, ThemeProvider, Icon, registerCustomIconType, ScrollView} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
registerCustomIconType('font-awesome-5', FontAwesome5);

export default function MainOverlay(props) {
    return (
        <View>
            <Overlay
                overlayStyle={{height: 100, backgroundColor: '#7c7f8f'}}
                isVisible={props.visible}
                onBackdropPress={() => props.toggleVisible()}
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
                        Welcome to DungeonCrawl!
                    </Text>
                    <ThemeProvider theme={theme}>
                        <Button
                        buttonStyle={{
                            backgroundColor: '#42465e',
                        }}
                        title="Enter Dungeon"
                        onPress={() => props.toggleVisible()}
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