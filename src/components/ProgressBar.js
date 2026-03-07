import React from 'react';
import { View, StyleSheet } from 'react-native';

const ProgressBar = ({ progress }) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 1);
  return (
    <View style={styles.container}>
      <View style={[styles.fill, { width: `${clampedProgress * 100}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 8,
    backgroundColor: 'rgba(66, 133, 244, 0.15)',
    borderRadius: 9999,
    overflow: 'hidden',
    shadowColor: '#4285F4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2
  },
  fill: {
    height: '100%',
    backgroundColor: '#4285F4'
  }
});

export default ProgressBar;
