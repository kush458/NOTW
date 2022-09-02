import React, { useEffect, useState, useRef } from "react";
import LottieView from "lottie-react-native";

const Toggle = (props) => {
    // Thank God! this works as a separate component
    const animation1 = useRef(null);
    const noop = () => {};

    useEffect(() => {
        if(props.isLightMode){
            animation1.current ? animation1.current.play(67, 141) : noop();
        } else {
            animation1.current ? animation1.current.play(0, 67) : noop();
        }
    }, [props.isLightMode])

    return (
        <LottieView 
            ref={animation1}
            source={require("../assets/52869-day-and-night-switch-button.json")}
            style={{
                width: 88,
                height: 88,
            }}
            autoPlay={false}
            loop={false}
        />
    );
}

export default Toggle;