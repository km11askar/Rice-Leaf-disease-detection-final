


import { StyleSheet,  View, Text,TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://172.20.10.4:5000', // Local server IP (ensure it's reachable from the device)
  headers: {
    'Accept': 'application/json',
  }
});

const DiagnoseScreen = () => {
  const { top } = useSafeAreaInsets();
  const [image, setImage] = useState(null);
  const [diagnosing, setDiagnosing] = useState(false);
  const [result, setResult] = useState(null);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        console.log('Image URI:', result.assets[0].uri); // Log the image URI
        setImage(result.assets[0].uri);
        setResult(null);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
      console.error(error);
    }
  };

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Camera permission is required to take photos');
        return;
      }

      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        console.log('Image URI:', result.assets[0].uri); // Log the image URI
        setImage(result.assets[0].uri);
        setResult(null);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo');
      console.error(error);
    }
  };
  const diagnoseImage = async () => {
    if (!image) return;
    
    setDiagnosing(true);
  
    try {
      // Create FormData object
      const formData = new FormData();
      
      // Get filename from URI
      const filename = image.split('/').pop();
      const fileType = image.split('.').pop();
      
      // Append the file with proper structure
      formData.append('image', {
        uri: image,
        name: filename || 'upload.jpg',
        type: `image/${fileType === 'jpg' ? 'jpeg' : fileType}`,
      });
  
      // Debug logs
      console.log('FormData contents:', {
        uri: image,
        name: filename,
        type: `image/${fileType === 'jpg' ? 'jpeg' : fileType}`
      });
  
      // Make API call with fetch instead of axios
      const response = await fetch('http://172.20.10.4:5000/predict', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Server error');
      }
  
      const data = await response.json();
      setResult({
        disease: data.disease,
        confidence: data.confidence,
        class_index: data.class_index,
        description: getDiseaseDescription(data.disease),
        treatment: getTreatmentRecommendation(data.disease),
        all_predictions: data.all_predictions || {}
      });
    } catch (error) {
      console.error('Full error:', {
        message: error.message,
        stack: error.stack
      });
      Alert.alert('Error', error.message || 'Failed to upload image');
    } finally {
      setDiagnosing(false);
    }
  };
  // Helper functions for disease info
  const getDiseaseDescription = (disease) => {
    const descriptions = {
      'bacterial_leaf_blight': 'Caused by Xanthomonas oryzae bacteria, this disease causes wilting and yellowing of leaves.',
      'brown_spot': 'Fungal disease causing small brown spots on leaves that can coalesce into larger lesions.',
      'healthy': 'Your plant appears to be healthy with no signs of disease.',
      'leaf_blast': 'Fungal disease causing diamond-shaped lesions with gray centers and brown margins.',
      'leaf_scald': 'Bacterial disease causing translucent leaf tips that turn white with reddish-brown margins.',
      'narrow_brown_spot': 'Fungal disease causing narrow, brown, linear lesions on leaves.',
      'neck_blast': 'Fungal infection at the neck of the panicle causing yield loss.',
      'rice_hispa': 'Insect damage caused by rice hispa beetles creating white streaks on leaves.',
      'sheath_blight': 'Fungal disease causing large, oval lesions on leaf sheaths.',
      'tungro': 'Viral disease causing stunting and yellow-orange discoloration of leaves.'
    };
    return descriptions[disease] || 'No additional information available for this diagnosis.';
  };

  const getTreatmentRecommendation = (disease) => {
    const treatments = {
      'bacterial_leaf_blight': 'Use bactericides and resistant varieties. Practice field sanitation.',
      'brown_spot': 'Apply fungicides. Improve soil nutrition with silicon and potassium.',
      'healthy': 'Continue good agricultural practices. Monitor regularly for early signs of disease.',
      'leaf_blast': 'Use resistant varieties and apply appropriate fungicides. Avoid excessive nitrogen.',
      'leaf_scald': 'Use disease-free seeds. Apply copper-based bactericides.',
      'narrow_brown_spot': 'Apply fungicides. Ensure proper field drainage and nutrition.',
      'neck_blast': 'Apply fungicides at booting stage. Use resistant varieties.',
      'rice_hispa': 'Apply appropriate insecticides. Remove alternate hosts near fields.',
      'sheath_blight': 'Use fungicides. Maintain proper plant spacing for air circulation.',
      'tungro': 'Control green leafhopper vectors. Use resistant varieties and rogue infected plants.'
    };
    return treatments[disease] || 'Consult with an agricultural expert for specific treatment recommendations.';
  };

  return (
    <View style={[styles.container, { paddingTop: top > 0 ? top + 5 : 30 }]}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Diagnose Plant Disease</Text>
        <Text style={styles.headerSubtitle}>Upload a photo to identify plant diseases</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.imageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <View style={styles.placeholderContainer}>
              <Text style={{ fontSize: 42 }}>🌿</Text>
              <Text style={styles.placeholderText}>Select or take a photo of the plant</Text>
            </View>
          )}
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Choose from Gallery</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Text style={styles.buttonText}>Take a Photo</Text>
          </TouchableOpacity>
        </View>

        {image && (
          <TouchableOpacity 
            style={[styles.diagnoseButton, diagnosing && styles.disabledButton]} 
            onPress={diagnoseImage}
            disabled={diagnosing}
          >
            <Text style={styles.diagnoseButtonText}>
              {diagnosing ? 'Analyzing...' : 'Analyze Disease'}
            </Text>
          </TouchableOpacity>
        )}

        {result && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Diagnosis Result</Text>
            <Text style={styles.diseaseName}>
              {result.disease.split('_').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
            </Text>
            <Text style={styles.confidenceText}>
              Confidence: {result.confidence ? result.confidence.toFixed(2) + '%' : 'N/A'}
            </Text>
            
            <Text style={styles.sectionTitle}>Description:</Text>
            <Text style={styles.descriptionText}>{result.description}</Text>
            
            <Text style={styles.sectionTitle}>Recommended Treatment:</Text>
            <Text style={styles.descriptionText}>{result.treatment}</Text>
            
            {result.all_predictions && (
              <>
                <Text style={styles.sectionTitle}>All Predictions:</Text>
                {Object.entries(result.all_predictions).map(([disease, confidence]) => (
                  <View key={disease} style={styles.predictionRow}>
                    <Text style={styles.predictionName}>
                      {disease.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}:
                    </Text>
                    <Text style={styles.predictionValue}>
                      {(confidence * 100).toFixed(2)}%
                    </Text>
                  </View>
                ))}
              </>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#494949',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#7C7C7C',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    height: 250,
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderContainer: {
    alignItems: 'center',
    padding: 20,
  },
  placeholderText: {
    fontSize: 16,
    color: '#7C7C7C',
    textAlign: 'center',
    marginTop: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#F0F0F0',
    padding: 15,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#494949',
  },
  diagnoseButton: {
    backgroundColor: '#00c26f',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 25,
  },
  disabledButton: {
    backgroundColor: '#97e1be',
  },
  diagnoseButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  resultContainer: {
    backgroundColor: '#F9F9F9',
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#494949',
    marginBottom: 10,
    textAlign: 'center',
  },
  diseaseName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00c26f',
    marginBottom: 5,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  confidenceText: {
    fontSize: 16,
    color: '#7C7C7C',
    textAlign: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#494949',
    marginBottom: 5,
    marginTop: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: '#494949',
    lineHeight: 20,
    marginBottom: 5,
  },
  predictionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  predictionName: {
    fontSize: 14,
    color: '#494949',
    flex: 2,
  },
  predictionValue: {
    fontSize: 14,
    color: '#7C7C7C',
    flex: 1,
    textAlign: 'right',
  }
});

export default DiagnoseScreen;