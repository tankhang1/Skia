import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {Canvas, Circle} from '@shopify/react-native-skia';
import {
  SharedValue,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
const {width, height} = Dimensions.get('screen');
const Dot = ({
  index,
  xPosition,
  yPosition,
}: {
  index: number;
  xPosition: SharedValue<number>;
  yPosition: SharedValue<number>;
}) => {
  const currentRow = Math.floor(index / 12) * 30;
  const currentColumn = Math.floor(index % 12) * 30 + 35;
  const radius = useDerivedValue(() => {
    const hypoteneuse = Math.hypot(
      xPosition.value - currentColumn,
      yPosition.value - 30 - currentRow,
    );

    if (hypoteneuse < 55 && xPosition.value !== -1) {
      return withSpring(11, {overshootClamping: true});
    } else return withSpring(3, {overshootClamping: true});
  }, [xPosition, yPosition]);
  return (
    <Circle cx={currentColumn} cy={currentRow + 30} r={radius} color={'blue'} />
  );
};
const ChasingMouseBubbles = () => {
  const [nums, setNums] = useState<number[]>([]);
  const xPosition = useSharedValue(-1);
  const yPosition = useSharedValue(-1);
  const gesture = Gesture.Pan()

    .onBegin(e => {
      xPosition.value = e.x;
      yPosition.value = e.y;
    })
    .onChange(e => {
      xPosition.value = e.x;
      yPosition.value = e.y;
    })
    .onEnd(() => {
      xPosition.value = -1;
      yPosition.value = -1;
    })
    .onFinalize(() => {
      xPosition.value = -1;
      yPosition.value = -1;
    });

  useEffect(() => {
    const dotsForHeight = Math.round(height / 35);
    const numsArray = Array.from(Array(12 * dotsForHeight + 100).keys());
    setNums(numsArray);
  }, []);
  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={gesture}>
        <Canvas
          style={{height: '100%', width: '100%'}}
          renderToHardwareTextureAndroid>
          {nums.map((dot, index) => (
            <Dot
              key={index}
              index={dot}
              xPosition={xPosition}
              yPosition={yPosition}
            />
          ))}
        </Canvas>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default ChasingMouseBubbles;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: width,
  },
});
