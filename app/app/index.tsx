import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Index() {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'http://169.254.157.72:5173/' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
