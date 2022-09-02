import React, { useEffect, useState } from "react";
import { SafeAreaView, Image, StyleSheet, Text, View } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, Feather, Entypo } from '@expo/vector-icons'
import NetInfo from '@react-native-community/netinfo';
import { WEATHER_KEY } from '@env';

const DrawerImage = (props) => {
    /* 
       What is setInterval? setInterval is a method that calls a function or runs some code after specific intervals of time, 
       as specified through the second parameter.
       setInterval vs setTimeout? The setTimeout method calls a function or runs some code ONCE after a period of time, 
       specified using the second argument. 
    */
    const evening = 16;
    const morning = 7;
    const updateTimePeriod = 300000;
    const [currTime, setCurrTime] = useState('');
    const [isConnected, setIsConnected] = useState(true);
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [colors, setColors] = useState(["#fff", "#fff"]) // weather view BG colors
    const [temp, setTemp] = useState('');
    const [wind, setWind] = useState('');
    const [humidity, setHumidity] = useState('');
    const [weather, setWeather] = useState('');
    const key1 = WEATHER_KEY;
    const weatherToIcon = {
        "Thunderstorm" : require("../assets/17.png"),
        "Clear" : (currTime >= evening || currTime <= morning) ? require("../assets/10.png") : require("../assets/26.png"),
        "Clouds" : (currTime >= evening || currTime <= morning) ? require("../assets/31.png") : require("../assets/27.png"),
        "Mist" : (currTime >= evening || currTime <= morning) ? require("../assets/9.png") : require("../assets/6.png"),
        "Smoke" : (currTime >= evening || currTime <= morning) ? require("../assets/2.2.png") : require("../assets/6.png"),
        "Haze" : (currTime >= evening || currTime <= morning) ? require("../assets/9.png") : require("../assets/6.png"),
        "Dust" : (currTime >= evening || currTime <= morning) ? require("../assets/2.2.png") : require("../assets/6.png"),
        "Fog" : (currTime >= evening || currTime <= morning) ? require("../assets/9.png") : require("../assets/6.png"),
        "Snow" : (currTime >= evening || currTime <= morning) ? require("../assets/19.png") : require("../assets/18.png"),
        "Rain" : require("../assets/7.png"),
        "Drizzle" : (currTime >= evening || currTime <= morning) ? require("../assets/1.png") : require("../assets/8.png"),
        "" : require("../assets/32.png"),
    }

    // First, get the local city
    useEffect(() => {
        fetch("http://ip-api.com/json/?")
        .then(res => res.json())
        .then((result) => {
            setCity(result.city);
            setCountry(result.countryCode);
            console.log("local city", result.city);
            console.log("local country", result.countryCode);
        })
        .catch((e) => {
            console.log(e);
        })
    }, []);

    // Then, use the local city to get the weather info for that city
    useEffect(() => {
        if(!city || !country || !isConnected) return;

        // This is the initial API call for the very first render if the weather view
        fetch(`https://api.openweathermap.org/data/2.5/find?q=${city},${country}&units=metric&appid=${key1}`)
        .then(res => res.json())
        .then((result) => {
            setTemp(Math.round(result.list[0].main.temp));
            setWeather(result.list[0].weather[0].main);
            setWind(result.list[0].wind.speed);
            setHumidity(result.list[0].main.humidity);
        })
        .catch((e) => {
            console.log(e);
        });

        // This is to update the weather view after every 1 minute
        let getWeather = setInterval(() => {
            fetch(`https://api.openweathermap.org/data/2.5/find?q=${city},${country}&units=metric&appid=${key1}`)
            .then(res => res.json())
            .then((result) => {
                setTemp(Math.round(result.list[0].main.temp));
                setWeather(result.list[0].weather[0].main);
                setWind(result.list[0].wind.speed);
                setHumidity(result.list[0].main.humidity);
                console.log(result);
            })
            .catch((e) => {
                console.log(e);
            })
        }, updateTimePeriod);

        // This CleanUp function runs whenever the variable (in this case "city" & "country") in the dependency array changes
        return () => clearInterval(getWeather);
    }, [city, country, isConnected]);

    useEffect(() => { // This is for setting the current local Time

        // This is the initial retrieval of Time for the very first render if the weather view
        let hours1 = new Date().getHours(); // Current Hour
        setCurrTime(parseInt(hours1));
        if(parseInt(hours1) >= evening || parseInt(hours1) <= morning){
            setColors(["#4b0082", "#191970"]);
        } else {
            setColors(["#00bfff", "#4169e1"]);
        }

        // update Time after every 1 min
        let now = setInterval(() => {
            let hours = new Date().getHours(); // Current Hour
            setCurrTime(parseInt(hours));
            if(parseInt(hours) >= evening || parseInt(hours) <= morning){
                setColors(["#4b0082", "#191970"]);
            } else {
                setColors(["#00bfff", "#4169e1"]);
            }
        }, updateTimePeriod); 

        // Clear event with this CleanUp function that runs whenever the variable (in this case NULL) 
        // in the dependency array changes, so the following will run when the component unmounts
        return () => clearInterval(now);
    }, []);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });

        return () => { // Only return when the component is unmounted/re-rendered
            unsubscribe();
        };
    }, [])



    return (
        <SafeAreaView style={styles.container}>
            <DrawerContentScrollView {...props} style={{backgroundColor: props.isLightMode ? "#fff" : "#121212"}} >

                {<LinearGradient 
                style={styles.weatherContainer}
                colors={colors}
                start={{x:0, y:0}}
                end={{x:1, y:1}}>
                    <View style={{flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: "center"}}>
                        <View style={{flexDirection: "row"}}>
                            <Text style={styles.temperatureText}>{temp}</Text>
                            <Text style={[
                                styles.temperatureText, 
                                {
                                    fontSize: 18, 
                                    textAlignVertical: "top", 
                                    paddingTop: 5.2, 
                                    color: "rgba(255, 255, 255, 0.71)",
                                }
                            ]}>°C</Text>
                        </View>
                        <View style={{flexDirection: "column"}}>
                            <View style={{flexDirection: "row", alignItems: "baseline", marginLeft: 1.8}}>
                                <Feather name="wind" size={15} color="rgba(255, 255, 255, 0.71)"/>
                                <Text style={{color:"#fff", paddingLeft: 5.2, fontFamily: "", fontSize: 11.5}}>{wind} m/s</Text>
                            </View>
                            <View style={{flexDirection: "row", alignItems: "baseline", marginTop: "2.5%", marginLeft: 1.8}}>
                                <Entypo name="drop" size={15} color="rgba(255, 255, 255, 0.71)" />
                                <Text style={{color:"#fff", paddingLeft: 5.2, fontFamily: "", fontSize: 11.5}}>{humidity} %</Text>
                            </View>
                        </View>
                    </View>
                    <Image style={styles.icon} source={weatherToIcon[weather]} resizeMode={"contain"} />
                    <View style={{flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "flex-end"}}>
                            {
                                weather === "Thunderstorm" ? 
                                <View>
                                    <Text style={styles.weatherTypeText}>Thunder</Text>
                                    <Text style={styles.weatherTypeText}>storm</Text>
                                </View> :
                                <View>
                                    <Text style={styles.weatherTypeText}></Text>
                                    <Text style={styles.weatherTypeText}>{weather}</Text>
                                </View>
                            }
                            <View style={{flexDirection: "row", alignItems: "baseline"}}>
                                <Ionicons name="ios-location-outline" size={15} color="rgba(255, 255, 255, 0.71)"/>
                                <Text style={{color: "rgba(255, 255, 255, 0.71)", paddingLeft: 2.5, fontSize: 11.5, letterSpacing: 1, fontFamily: ""}}>
                                    {city}
                                </Text>
                            </View>
                    </View>
                </LinearGradient>}
                <Text style={[styles.updateInfoText, {
                    color: props.isLightMode ? "rgba(0, 0, 0, 0.52)" : "rgba(255, 255, 255, 0.52)"
                }]}>
                    <Feather name="info" size={13.7} />
                    {"  "}Updated every 5 mins
                </Text>
                <View style={{
                    borderBottomWidth: 0.52, 
                    marginBottom: "9.25%", 
                    borderColor: props.isLightMode ? "rgba(0, 0, 0, 0.25)" : "rgba(255, 255, 255, 0.25)"
                }} />
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    newsImage: {
        resizeMode: "center",
        width: 337,
        height: 337,
        borderRadius: 7,
        marginTop: 0,
        marginBottom: 0,
        alignSelf: "center",
    },
    weatherContainer: {
        flex: 1,
        borderColor: "#121212",
        borderWidth: 0,
        borderRadius: 16,
        marginHorizontal: "14.8%",
        marginTop: "10%",
        height: 180,
        paddingHorizontal: "5.2%",
        justifyContent: "center",
    },
    temperatureText: {
        fontFamily: "",
        fontWeight: "normal",
        fontSize: 44.5,
        color: "#fff",
        textAlign: "center",
        includeFontPadding: false,
        textAlignVertical: "top"
    },
    icon: {
        height: "43.9%",
        width: "58%",
        alignSelf: "center",
        marginTop: "2.5%"
    },
    weatherTypeText: {
        fontFamily: "",
        fontSize: 11.5,
        color: "rgba(255, 255, 255, 0.71)",
        letterSpacing: 1,
        marginLeft: 1.8,
        alignSelf: "flex-start"
    },
    updateInfoText: {
        fontFamily: "",
        fontSize: 10.8,
        marginHorizontal: "16%",
        marginTop: "2.5%",
        marginBottom: "9.25%",
        fontStyle: "italic", 
        paddingHorizontal: "1%",
    }
});

export default DrawerImage;