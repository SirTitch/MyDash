import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import Svg, {Defs, LinearGradient, Stop, Circle} from 'react-native-svg';
import Animated, {
  withTiming,
  useAnimatedProps,
  useSharedValue,
  interpolate,
} from 'react-native-reanimated';


const AnimatedProgressComponent = (props) => {
    const { progress, width, colour1, colour2, withCrossCircle } = props;
    const strokeDivisor = withCrossCircle === true ? 14 : 7
    const size = width - 32;
    const strokeWidth = size/strokeDivisor;
    const AnimatedCircle = Animated.createAnimatedComponent(Circle);
    const {PI} = Math;
    const r = (size - strokeWidth) / 2;
    const cx = size / 2;
    const cy = size / 2;
    const circumference = r * 2 * PI;


    const progressCircle = useSharedValue(0);
    const animatedProps = useAnimatedProps(() => ({
      strokeDashoffset: interpolate(
        circumference * progressCircle.value,
        [0, circumference],
        [circumference, 0],
      ),
    }));

    React.useEffect(() => {
      console.log(progress)
      progressCircle.value = withTiming(progress, {duration: 2000});
    }, [progress]);
  return (
    <>
      <Svg width={size} height={size} style={styles.container}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="100%" y2="0">
            <Stop offset="0" stopColor={colour1} />
            <Stop
              offset="1"
              stopColor={colour2 !== undefined ? colour2 : colour1}
            />
          </LinearGradient>
        </Defs>
        <Circle
          stroke={'lightgrey'}
          fill="none"
          {...{
            strokeWidth,
            cx,
            cy,
            r,
          }}
        />
        <AnimatedCircle
          stroke="url(#grad)"
          fill="none"
          strokeDasharray={`${circumference}, ${circumference}`}
          animatedProps={animatedProps}
          {...{
            strokeWidth,
            cx,
            cy,
            r,
          }}
        />
      </Svg>
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    transform: [{rotateZ: '270deg'}],
  },
});

export default AnimatedProgressComponent;