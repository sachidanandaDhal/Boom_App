import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const users = [
   { id: '1', name: 'You', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: '2', name: 'Alex', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: '3', name: 'Sam', image: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { id: '4', name: 'Rita', image: 'https://randomuser.me/api/portraits/women/12.jpg' },
  { id: '5', name: 'Leo', image: 'https://randomuser.me/api/portraits/men/75.jpg' },
  { id: '11', name: 'You', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: '22', name: 'Alex', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: '33', name: 'Sam', image: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { id: '43', name: 'Rita', image: 'https://randomuser.me/api/portraits/women/12.jpg' },
  { id: '54', name: 'Leo', image: 'https://randomuser.me/api/portraits/men/75.jpg' },
];

export default function UserStatusHeader() {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {users.map((user) => (
          <TouchableOpacity key={user.id} style={styles.statusContainer}>
            <Image source={{ uri: user.image }} style={styles.avatar} />
            <Text style={styles.name} numberOfLines={1}>
              {user.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
    marginTop: 40,
  },
  statusContainer: {
    alignItems: 'center',
    marginRight: 14,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#c13584', // Instagram story ring color
  },
  name: {
    marginTop: 4,
    fontSize: 12,
    color: '#333',
    maxWidth: 60,
    textAlign: 'center',
  },
});
