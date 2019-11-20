import React from 'react';
import { View, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%'
  },
  cancel: {
    position: 'absolute',
    top: 20,
    left: 10
  },
  resume: {
    position: 'absolute',
    bottom: 20,
    right: 20
  }
})

const DisplayScreen = props => {
  const picture = props.navigation.getParam('picture',null);
  const { uri } = picture;
  console.log(picture);
  return(
    <ImageBackground source={{uri}} style={ styles.image }>
      <TouchableOpacity 
        style={ styles.cancel }
        onPress={ () => {
          props.navigation.navigate('Camera');
        }}>
        <AntDesign name='close' size={36} color='#fff'/>
      </TouchableOpacity>
      <TouchableOpacity 
        style={ styles.resume }
        onPress={ () => {
          props.navigation.navigate('Result');
        }}>
        <AntDesign name='rightcircle' size={50} color='#fff'/>
      </TouchableOpacity>
    </ImageBackground>
  );
}

export default DisplayScreen;