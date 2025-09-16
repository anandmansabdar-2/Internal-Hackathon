import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const DashboardScreen = () => {
  const params = useLocalSearchParams();
  const user = JSON.parse(params.user);
  
  const [issueDescription, setIssueDescription] = useState('');
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState('Get Location');

  useEffect(() => {
    // Request permissions on component mount
    (async () => {
      const { status: imageStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
  
      if (imageStatus !== 'granted') {
        Alert.alert('Permission required', 'Permission to access media library is required to add photos!');
      }
      if (locationStatus !== 'granted') {
        Alert.alert('Permission required', 'Permission to access location is required to get your location!');
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const getLocation = async () => {
    try {
      setLocationName('Getting location...');
      let loc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
      const geocode = await Location.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude
      });
      setLocationName(geocode[0].city || "Location Found");
    } catch (error) {
      setLocationName('Get Location');
      Alert.alert('Error', 'Could not get location. Please try again.');
    }
  };

  const handleSubmit = async () => {
    if (!issueDescription || !image || !location) {
        Alert.alert("Error", "Please fill in all details (description, photo, and location).");
        return;
    }
    
    // Prepare data and send to backend
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
        Alert.alert('Success', 'Issue reported successfully!');
        setIssueDescription('');
        setImage(null);
        setLocation(null);
        setLocationName('Get Location');
      } else {
        Alert.alert('Error', 'Failed to submit issue.');
      }
    } catch (error) {
      console.error('Error submitting report:', error);
      Alert.alert('Error', 'An error occurred. Please try again.');
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
        
        <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Add Picture</Text>
        </TouchableOpacity>
        {image && <Image source={{ uri: image }} style={styles.image} />}
        
        <TouchableOpacity style={styles.button} onPress={getLocation}>
            <Text style={styles.buttonText}>{locationName}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit Report</Text>
        </TouchableOpacity>
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
  button: {
    backgroundColor: '#6A5ACD',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 10,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  submitButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DashboardScreen;