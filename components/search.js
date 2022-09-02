import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, Dimensions, TextInput, Modal, TouchableOpacity, ActivityIndicator } from 'react-native';
import ListStyleNews from '../utils/listStyleNews';
import * as Animatable from 'react-native-animatable';
import NetInfo from '@react-native-community/netinfo';
import { Feather, Ionicons, Entypo } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { KEY } from "@env";

const SearchScreen = (props) => {
    const [articles, setArticles] = useState([]);
    const [isConnected, setIsConnected] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [text, onChangeText] = useState("");
    const [startSearching, setStartSearching] = useState(false);
    const [bounceNews, setBounceNews] = useState(true);
    const animation = useRef(null);
    const noResultsAnimation = useRef(null);
    const numArticles = 16; const key1 = KEY;

    useEffect(() => {
        if(startSearching && text.length >= 1 && isConnected){
            fetch(`https://api.newscatcherapi.com/v2/search?q=${text}&page_size=${numArticles}&lang=en&not_sources=digitaljournal.com,blogspot.com,prnewswire.com,nih.gov,lexology.com,supersport.com,paherald.sk.ca,thestar.com,infotel.ca,financialpost.com,canadafreepress.com,thereminder.ca,campbellrivermirror.com,lakecowichangazette.com,newhamburgindependent.ca,agassizharrisonobserver.com,bowenislandundercurrent.com,bayshorebroadcasting.ca,chemainusvalleycourier.ca,cowichanvalleycitizen.com,bundelkhandonlinejournal.in,easternindianewsmagazine.in,jammuandkashmirheadlines.in,sandiegouniontribune.com,fairfieldcitizenonline.com,beaumontenterprise.com`, {
                method: "GET",
                headers: {"x-api-key": key1}
            })
            .then(res => res.json())
            .then((result) => {
                console.log("From search: ", result);
                setArticles(result.articles);
            });
        }
    }, [startSearching]);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <View>
            <Modal
                animationType='slide'
                visible={isVisible}
                onRequestClose={() => setIsVisible(false)}
                transparent={true}
                statusBarTranslucent={false}
                onShow={() => {
                    if(bounceNews){
                        animation.current.play();
                    }
                }}
            >
                {/* NOTE: Thank God! the following works and doesn't shrink with keyboard. Please remeber to not use height, 
                width or flex in a view if you have text input inside that view and don't want it to shrink! */}
                <SafeAreaView style={{
                    borderBottomColor: "crimson", 
                    borderBottomWidth: 0, 
                    backgroundColor: props.isLightMode ? "#fff" : "#121212", 
                    marginVertical: 2.5,
                    paddingBottom: 2.5,
                }}>
                    <View style={{
                        backgroundColor: props.isLightMode ? "#121212": "#fff",
                        flexDirection: "row",
                        borderWidth: 0,
                        borderColor: "crimson",
                        marginHorizontal: 7,
                        borderRadius: 100,
                    }}>
                        <TouchableOpacity style={[styles.backButton, props.isLightMode ? "#fff" : {backgroundColor: "#121212"}]} onPress={() => {
                            setIsVisible(!isVisible);
                        }}>
                            <Entypo name="chevron-thin-left" size={29} color={props.isLightMode ? "#121212" : "#fff"} style={{paddingRight: 2.5}} />
                        </TouchableOpacity>
                        <TextInput
                            style={[styles.input, props.isLightMode ? {color: "rgba(255, 255, 255, 0.52)"} : {color: "rgba(0, 0, 0, 0.71)"}]}
                            placeholder={"Search away!"}
                            placeholderTextColor={props.isLightMode ? "rgba(255, 255, 255, 0.52)" : "rgba(0, 0, 0, 0.52)"}
                            onChangeText={onChangeText}
                            value={text}
                            onSubmitEditing={() => {
                                setBounceNews(false);
                                setStartSearching(true);
                                setTimeout(() => setStartSearching(false), 2000);
                            }}
                        />
                        {startSearching ? <ActivityIndicator size={"large"} color={props.isLightMode ? "#fff" : "#121212"} style={{left: "88%"}} /> : <></>}
                    </View>
                </SafeAreaView>
                <SafeAreaView style={[styles.scrollContainer, props.isLightMode ? "" : {backgroundColor: "#121212"}]}>
                    {
                        (bounceNews) ? 
                            (
                                <View style={{justifyContent: "center", alignItems: "center"}}>
                                    <LottieView 
                                        ref={animation}
                                        source={require("../assets/45739-gaming-news-animation.json")} 
                                        style={{
                                            width: 251,
                                            height: 251,
                                            backgroundColor: props.isLightMode ? "#fff" : "#121212",
                                        }} 
                                        autoPlay={false}
                                        loop={false}
                                    />
                                    <Text style={[styles.notFoundText, props.isLightMode ? "" : {color: "#b3b3b3"}]}>Get any news you want!</Text> 
                                </View>
                            ) :
                            (   
                                <SafeAreaView>
                                    {isConnected ? 
                                    <ScrollView 
                                        style={{
                                            backgroundColor: props.isLightMode ? "#fff" : "#121212",
                                            paddingTop: StatusBar.height,
                                            width: Dimensions.get("window").width,
                                        }}
                                    >
                                        {
                                            startSearching ? // if search started, wait for it to end and get results
                                            <></> : 
                                            (articles != undefined) ? // if articles not empty
                                            <ListStyleNews articles={articles} isLightMode={props.isLightMode} /> :
                                            (
                                                <View style={{justifyContent: "center", alignItems: "center"}}>
                                                    <LottieView 
                                                        ref={noResultsAnimation}
                                                        source={require("../assets/no-results-found.json")} 
                                                        style={{
                                                            width: 251,
                                                            height: 251,
                                                        }} 
                                                        autoPlay={true}
                                                        loop={false}
                                                    />
                                                    <Text style={[styles.notFoundText, props.isLightMode ? "" : {color: "#b3b3b3"}]}>No results found!</Text> 
                                                </View>
                                            )
                                        }
                                    </ScrollView> :
                                    <View style={{justifyContent: "center", alignItems: "center", height: Dimensions.get("window").height}}>
                                        <Animatable.Text animation="slideInDown" iterationCount="infinite" direction="alternate">
                                            <Feather name="wifi-off" size={71} color="#000" />
                                        </Animatable.Text>
                                        <Text style={styles.noWifiText}>Oops!</Text>
                                        <Text style={styles.noWifiSubText}>Keep Calm and find a wifi connection</Text>
                                    </View>
                                    }
                                </SafeAreaView>
                            ) 
                    }
                </SafeAreaView>
            </Modal>

            <TouchableOpacity onPress={() => {
                setIsVisible(true);
            }}>
                <Ionicons
                    name="search-outline"
                    size={31.3}
                    color={props.isLightMode ? "#000" : "#fff"}
                    style={{paddingLeft: 25}}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        paddingTop: 0,
        backgroundColor: "#fff",
        // alignItems centralizes items vertically, justifyContent centralizes content horizontally
        alignItems: "center",
        justifyContent: "center",
    },
    notFoundText: {
        color: "rgba(0, 0, 0, 0.52)",
        fontSize: 25,
        fontWeight: "normal",
        fontFamily: "",
    },
    noWifiText: {
        color: "#000",
        fontSize: 52,
        fontFamily: "",
        textAlign: "center",
        fontWeight: "bold",
    },
    noWifiSubText: {
        color: "rgba(0, 0, 0, 0.52)",
        fontSize: 18,
        fontFamily: "",
        textAlign: "center",
    },
    searchBar: {
        backgroundColor: "#121212",
        borderRadius: 52,
        width: "94%",
        height: "86%",
        flexDirection: "row",
        alignItems: "center",
    },
    backButton: {
        backgroundColor: "#fff",
        alignSelf: "center",
        borderRadius: 100,
        padding: 7,
        alignItems: "center",
        justifyContent: "center",
        margin: 4.12,
    },
    input: {
        height: 38.2,
        margin: 7,
        borderWidth: 0,
        borderColor: "crimson",
        flex: 0.8,
        borderRadius: 100,
        fontSize: 16,
        fontFamily: "",
        letterSpacing: 1
    },
});

export default SearchScreen;