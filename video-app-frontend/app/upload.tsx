import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, StyleSheet } from 'react-native';
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
    } as any); // React Native FormData needs 'any' cast for file

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
      <Button title="Pick Video" onPress={pickVideo} />
      {file && <Text style={styles.fileInfo}>Selected: {file.name}</Text>}
      <Button
        title={uploading ? 'Uploading...' : 'Upload'}
        onPress={handleUpload}
        disabled={!file || uploading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 5,
    marginBottom: 10,
  },
  fileInfo: {
    marginVertical: 10,
    color: 'gray',
  },
});
