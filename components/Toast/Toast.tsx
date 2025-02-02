import React, { useEffect } from 'react';
import { Animated, Dimensions, Easing, StyleSheet, Text, View, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ToastProps {
    message?: string;
    type: "success" | "warning" | "error" | "info";
    onClose: () => void;
    duration: number;
    index: number;
}
export const Toast: React.FC<ToastProps> = React.memo(({ message, type, onClose, duration, index }) => {
    const translateY = React.useRef(new Animated.Value(0)).current;
    const notchHeight: number = useSafeAreaInsets().top;
    useEffect(() => {
        if (!message) return;
        Animated.timing(translateY, {
            toValue: 50,
            duration: 300,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
        }).start();
        const timer = setTimeout(() => {
            Animated.timing(translateY, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start(() => onClose());
        }, duration);
        return () => clearTimeout(timer);
    }, [duration, message]);
    const getBarColor = (): string => {
        switch (type) {
            case "success":
                return "#009990";
            case "warning":
                return "#FFEB00";
            case "error":
                return "#F72C5B";
            case "info":
                return "#000957";
        }
    }
    const getBackgroundColor = (): string => {
        switch (type) {
            case "success":
                return "#5DB996";
            case "warning":
                return "#FFF2AF";
            case "error":
                return "#FF748B";
            case "info":
                return "#074799";
        }
    }
    const getIcon = (): React.ReactElement => {
        switch (type) {
            case "success":
                return <Icon name="check" size={20} color="#FFF" />;
            case "warning":
                return <Icon name="exclamation" size={20} color="#000" />;
            case "error":
                return <Icon name="times" size={20} color="#FFF" />;
            case "info":
                return <Icon name="info" size={20} color="#FFF" />;
        }
    }
    const getMessageColor = (): string => {
        switch (type) {
            case "success":
                return "#FFFFFF";
            case "warning":
                return "#000000";
            case "error":
                return "#FFFFFF";
            case "info":
                return "#FFFFFF";
        }
    }
    const ToastStyle = StyleSheet.create({
        container: {
            width: Dimensions.get("screen").width - 5,
            height: 50,
            backgroundColor: "transparent",
            position: "absolute",
            left: 2.5,
            borderRadius: 5,
        }
    })



    return (
        <Animated.View style={[ToastStyle.container, {
            transform: [{
                translateY:
                    translateY.interpolate({
                        inputRange: [0, 50],
                        outputRange: [-50, notchHeight + ((55 * index))]
                    })
            }]
        }]}
        >
            <View
                style={{
                    width: "100%",
                    height: "100%",
                    flexDirection: "row",
                    borderRadius: 5,
                }}>
                <View
                    style={{
                        width: "2%",
                        height: "100%",
                        backgroundColor: getBarColor(),
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5,

                    }}></View>
                <View
                    style={{
                        width: 50,
                        height: "100%",
                        backgroundColor: getBackgroundColor(),
                        alignItems: "center",
                        justifyContent: "center"

                    }}>
                    {getIcon()}
                </View>
                <View
                    style={{
                        flex: 1,
                        height: "100%",
                        backgroundColor: getBackgroundColor(),
                        borderTopRightRadius: 5,
                        borderBottomRightRadius: 5,
                        justifyContent: "center"

                    }}>
                    <Text style={{ left: 10, fontFamily: 'calibri', fontSize: 15, fontWeight: 400, color: getMessageColor() }}>{message}</Text>

                </View>
            </View>
        </Animated.View>
    )

})
