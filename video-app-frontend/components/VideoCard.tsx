import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Dimensions,
  Share,
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { AntDesign , Feather } from '@expo/vector-icons';
import API from '../utils/api';

interface VideoCardProps {
  id: string;
  videoUrl: string;
  title: string;
  thumbnailUrl?: string;
  likes: number;
  liked?: boolean;
  onLike: (id: string) => void;
  isActive: boolean;
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
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<Video>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        setIsPlaying(true);
        videoRef.current.playAsync();
      } else {
        setIsPlaying(false);
        videoRef.current.pauseAsync();
      }
    }
  }, [isActive]);

  const handleVideoPress = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pauseAsync();
      setIsPlaying(false);
    } else {
      videoRef.current.playAsync();
      setIsPlaying(true);
    }
  };

const handleLikePress = async () => {
  const updatedLike = !isLiked;
  setIsLiked(updatedLike);
  setLikeCount(prev => updatedLike ? prev + 1 : prev - 1);
  onLike(id);

  console.log('🟡 handleLikePress called with ID:', id);
  console.log('🟡 Sending to URL:', `/video/like/${id}`);
  console.log('🟡 Payload:', { liked: updatedLike });

  try {
    const response = await API.post(`/video/like/${id}`, { liked: updatedLike });
    console.log('🟢 Like successful:', response.data);
  } catch (error: any) {
    console.error('🔴 Error liking video:', error.message);
    if (error.response) {
      console.error('🔴 Backend response:', error.response.data);
      console.error('🔴 Status code:', error.response.status);
    }
    // Revert state
    setIsLiked(!updatedLike);
    setLikeCount(prev => updatedLike ? prev - 1 : prev + 1);
  }
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
        <TouchableWithoutFeedback onPress={handleVideoPress}>
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
        </TouchableWithoutFeedback>
      )}

      <View style={styles.actionContainer}>
        <TouchableOpacity onPress={handleLikePress} style={styles.actionButton}>
          <AntDesign
            name={isLiked ? 'heart' : 'hearto'}
            size={28}
            color={isLiked ? 'red' : '#fff'}
          />
          <Text style={styles.actionText}>{likeCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={() => console.log('Comment pressed')}>
          <AntDesign name="message1" size={26} color="#fff" />
          <Text style={styles.actionText}>23</Text>
        </TouchableOpacity>
        <TouchableOpacity
  style={styles.actionButton}
  onPress={async () => {
    try {
      await Share.share({
        message: `Check out this video on Boom App: https://yourapp.com/video/123`, // Replace with real dynamic link
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }}
>
  <Feather name="share-2" size={26} color="#fff" />
  <Text style={styles.actionText}>Share</Text>
</TouchableOpacity>
      </View>
    </View>
  );
};

export default VideoCard;

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT - 50,
    backgroundColor: '#1c1c1e',
    overflow: 'hidden',
    borderBottomWidth: 4,
    borderBottomColor: '#333',
  },
  videoWrapper: {
    width: '100%',
    height: SCREEN_HEIGHT -50,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionContainer: {
  position: 'absolute',
  right: 16,
  bottom: 320,
  alignItems: 'center',
  gap: 24,
},

actionButton: {
  alignItems: 'center',
},

actionText: {
  color: '#fff',
  marginTop: 6,
  fontWeight: '600',
  fontSize: 14,
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

