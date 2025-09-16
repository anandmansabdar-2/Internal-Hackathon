import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    console.log('1. Button pressed. Starting registration process...');

    if (!name || !mobile || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      console.log('2. Validation failed. Exiting.');
      return;
    }

    console.log('2. Validation passed. Attempting network request...');

    try {
      const response = await fetch('https://192.168.31.223:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, mobile, email, password }),
      });

      console.log('3. Network request completed. Checking response...');

      if (response.ok) {
        console.log('4. Response is OK. Registration was successful!');
        Alert.alert('Success', 'Registration successful! You can now log in.');
        router.push('LoginScreen');
        console.log('5. Navigating to LoginScreen.');
      } else {
        const data = await response.json();
        Alert.alert('Error', data.message || 'Registration failed. Please try again.');
        console.log('4. Response failed. Message:', data.message);
      }
    } catch (error) {
      console.log('3. Network request failed. Showing alert.');
      Alert.alert('Error', 'An error occurred. Please check your network connection.');
      console.error('Network or fetch error:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Sign up to get started</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          placeholderTextColor="#999"
          value={mobile}
          onChangeText={setMobile}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Register" onPress={handleRegister} color="#6A5ACD" />
        <TouchableOpacity onPress={() => router.push('LoginScreen')}>
          <Text style={styles.linkText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F9FC',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  input: {
    width: '100%',
    padding: 16,
    backgroundColor: '#F7F9FC',
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 16,
    borderColor: '#E0E0E0',
    borderWidth: 1,
  },
  linkText: {
    color: '#6A5ACD',
    marginTop: 15,
    textAlign: 'center',
  },
});

export default RegisterScreen;