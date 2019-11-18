import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

import { MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container : {
    backgroundColor: 'transparent',
    flex: 1,
  },
  flipper : {
    position: 'absolute',
    left: 0,
    bottom: 0
  },
  capture: {
    position: 'absolute',
    left: '50%',
    bottom: 0,
    marginLeft: -40,
  }
})

const CameraScreen = () => {
    const [ hasCameraPermission, changeCameraPermission ] = useState(null);
    const [ cameraType, changeCameraType ] = useState(Camera.Constants.Type.back);
    const cameraRef = React.createRef();

    useEffect(() => {
        const askForPermission = async () => {
          const { status } = await Permissions.askAsync(Permissions.CAMERA);
          changeCameraPermission(status === 'granted');
        }
        askForPermission();
    },[]);

    if(!hasCameraPermission){
        return <View/>;
    } else{
        return(
            <View style={{ flex: 1 }}>
            <Camera style={{ flex: 1 }} type={ cameraType } ref={ cameraRef }>
                <View style={ styles.container }>
                  <TouchableOpacity
                      style={ styles.flipper }
                      onPress={() => { changeCameraType(
                          cameraType === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back
                      ) }}
                  >
                      <MaterialCommunityIcons name='camera-party-mode' size={32} color='#fff'/>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={ styles.capture }
                      onPress={async() => {
                        let photo = await cameraRef.current.takePictureAsync();
                        console.log(photo);
                      }}
                  >
                      <Ionicons name='ios-radio-button-on' size={80} color='#fff'/>
                  </TouchableOpacity>
                </View>
            </Camera>
            </View>
        );
    }
}

export default CameraScreen;