import React, { useEffect, useState } from 'react';
import { View, FlatList, RefreshControl, Alert } from 'react-native';
import API from '../utils/api';
import { Video } from '../types';
import VideoCard from '../components/VideoCard';
import NavBar from '../components/NavBar';

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch videos from backend
  const fetchVideos = async () => {
    try {
      const response = await API.get<Video[]>('/video');
      setVideos(response.data);
    } catch (error) {
      console.error('Failed to fetch videos:', error);
      Alert.alert('Error', 'Failed to load videos');
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Refresh handler for pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchVideos();
    setRefreshing(false);
  };

  // Handle liking a video
  const handleLike = async (id: string) => {
    try {
      await API.post(`/video/${id}/like`);
      setVideos((prev) =>
        prev.map((v) => (v._id === id ? { ...v, likes: v.likes + 1 } : v))
      );
    } catch (err) {
      console.error('Failed to like video', err);
      Alert.alert('Error', 'Could not like the video');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <NavBar />
      <FlatList
        data={videos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <VideoCard
            id={item._id} // <-- pass id here!
            videoUrl={`http://192.168.1.100:5000/api${item.videoUrl}`}

            title={item.title}
            thumbnailUrl={item.thumbnailUrl}
            likes={item.likes}
            liked={false} // Optional, if you track liked status
            onLike={handleLike} // pass handler that accepts id
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}
