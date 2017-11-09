import React, { Component } from "react";
import * as Animated from "animated/lib/targets/react-dom";

const AnimatedWrapper = WrappedComponent =>
  class AnimatedWrapperComponent extends Component {
    static ENTRY_ANIMATION_MS = 250;
    static EXIT_ANIMATION_MS = 175;

    constructor(props) {
      super(props);
      this.state = {
        animate: new Animated.Value(0),
      };
    }

    componentWillAppear(done) {
      console.log("hello?");
      Animated.spring(this.state.animate, { toValue: 1 }).start();
      done();
    }

    componentWillEnter(done) {
      console.log("entering");
      setTimeout(
        () => Animated.spring(this.state.animate, { toValue: 1 }).start(),
        AnimatedWrapperComponent.ENTRY_ANIMATION_MS,
      );
      done();
    }

    componentWillLeave(done) {
      Animated.spring(this.state.animate, { toValue: 0 }).start();
      setTimeout(() => done(), AnimatedWrapperComponent.EXIT_ANIMATION_MS);
    }

    render() {
      const style = {
        opacity: Animated.template`${this.state.animate}`,
        transform: Animated.template`
         translate3d(0,${this.state.animate.interpolate({
           inputRange: [0, 1],
           outputRange: ["12px", "0px"],
         })},0)
        `,
      };
      return (
        <Animated.div style={style} className="animated-page-wrapper">
          <WrappedComponent {...this.props} />
        </Animated.div>
      );
    }
  };

export default AnimatedWrapper;
