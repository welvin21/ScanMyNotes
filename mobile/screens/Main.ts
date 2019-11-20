import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Camera from './camera/CameraScreen';
import Display from './camera/DisplayScreen';

const stackNavigator = createStackNavigator(
  {
    Camera,
    Display
  },
  { 
    initialRouteName : 'Camera',
    defaultNavigationOptions : {
      headerStyle: {
        display: 'none'
      }
    }
  }
);

const Main = createAppContainer(stackNavigator);

export default Main;