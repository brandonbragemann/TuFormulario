import React, { useEffect, useRef } from 'react';
import { FlatList, Text, View } from 'react-native';

const ITEM_HEIGHT = 48;

const QuestionTimeline = ({
  logs = [],
  currentIndex = 0,
  currentQuestionSeconds = 0,
  formatTime,
  styles,
  isStacked = false
}) => {
  const listRef = useRef(null);

  useEffect(() => {
    if (!logs.length || !listRef.current) {
      return;
    }
    try {
      if (currentIndex === 0) {
        listRef.current.scrollToOffset({ offset: 0, animated: true });
      } else {
        listRef.current.scrollToIndex({
          index: currentIndex,
          animated: true,
          viewPosition: 0.35
        });
      }
    } catch {
      // layout might not be ready yet; try again shortly
      setTimeout(() => {
        try {
          if (currentIndex === 0) {
            listRef.current?.scrollToOffset({ offset: 0, animated: true });
          } else {
            listRef.current?.scrollToIndex({
              index: currentIndex,
              animated: true,
              viewPosition: 0.35
            });
          }
        } catch {
          // no-op
        }
      }, 50);
    }
  }, [currentIndex, logs.length]);

  if (!logs.length || !styles) {
    return null;
  }

  const renderItem = ({ item, index }) => {
    const totalSeconds =
      (item?.timeSeconds ?? 0) + (index === currentIndex ? currentQuestionSeconds : 0);
    const timeLabel = totalSeconds > 0 ? formatTime(totalSeconds) : '--:--';
    const status = item?.isCorrect;
    const badgeStyle = [
      styles.timelineBadge,
      status === true && styles.timelineBadgeCorrect,
      status === false && styles.timelineBadgeIncorrect,
      index === currentIndex && styles.timelineBadgeActive
    ].filter(Boolean);

    return (
      <View style={styles.timelineItem}>
        <View style={badgeStyle}>
          <Text style={styles.timelineBadgeText}>{index + 1}</Text>
        </View>
        <Text style={[styles.timelineTime, totalSeconds === 0 && styles.timelineTimeMuted]}>
          {timeLabel}
        </Text>
      </View>
    );
  };

  const getItemLayout = (_, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index
  });

  return (
    <View style={[styles.timelineContainer, isStacked && styles.timelineContainerStacked]}>
      <Text style={styles.timelineTitle}>Tiempo por pregunta</Text>
      <FlatList
        ref={listRef}
        data={logs}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item?.questionId ?? index}`}
        style={styles.timelineList}
        contentContainerStyle={styles.timelineListContent}
        getItemLayout={getItemLayout}
        initialNumToRender={8}
        showsVerticalScrollIndicator={false}
        onScrollToIndexFailed={({ index }) => {
          setTimeout(() => {
            if (index === 0) {
              listRef.current?.scrollToOffset({ offset: 0, animated: true });
            } else {
              listRef.current?.scrollToIndex({
                index,
                animated: true,
                viewPosition: 0.35
              });
            }
          }, 100);
        }}
      />
    </View>
  );
};

export default QuestionTimeline;
