
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

interface VideoCardProps {
  id: string;
  videoUrl: string;
  title: string;
  thumbnailUrl?: string;
  likes: number;
  liked?: boolean;
  onLike: (id: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({
  id,
  videoUrl,
  title,
  thumbnailUrl,
  likes,
  liked = false,
  onLike,
}) => {
  const [playVideo, setPlayVideo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(liked);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLikePress = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
    onLike(id);
  };

  return (
    <View style={styles.container}>
      {!playVideo && thumbnailUrl ? (
        <TouchableOpacity onPress={() => setPlayVideo(true)}>
          <Image source={{ uri: thumbnailUrl }} style={styles.thumbnail} />
          <View style={styles.playOverlay}>
            <Text style={styles.playIcon}>▶️</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.videoWrapper}>
          {loading && (
            <ActivityIndicator style={StyleSheet.absoluteFillObject} size="large" color="#1e90ff" />
          )}
          <Video
             source={{ uri: `http://172.20.10.6:5000/api/video/stream/${id}` }}
            useNativeControls
            resizeMode={ResizeMode.COVER}
            shouldPlay
            isLooping
            style={styles.video}
            onLoadStart={() => setLoading(true)}
            onLoad={() => setLoading(false)}
          />
        </View>
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={handleLikePress} style={styles.likeButton}>
          <Text style={[styles.likeText, { color: isLiked ? 'red' : '#fff' }]}>
            ❤️ {likeCount}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VideoCard;

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    backgroundColor: '#111',
    borderRadius: 12,
    overflow: 'hidden',
  },
  videoWrapper: {
    width: '100%',
    height: 300,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  thumbnail: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  playOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  playIcon: {
    fontSize: 48,
    color: 'white',
    opacity: 0.9,
  },
  infoContainer: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  likeButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#1e90ff',
    marginLeft: 8,
  },
  likeText: {
    fontWeight: 'bold',
  },
});
