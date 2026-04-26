import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { jellyfinApi } from '../services/jellyfinApi';

export default function NewsScreen() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      setLoading(true);
      const response = await jellyfinApi.getLatestItems();
      setNews(response.Items || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error loading news:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={news}
        keyExtractor={(item) => item.Id}
        renderItem={({ item }) => (
          <View style={styles.newsItem}>
            <Text>{item.Name}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  newsItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
