import React, { useEffect, useState, useRef } from 'react';
import { View, FlatList, RefreshControl, Alert, Dimensions } from 'react-native';
import API from '../utils/api';
import { Video } from '../types';
import UserStatusHeader from '../components/UserStatusHeader';
import VideoCard from '../components/VideoCard';

import NavBar from '../components/NavBar';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [currentVisibleIndex, setCurrentVisibleIndex] = useState(0);

  const onViewRef = useRef(({ viewableItems }: { viewableItems: any[] }) => {
    // When viewable items change, update the index of currently visible video
    if (viewableItems.length > 0) {
      setCurrentVisibleIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 80 });

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

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchVideos();
    setRefreshing(false);
  };

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
        <UserStatusHeader />
      <FlatList
        data={videos}
        keyExtractor={(item) => item._id}
        pagingEnabled // enables snap to page behavior for one full screen per video
        snapToInterval={SCREEN_HEIGHT} // snaps scroll to screen height
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        renderItem={({ item, index }) => (
          <VideoCard
            id={item._id}
            videoUrl={`${API.defaults.baseURL}${item.videoUrl}`}
            title={item.title}
            thumbnailUrl={item.thumbnailUrl}
            likes={item.likes}
            liked={false}
            onLike={handleLike}
            isActive={index === currentVisibleIndex} // <-- only play video if active
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <NavBar />
    </View>
  );
}
