import { Dimensions, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useToast } from './components/Toast/ToastProvider';
import { ToastProvder } from './components/Toast/ToastProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider style={{ paddingTop: StatusBar.currentHeight, backgroundColor: "#FFF" }}>
      <ToastProvder duration={2000}>
        <AppWrapper />
      </ToastProvder>
    </SafeAreaProvider>
  );
}

const AppWrapper = () => {
  const { showToast } = useToast();
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", height: "100%", width: Dimensions.get("screen").width }}>
      <View style={{ width: 100, justifyContent: "space-between", height: 200 }}>
        <TouchableOpacity style={[styles.button, { backgroundColor: "#28A745" }]} onPress={() => showToast("This is success", "success")}>
          <Text style={styles.buttonText}>Success</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: "#17A2B8" }]} onPress={() => showToast("This is info", "info")}>
          <Text style={styles.buttonText}>Info</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: "#DC3545" }]} onPress={() => showToast("This is error", "error")}>
          <Text style={styles.buttonText}>Error</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: "#FFC107" }]} onPress={() => showToast("This is warning", "warning")}>
          <Text style={[styles.buttonText, { color: "#000" }]}>Warning</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: "90%",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFF",
  }
});
