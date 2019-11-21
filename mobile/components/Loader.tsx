import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import AnimatedLoader from "react-native-animated-loader";
import * as lottie from '../assets/lottie.json';

const styles = StyleSheet.create({
  lottie: {
    width: 200,
    height: 200
  }
});

const Loader = () => {
  const [ visibility, changeVisibility ] = useState(false);

  useEffect( () => {
    setInterval( () => {
      changeVisibility(!visibility);
    }, 500);
  },[]);

  return (
    <AnimatedLoader
      visible={visibility}
      overlayColor="rgba(255,255,255,0.75)"
      source={lottie}
      animationStyle={styles.lottie}
      speed={1}
    />
  );
  
}

export default Loader;
