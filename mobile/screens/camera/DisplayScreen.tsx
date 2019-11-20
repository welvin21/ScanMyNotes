import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex : 1
  },
  image: {
    flex: 1,
    resizeMode: 'cover'
  }
})

const DisplayScreen = () => {
  return(
    <View style={ styles.container }>
      <Image source={{uri : 'https://i.pinimg.com/originals/6e/cf/04/6ecf040fa151ec157342915fdf47e866.jpg'}} style={styles.image} />
    </View>
  );
}

export default DisplayScreen;