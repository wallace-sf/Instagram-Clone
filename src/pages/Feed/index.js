import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, Text } from 'react-native';

import LazyImage from '../../components/LazyImage';

import api from '../../services/api';

import {
  Post,
  Header,
  Avatar,
  Name,
  Description,
  Loading,
  Stories,
  AvatarStory,
  AvatarBlock,
  StoryName,
} from './styles';

const Feed = () => {
  const [feed, setFeed] = useState([]);
  const [stories, setStories] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [viewable, setViewable] = useState([]);

  async function loadPage(pageNumber = page, shouldRefresh = false) {
    if (total && pageNumber > total) return;

    setLoading(true);

    const response = await api.get(
      `/feed?_expand=author&_limit=5&_page=${pageNumber}`
    );

    const totalItems = response.headers['x-total-count'];

    setTotal(Math.floor(totalItems / 5));
    setFeed(shouldRefresh ? response.data : [...feed, ...response.data]);
    setPage(pageNumber + 1);
    setLoading(false);
  }

  async function loadStories() {
    const response = await api.get(`/stories?_expand=author&`);

    setStories(response.data);
  }

  async function refreshList() {
    setRefreshing(true);

    await loadPage(1, true);

    setRefreshing(false);
  }

  const handleViewableChanged = useCallback(({ changed }) => {
    setViewable(changed.map(({ item }) => item.id));
  }, []);

  useEffect(() => {
    loadPage();
    loadStories();
  }, []);

  return (
    <View>
      <Stories>
        {stories.length > 0 &&
          stories.map((story) => (
            <AvatarBlock
              key={String(story.id)}
              nameLength={story.author.name.length}
            >
              <AvatarStory source={{ uri: story.author.avatar }} />
              <StoryName>
                {story.author.name.length > 10
                  ? `${story.author.name.substr(0, 10)}...`
                  : story.author.name}
              </StoryName>
            </AvatarBlock>
          ))}
      </Stories>
      <FlatList
        data={feed}
        keyExtractor={(post) => String(post.id)}
        onEndReached={() => loadPage()}
        onEndReachedThreshold={0.1}
        onRefresh={refreshList}
        refreshing={refreshing}
        onViewableItemsChanged={handleViewableChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 20 }}
        ListFooterComponent={loading && <Loading />}
        renderItem={({ item }) => (
          <Post>
            <Header>
              <Avatar source={{ uri: item.author.avatar }} />
              <Name>{item.author.name}</Name>
            </Header>
            <LazyImage
              shouldLoad={viewable.includes(item.id)}
              smallSource={{ uri: item.small }}
              source={{ uri: item.image }}
              aspectRatio={item.aspectRatio}
            />
            <Description>
              <Name>{item.author.name}</Name> {item.description}
            </Description>
          </Post>
        )}
      />
    </View>
  );
};

export default Feed;
