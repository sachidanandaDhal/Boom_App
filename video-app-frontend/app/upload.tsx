import React, { useState } from 'react';
import {
  View,
  TextInput,
  Alert,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import API from '../utils/api';

export default function Upload() {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [uploading, setUploading] = useState(false);

  const pickVideo = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'video/*',
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (!result.canceled && result.assets.length > 0) {
        setFile(result.assets[0]);
      } else {
        Alert.alert('File selection canceled');
      }
    } catch (err) {
      console.error('DocumentPicker Error:', err);
      Alert.alert('Error picking video');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      Alert.alert('Please select a video file first');
      return;
    }

    if (!title.trim()) {
      Alert.alert('Please enter a title');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('video', {
      uri: file.uri,
      name: file.name,
      type: file.mimeType || 'video/mp4',
    } as any);

    try {
      setUploading(true);
      await API.post('/video/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Alert.alert('Upload Successful!');
      setTitle('');
      setFile(null);
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Upload Failed', 'An error occurred during the upload.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Video Title:</Text>
      <TextInput
        placeholder="Enter a title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={pickVideo}>
        <Text style={styles.buttonText}>Pick Video</Text>
      </TouchableOpacity>

      {file && <Text style={styles.fileInfo}>Selected: {file.name}</Text>}

      <TouchableOpacity
        style={[styles.button, (!file || uploading) && styles.buttonDisabled]}
        onPress={handleUpload}
        disabled={!file || uploading}
      >
        {uploading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Upload</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f9fafb',
    justifyContent: 'center',
  },
  label: {
    fontWeight: '700',
    fontSize: 18,
    color: '#222',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.05)',
    elevation: 2,
  },
  fileInfo: {
    marginVertical: 12,
    fontStyle: 'italic',
    color: '#666',
    textAlign: 'center',
  },
  button: {
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  buttonDisabled: {
    backgroundColor: '#a5b4fc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
  },
});
