import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const ResultsDonutChart = ({ correct, incorrect, size = 200, strokeWidth = 18 }) => {
  const { total, correctRatio, incorrectRatio, circumference, radius } = useMemo(() => {
    const totalResponses = correct + incorrect;
    const radiusValue = (size - strokeWidth) / 2;
    const circumferenceValue = 2 * Math.PI * radiusValue;
    return {
      total: totalResponses,
      correctRatio: totalResponses === 0 ? 0 : correct / totalResponses,
      incorrectRatio: totalResponses === 0 ? 0 : incorrect / totalResponses,
      circumference: circumferenceValue,
      radius: radiusValue
    };
  }, [correct, incorrect, size, strokeWidth]);

  const correctStroke = correctRatio * circumference;
  const incorrectStroke = incorrectRatio * circumference;

  return (
    <View style={styles.chartContainer}>
      <View style={{ width: size, height: size }}>
        <Svg width={size} height={size}>
          <Circle
            stroke="#27304A"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            fill="none"
          />
          {correctRatio > 0 && (
            <Circle
              stroke="#22C55E"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={strokeWidth}
              strokeDasharray={`${correctStroke} ${circumference}`}
              strokeDashoffset={circumference * 0.25}
              strokeLinecap="round"
              fill="none"
            />
          )}
          {incorrectRatio > 0 && (
            <Circle
              stroke="#EF4444"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={strokeWidth}
              strokeDasharray={`${incorrectStroke} ${circumference}`}
              strokeDashoffset={circumference * 0.25 - correctStroke}
              strokeLinecap="round"
              fill="none"
            />
          )}
        </Svg>
        <View style={styles.chartCenterContent}>
          <Text style={styles.chartCenterValue}>
            {total === 0 ? '0%' : `${Math.round(correctRatio * 100)}%`}
          </Text>
          <Text style={styles.chartCenterLabel}>aciertos</Text>
        </View>
      </View>
      <View style={styles.legend}>
        <ChartLegendItem color="#22C55E" label={`Aciertos (${correct})`} />
        <ChartLegendItem color="#EF4444" label={`Incorrectos (${incorrect})`} />
      </View>
    </View>
  );
};

const ChartLegendItem = ({ color, label }) => (
  <View style={styles.legendItem}>
    <View style={[styles.legendSwatch, { backgroundColor: color }]} />
    <Text style={styles.legendLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  chartContainer: {
    alignItems: 'center',
    gap: 16
  },
  chartCenterContent: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2
  },
  chartCenterValue: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700'
  },
  chartCenterLabel: {
    color: '#D0D4E4',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  legend: {
    width: '100%',
    gap: 8
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  legendSwatch: {
    width: 12,
    height: 12,
    borderRadius: 9999
  },
  legendLabel: {
    color: '#D0D4E4'
  }
});

export default ResultsDonutChart;
