import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React, {useEffect} from 'react';
import {Canvas, Rect, SweepGradient, vec} from '@shopify/react-native-skia';
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');
const GradientClockTutorial = () => {
  const rotation = useSharedValue(0);

  const centerX = width / 2;
  const centerY = height / 2;
  const centerVec = vec(centerX, centerY);
  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(2, {
        duration: 2000,
        easing: Easing.linear,
      }),
      -1,
      true,
    );
  }, []);
  const animatedRotation = useDerivedValue(() => {
    return [{rotate: Math.PI * rotation.value}];
  }, [rotation]);
  return (
    <View style={styles.container}>
      <Canvas style={styles.container}>
        <Rect x={0} y={0} width={width} height={height}>
          <SweepGradient
            c={centerVec}
            origin={centerVec}
            colors={['white', 'hsl(0,0%,80%)', 'hsl(0,0%,50%)', 'black']}
            start={0}
            end={360}
            transform={animatedRotation}
          />
        </Rect>
      </Canvas>
      <Text style={styles.dayText}>DAY</Text>
      <Text style={styles.nightText}>NIGHT</Text>
    </View>
  );
};

export default GradientClockTutorial;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dayText: {
    fontSize: 90,
    color: 'black',
    fontWeight: '100',
    letterSpacing: 8,
    alignSelf: 'center',
    position: 'absolute',
    top: 70,
  },
  nightText: {
    position: 'absolute',
    bottom: 70,
    fontWeight: '100',
    letterSpacing: 8,
    fontSize: 90,
    color: 'white',
    alignSelf: 'center',
  },
});
