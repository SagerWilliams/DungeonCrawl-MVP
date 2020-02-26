import React from 'react';
import { View } from 'react-native';
import {Header, Icon, registerCustomIconType, Image} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
registerCustomIconType('font-awesome-5', FontAwesome5);
import logoBanner from '../logoBanner.png';

export default function MainHeader(props) {
    return (
        <View style={{
            zIndex: 1000,
            shadowOpacity: 1,
            shadowOffset: {width: 0, height: 1}
        }}>
            <Header
                containerStyle={{
                    height: 100,
                    backgroundColor: '#42465e',
                    justifyContent: 'space-around',
                    borderBottomWidth: 0,
                }}
                // leftComponent={}
                centerComponent={<Image
                    source={logoBanner}
                    style={{ width: 255, height: 50 }}
                />}
                rightComponent={<Icon type='font-awesome-5' name='dungeon' underlayColor='#42465e' color='#7c7f8f' onPress={() => {props.toggleVisible()}} />}
            />
        </View>
    );
}