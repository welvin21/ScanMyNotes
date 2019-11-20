import React, { useState, useEffect, createRef, RefObject } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Gallery from 'expo-image-picker';
import { Camera } from 'expo-camera';

import { Ionicons,FontAwesome } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end'
  },
  sider: {
    marginBottom: 20,
  }
})

const CameraScreen = () => {
    const [ hasCameraPermission, changeCameraPermission ] = useState(null);
    const [ cameraType, changeCameraType ] = useState(Camera.Constants.Type.back);
    const cameraRef = createRef<Camera>();

    useEffect(() => {
        const askForPermission = async () => {
          const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
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
                      style={ styles.sider }
                      onPress={() => { changeCameraType(
                          cameraType === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back
                      ) }}>
                      <Ionicons name='md-reverse-camera' size={32} color='#fff'/>
                  </TouchableOpacity>
                  <TouchableOpacity
                      onPress={async() => {
                        const photo = await cameraRef.current.takePictureAsync();
                        console.log(photo.uri);
                      }}
                  >
                      <Ionicons name='ios-radio-button-on' size={80} color='#fff'/>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={ styles.sider }
                      onPress={ ()=> {
                        Gallery.launchImageLibraryAsync({mediaTypes: Gallery.MediaTypeOptions.Images, allowsEditing: true});
                      } }>
                      <FontAwesome name='picture-o' size={32} color='#fff'/>
                  </TouchableOpacity>
                </View>
            </Camera>
            </View>
        );
    }
}

export default CameraScreen;