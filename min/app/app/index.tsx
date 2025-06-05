import { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

import * as Location from 'expo-location';

export default function Index() {
  const webviewRef = useRef<WebView>(null);

  const sendLocationToWeb = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('위치권한을 허용해주세요.');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const message = JSON.stringify({
      type: 'CURRENT_LOCATION',
      payload: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });

    console.log('Sending location to web:', message);
    webviewRef.current?.postMessage(message);
  };

  const handleWebMessage = (event: any) => {
    try {
      const message = JSON.parse(event.nativeEvent.data);
      console.log('Message received from web:', message);

      switch (message.type) {
        case 'GET_CURRENT_LOCATION':
          sendLocationToWeb();
          break;
        default:
          break;
      }
    } catch {
      console.log('Message from web (non-JSON):', event.nativeEvent.data);
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webviewRef}
        source={{ uri: 'http://169.254.141.58:5173/' }}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        onMessage={handleWebMessage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
