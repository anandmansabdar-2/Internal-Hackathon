// app/DashboardScreen.js
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useLocalSearchParams } from 'expo-router'; // Correct hook for parsing params
import { useEffect, useState } from 'react';
import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';

const DashboardScreen = () => {
  const params = useLocalSearchParams();
  const user = JSON.parse(params.user); // Parse the user data back into an object

  const [issueDescription, setIssueDescription] = useState('');
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const { status: imageStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();

      if (imageStatus !== 'granted' || locationStatus !== 'granted') {
        alert('Permission to access media library or location is required!');
      }
    })();
  }, []);

  const pickImage = async () => { /* ...image picker logic... */ };
  const getLocation = async () => { /* ...location logic... */ };
  const handleSubmit = async () => {
    const reportData = {
      user: user,
      description: issueDescription,
      imageUri: image,
      location: location,
    };

    try {
      const response = await fetch('YOUR_BACKEND_API_ENDPOINT', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reportData),
      });

      if (response.ok) {
        alert('Issue reported successfully!');
        setIssueDescription('');
        setImage(null);
      } else {
        alert('Failed to submit issue.');
      }
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome, {user.name}!</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.issueBox}
          placeholder="Describe the civic issue..."
          multiline
          value={issueDescription}
          onChangeText={setIssueDescription}
        />
        <Button title="Add Picture" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={styles.image} />}
        <Button title="Get Location" onPress={getLocation} />
        {location && <Text>Location: {location.latitude}, {location.longitude}</Text>}
        <Button title="Submit Report" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7F9FC',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  issueBox: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    textAlignVertical: 'top',
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 10,
    marginBottom: 10,
    resizeMode: 'contain',
  },
});

export default DashboardScreen;