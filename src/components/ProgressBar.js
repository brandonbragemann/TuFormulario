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
    backgroundColor: '#27304A',
    borderRadius: 9999,
    overflow: 'hidden'
  },
  fill: {
    height: '100%',
    backgroundColor: '#4F46E5'
  }
});

export default ProgressBar;
