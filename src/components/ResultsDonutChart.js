import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const ResultsDonutChart = ({ correct, incorrect, size = 200, strokeWidth = 18 }) => {
  const { total, correctRatio, incorrectRatio, circumference, radius } = useMemo(() => {
    const safeCorrect = Number.isFinite(correct) ? Math.max(0, correct) : 0;
    const safeIncorrect = Number.isFinite(incorrect) ? Math.max(0, incorrect) : 0;
    const totalResponses = safeCorrect + safeIncorrect;
    const radiusValue = (size - strokeWidth) / 2;
    const circumferenceValue = 2 * Math.PI * radiusValue;

    if (totalResponses <= 0) {
      return {
        total: 0,
        correctRatio: 0,
        incorrectRatio: 0,
        circumference: circumferenceValue,
        radius: radiusValue
      };
    }

    const rawCorrectRatio = safeCorrect / totalResponses;
    const rawIncorrectRatio = safeIncorrect / totalResponses;
    const ratioSum = rawCorrectRatio + rawIncorrectRatio || 1;
    const normalizedCorrect = rawCorrectRatio / ratioSum;
    const normalizedIncorrect = rawIncorrectRatio / ratioSum;
    return {
      total: totalResponses,
      correctRatio: normalizedCorrect,
      incorrectRatio: normalizedIncorrect,
      circumference: circumferenceValue,
      radius: radiusValue
    };
  }, [correct, incorrect, size, strokeWidth]);

  const correctStroke = correctRatio * circumference;
  const incorrectStroke = incorrectRatio * circumference;
  const correctPercent = total === 0 ? 0 : Math.round(correctRatio * 100);
  const incorrectPercent = total === 0 ? 0 : 100 - correctPercent;
  const shouldRenderCorrect = total > 0 && correctRatio > 0;
  const shouldRenderIncorrect = total > 0 && incorrectRatio > 0;
  const startOffset = circumference * 0.25;
  const normalizeOffset = (value) => {
    if (circumference === 0) return 0;
    const normalized = value % circumference;
    return normalized < 0 ? normalized + circumference : normalized;
  };
  const correctOffset = normalizeOffset(startOffset);
  const incorrectOffset = normalizeOffset(startOffset - correctStroke);

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
          {shouldRenderCorrect && (
            <Circle
              stroke="#22C55E"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={strokeWidth}
              strokeDasharray={`${correctStroke} ${circumference - correctStroke}`}
              strokeDashoffset={correctOffset}
              strokeLinecap="round"
              fill="none"
            />
          )}
          {shouldRenderIncorrect && (
            <Circle
              stroke="#EF4444"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={strokeWidth}
              strokeDasharray={`${incorrectStroke} ${circumference - incorrectStroke}`}
              strokeDashoffset={incorrectOffset}
              strokeLinecap="round"
              fill="none"
            />
          )}
        </Svg>
        <View style={styles.chartCenterContent}>
          <Text style={styles.chartCenterValue}>
            {total === 0 ? '0%' : `${correctPercent}%`}
          </Text>
          <Text style={styles.chartCenterLabel}>aciertos</Text>
        </View>
      </View>
      <View style={styles.legend}>
        <ChartLegendItem color="#22C55E" label="Aciertos" count={correct} percent={correctPercent} />
        <ChartLegendItem
          color="#EF4444"
          label="Incorrectos"
          count={incorrect}
          percent={incorrectPercent}
        />
      </View>
    </View>
  );
};

const ChartLegendItem = ({ color, label, count, percent }) => (
  <View style={styles.legendItem}>
    <View style={[styles.legendSwatch, { backgroundColor: color }]} />
    <Text style={styles.legendLabel}>
      {label} ({count}) - {percent}%
    </Text>
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
