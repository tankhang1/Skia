import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Canvas,
  Circle,
  Group,
  Line,
  Skia,
  point,
  processTransform3d,
  toMatrix3,
  vec,
} from '@shopify/react-native-skia';
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
const getInnerColor = (idx: number) => {
  if (idx >= 0 && idx <= 5) return 'yellow';
  if (idx >= 5 && idx <= 10) return 'lime';
  if (idx >= 10 && idx <= 15) return 'aqua';
  return 'blue';
};
const getOuterColor = (idx: number) => {
  if (idx >= 0 && idx <= 5) return 'blue';
  if (idx >= 5 && idx <= 10) return 'magenta';
  if (idx >= 10 && idx <= 15) return 'red';
  return 'green';
};
const {width, height} = Dimensions.get('screen');
const NUM_POINTS = 20;
interface Point {
  innerX: number;
  innerY: number;
  outerX: number;
  outerY: number;
}
const createPoints = () => {
  const points = [];
  const angleStep = (Math.PI * 2) / NUM_POINTS;
  const innerRad = 30;
  const outerRad = 170;
  const middleX = width / 2;
  const middleY = height / 2;
  for (let i = 0; i < NUM_POINTS; i++) {
    const theta = i * angleStep;
    const x = middleX + Math.cos(theta) * innerRad;
    const y = middleY + Math.sin(theta) * innerRad;
    const outerX = middleX + Math.cos(theta) * outerRad;
    const outerY = middleY + Math.sin(theta) * outerRad;
    points.push({
      innerX: x,
      innerY: y,
      outerX,
      outerY,
    });
  }
  return points;
};
interface ICirclePair {
  point: Point;
  idx: number;
  isForward: boolean;
}
const CirclePair = ({point, idx, isForward}: ICirclePair) => {
  const xMidPoint = (point.innerX + point.outerX) / 2;
  const yMidPoint = (point.innerY + point.outerY) / 2;
  const rotationIndicator = useSharedValue(0);
  useEffect(() => {
    const delay = isForward ? (NUM_POINTS - idx) * 75 : idx * 75;
    const transitionValue = isForward ? 0 : Math.PI;

    rotationIndicator.value = withDelay(
      delay,
      withTiming(transitionValue, {
        duration: 300,
        easing: Easing.linear,
      }),
    );
  }, [isForward]);
  const rotation = useDerivedValue(() => {
    const matrix = toMatrix3(
      processTransform3d([{rotateZ: rotationIndicator.value}]),
    );
    return Skia.Matrix(matrix);
  }, [rotationIndicator]);
  return (
    <Group key={idx} matrix={rotation} origin={vec(xMidPoint, yMidPoint)}>
      <Line
        p1={vec(point.innerX, point.innerY)}
        p2={vec(point.outerX, point.outerY)}
        color={'white'}
      />
      <Circle
        r={7}
        cx={point.innerX}
        cy={point.innerY}
        color={getInnerColor(idx)}
      />
      <Circle
        r={7}
        cx={point.outerX}
        cy={point.outerY}
        color={getOuterColor(idx)}
      />
    </Group>
  );
};
const BendingCircleAnimation = () => {
  const innerPoints = createPoints();
  const [isForward, setIsForward] = useState(false);
  console.log('inner points', innerPoints);
  return (
    <View style={styles.container}>
      <Canvas style={styles.canvas}>
        {innerPoints?.map((point, idx) => {
          return (
            <CirclePair
              key={idx}
              point={point}
              idx={idx}
              isForward={isForward}
            />
          );
        })}
      </Canvas>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsForward(!isForward)}>
        <Text style={styles.buttonText}>Animate</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BendingCircleAnimation;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  canvas: {
    backgroundColor: 'black',
    width: width,
    height: height,
  },
  button: {
    position: 'absolute',
    backgroundColor: 'purple',
    height: 60,
    width: 150,
    bottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});
