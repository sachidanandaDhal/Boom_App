import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { AntDesign } from '@expo/vector-icons';

interface VideoCardProps {
  id: string;
  videoUrl: string;
  title: string;
  thumbnailUrl?: string;
  likes: number;
  liked?: boolean;
  onLike: (id: string) => void;
  isActive: boolean; // new prop
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const VideoCard: React.FC<VideoCardProps> = ({
  id,
  videoUrl,
  title,
  thumbnailUrl,
  likes,
  liked = false,
  onLike,
  isActive,
}) => {
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(liked);
  const [likeCount, setLikeCount] = useState(likes);
  const videoRef = useRef<Video>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.playAsync();
      } else {
        videoRef.current.pauseAsync();
      }
    }
  }, [isActive]);

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
      {thumbnailUrl && !isActive ? (
        <TouchableOpacity disabled>
          <Image source={{ uri: thumbnailUrl }} style={styles.thumbnail} />
          <View style={styles.playOverlay}>
            <Text style={styles.playIcon}>▶️</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.videoWrapper}>
          {loading && (
            <ActivityIndicator
              style={StyleSheet.absoluteFillObject}
              size="large"
              color="#1e90ff"
            />
          )}
          <Video
            ref={videoRef}
            source={{ uri: `http://172.20.10.6:5000/api/video/stream/${id}` }}
            useNativeControls={false}
            resizeMode={ResizeMode.COVER}
            isLooping
            style={styles.video}
            onLoadStart={() => setLoading(true)}
            onLoad={() => setLoading(false)}
            shouldPlay={isActive}
          />
        </View>
      )}

      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <TouchableOpacity onPress={handleLikePress} style={styles.likeButton}>
          <AntDesign
            name={isLiked ? 'heart' : 'hearto'}
            size={20}
            color={isLiked ? 'red' : '#fff'}
          />
          <Text style={styles.likeCount}> {likeCount}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VideoCard;

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT,
    backgroundColor: '#1c1c1e',
    borderRadius: 20,
    overflow: 'hidden',
  },
  videoWrapper: {
    width: '100%',
    height: SCREEN_HEIGHT,
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
    height: SCREEN_HEIGHT,
    resizeMode: 'cover',
  },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
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
    position: 'absolute',
    bottom: 40,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(28,28,30,0.6)',
    borderRadius: 20,
    padding: 10,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#f1f1f1',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#292929',
  },
  likeCount: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 6,
  },
});

