import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
  SafeAreaView,
} from 'react-native';

type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

// Auth Screen Component
function AuthScreen({ navigation }: { navigation: any }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    // Mock authentication
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.authContainer}>
        <Text style={styles.title}>
          {isLogin ? 'Login' : 'Register'}
        </Text>
        <Text style={styles.subtitle}>Marketplace App</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TouchableOpacity style={styles.button} onPress={handleAuth}>
          <Text style={styles.buttonText}>
            {isLogin ? 'Login' : 'Register'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.switchButton}
          onPress={() => setIsLogin(!isLogin)}
        >
          <Text style={styles.switchText}>
            {isLogin ? 'Need an account? Register' : 'Have an account? Login'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Home Screen Component
function HomeScreen() {
  const [isOnDuty, setIsOnDuty] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.homeContainer}>
        <Text style={styles.title}>Welcome to Marketplace</Text>
        <Text style={styles.subtitle}>Multi-service platform</Text>
        
        <View style={styles.dutyContainer}>
          <Text style={styles.dutyLabel}>Service Provider Status</Text>
          <View style={styles.dutyToggle}>
            <Text style={[styles.dutyStatus, { color: isOnDuty ? '#4CAF50' : '#f44336' }]}>
              {isOnDuty ? 'ON DUTY' : 'OFF DUTY'}
            </Text>
            <Switch
              value={isOnDuty}
              onValueChange={setIsOnDuty}
              trackColor={{ false: '#767577', true: '#4CAF50' }}
              thumbColor={isOnDuty ? '#ffffff' : '#f4f3f4'}
            />
          </View>
        </View>
        
        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>Coming Soon:</Text>
          <Text style={styles.featureItem}>• Service Requests (UrbanClap-style)</Text>
          <Text style={styles.featureItem}>• Gig Marketplace (Fiverr-style)</Text>
          <Text style={styles.featureItem}>• On-demand Services (Uber-style)</Text>
          <Text style={styles.featureItem}>• Real-time Chat & Notifications</Text>
          <Text style={styles.featureItem}>• Payment Integration</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

// Main App Component
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator 
        initialRouteName="Auth"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2196F3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Auth" 
          component={AuthScreen} 
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Marketplace' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  homeContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    color: '#666',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    height: 50,
    backgroundColor: '#2196F3',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchButton: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  switchText: {
    color: '#2196F3',
    fontSize: 16,
  },
  dutyContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dutyLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  dutyToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dutyStatus: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  featuresContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  featureItem: {
    fontSize: 16,
    marginBottom: 8,
    color: '#666',
  },
});
