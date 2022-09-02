import React, { useEffect, useState, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, Dimensions, RefreshControl } from 'react-native';
import { Feather } from '@expo/vector-icons';
import TopImageNews from '../utils/topImageNews';
import ListStyleNews from '../utils/listStyleNews';
import NetInfo from '@react-native-community/netinfo';
import * as Animatable from 'react-native-animatable';
import { useIsFocused } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

// Note: if KEY changes in .env, we need to expo r -c to make those changes take effect in the app code
import { KEY } from '@env';


const HorizontalNews = (props) => {
    return (
        <ScrollView 
        horizontal={true} 
        style={{marginTop: 16, backgroundColor: "transparent", height: 376}}
        showsHorizontalScrollIndicator={false}
        >
            {props.articles && <TopImageNews articles={props.articles} isLightMode={props.isLightMode} />}
        </ScrollView>
    );
}

const HomePage = (props) => {
    const [refreshing, setRefreshing] = useState(false);
    const [articles, setArticles] = useState([]);
    const [isConnected, setIsConnected] = useState(true);
    const key1 = KEY;
    const isFocused = useIsFocused();
    const numArticles = 12;

    // for Sources: https://api.newscatcherapi.com/v2/sources?lang=en&countries=CA
    // The first useEffect is for the initial render
    useEffect(() => {
        if(!props.needq && isFocused && isConnected){
            fetch(`https://api.newscatcherapi.com/v2/latest_headlines?topic=${props.newsTopic}&page_size=${numArticles}&ranked_only=true&lang=en&not_sources=china.org.cn,petrolialambtonindependent.ca,standardbredcanada.ca,digitaljournal.com,sydenhamcurrent.ca,thealgomanews.ca,bradfordtoday.ca,theifp.ca,empireadvance.ca,paherald.sk.ca,thestar.com,infotel.ca,financialpost.com,canadafreepress.com,thereminder.ca,campbellrivermirror.com,lakecowichangazette.com,newhamburgindependent.ca,agassizharrisonobserver.com,bowenislandundercurrent.com,bayshorebroadcasting.ca,chemainusvalleycourier.ca,cowichanvalleycitizen.com,bundelkhandonlinejournal.in,easternindianewsmagazine.in,jammuandkashmirheadlines.in,sandiegouniontribune.com,fairfieldcitizenonline.com,beaumontenterprise.com`, {
                method: "GET",
                headers: {"x-api-key": key1}
            })
            .then(res => res.json())
            .then((result) => {
                setArticles(result.articles);
                console.log("loading articles.......");
            });
        } else if(props.needq && isFocused && isConnected){
            fetch(`https://api.newscatcherapi.com/v2/search?q=${props.newsTopic}&page_size=${numArticles}&ranked_only=true&lang=en&not_sources=china.org.cn,petrolialambtonindependent.ca,standardbredcanada.ca,digitaljournal.com,sydenhamcurrent.ca,thealgomanews.ca,bradfordtoday.ca,theifp.ca,empireadvance.ca,paherald.sk.ca,thestar.com,infotel.ca,financialpost.com,canadafreepress.com,thereminder.ca,campbellrivermirror.com,lakecowichangazette.com,newhamburgindependent.ca,agassizharrisonobserver.com,bowenislandundercurrent.com,bayshorebroadcasting.ca,chemainusvalleycourier.ca,cowichanvalleycitizen.com,bundelkhandonlinejournal.in,easternindianewsmagazine.in,jammuandkashmirheadlines.in,sandiegouniontribune.com,fairfieldcitizenonline.com,beaumontenterprise.com`, {
                method: "GET",
                headers: {"x-api-key": key1}
            })
            .then(res => res.json())
            .then((result) => {
                setArticles(result.articles);
                console.log("loading articles.......");
            })
        }
    }, [isConnected]);

    useEffect(() => {
        if(refreshing && !props.needq && isConnected){
            fetch(`https://api.newscatcherapi.com/v2/latest_headlines?topic=${props.newsTopic}&page_size=${numArticles}&ranked_only=true&lang=en&not_sources=china.org.cn,petrolialambtonindependent.ca,standardbredcanada.ca,digitaljournal.com,sydenhamcurrent.ca,thealgomanews.ca,bradfordtoday.ca,theifp.ca,empireadvance.ca,paherald.sk.ca,thestar.com,infotel.ca,financialpost.com,canadafreepress.com,thereminder.ca,campbellrivermirror.com,lakecowichangazette.com,newhamburgindependent.ca,agassizharrisonobserver.com,bowenislandundercurrent.com,bayshorebroadcasting.ca,chemainusvalleycourier.ca,cowichanvalleycitizen.com,bundelkhandonlinejournal.in,easternindianewsmagazine.in,jammuandkashmirheadlines.in,sandiegouniontribune.com,fairfieldcitizenonline.com,beaumontenterprise.com`, {
                method: "GET",
                headers: {"x-api-key": key1}
            })
            .then(res => res.json())
            .then((result) => {
                setArticles(result.articles);
                console.log("loading articles.......");
            });
        } else if(refreshing && props.needq && isConnected){
            fetch(`https://api.newscatcherapi.com/v2/search?q=${props.newsTopic}&page_size=${numArticles}&ranked_only=true&lang=en&not_sources=china.org.cn,petrolialambtonindependent.ca,standardbredcanada.ca,digitaljournal.com,sydenhamcurrent.ca,thealgomanews.ca,bradfordtoday.ca,theifp.ca,empireadvance.ca,paherald.sk.ca,thestar.com,infotel.ca,financialpost.com,canadafreepress.com,thereminder.ca,campbellrivermirror.com,lakecowichangazette.com,newhamburgindependent.ca,agassizharrisonobserver.com,bowenislandundercurrent.com,bayshorebroadcasting.ca,chemainusvalleycourier.ca,cowichanvalleycitizen.com,bundelkhandonlinejournal.in,easternindianewsmagazine.in,jammuandkashmirheadlines.in,sandiegouniontribune.com,fairfieldcitizenonline.com,beaumontenterprise.com`, {
                method: "GET",
                headers: {"x-api-key": key1}
            })
            .then(res => res.json())
            .then((result) => {
                setArticles(result.articles);
                console.log("loading articles.......");
            })
        }
    }, [refreshing, isConnected]);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            console.log("Is connected:", state.isConnected);
            setIsConnected(state.isConnected);
        });

        return () => {
            unsubscribe();
        };
    }, []);
    
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    return (
        <SafeAreaView style={[styles.scrollContainer, props.isLightMode ? {backgroundColor: "#fff"} : {backgroundColor: "#121212"}]}>
            {isConnected ? 
            <ScrollView 
                style={{
                    backgroundColor: props.isLightMode ? "#fff" : "#121212",
                    paddingTop: StatusBar.height,
                    width: Dimensions.get("window").width,
                }}
                refreshControl={
                    <RefreshControl 
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        progressViewOffset={39.1}
                    />
                }
            >
                <View style={{flexDirection: "row"}}>
                    <View style={{flexDirection: "column"}}>
                        <Text style={[styles.topText, props.isLightMode ? {color: "#000"} : {color: "#fff"}]}>{props.heading}</Text>
                        <View
                            style={{
                                borderBottomColor: props.isLightMode ? "#000" : "#fff",
                                borderBottomWidth: 8.8,
                                marginLeft: 25.9,
                                marginRight: 2.5,
                                marginTop: "1%",
                                width: 43.6
                            }}
                        />
                    </View>
                    {props.lottiePath ? 
                    <LottieView 
                        source={props.lottiePath}
                        style={{
                            backgroundColor: props.isLightMode ? "#fff" : "#121212",
                            width: props.lottieSize ? props.lottieSize : 43,
                            height: props.lottieSize ? props.lottieSize : 43,
                            marginTop: props.lottieTopMargin ? props.lottieTopMargin : "2.5%",
                            marginLeft: props.lottieLeftMargin ? props.lottieLeftMargin : "1%"
                        }}
                        autoPlay={true}
                        loop={true}
                    /> : 
                    <></>}
                </View>
                <HorizontalNews articles={articles.slice(0, 7)} isLightMode={props.isLightMode} />
                <ListStyleNews articles={articles.slice(7)} isLightMode={props.isLightMode} />
                {/* <Titles articles={articles} /> */}
            </ScrollView> : 
            <>
                <Animatable.Text animation="slideInDown" iterationCount="infinite" direction="alternate">
                    <Feather name="wifi-off" size={71} color={props.isLightMode ? "#000" : "#fff"} />
                </Animatable.Text>
                <Text style={[styles.noWifiText, props.isLightMode ? {color: "#000"} : {color: "#fff"}]}>Oops!</Text>
                <Text style={styles.noWifiSubText}>Keep Calm and find a wifi connection.</Text>
            </>
            }
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        paddingTop: 0,
        backgroundColor: "#fff",
        //alignItems centralizes items vertically, justifyContent centralizes content horizontally
        alignItems: "center",
        justifyContent: "center",
    },
    topText: {
        textAlign: "left",
        fontSize: 38.2,
        marginLeft: 25,
        marginTop: "2.5%",
        fontWeight: "500",
        letterSpacing: 1,
        fontFamily: "",
    },
    imageNewsButtonContainer: {
        alignSelf: "center",
        marginHorizontal: 25,
        // borderWidth: 1,
        borderRadius: 25,
        borderColor: "#000",
        height: "97%",
        width: 313,
    },
    imageOverlay: {
        width: "100%",
        height: "100%",
        borderRadius: 25,
        alignItems: "flex-start",
        justifyContent: "flex-end",
    },
    imageBG: {
        borderRadius: 25,
        flex: 1,
    },
    headlineText: {
        color: "#fff",
        fontSize: 25,
        fontWeight: "700",
        fontFamily: "",
        paddingBottom: 8.8,
        marginHorizontal: "4.21%",
    },
    shortNewsInfoText: {
        color: "#fff",
        fontSize: 12.4,
        fontFamily: "", //IMPORTANT NOTE: Gotta add this to show all characters!
        alignItems: "center",
        justifyContent: "center",
    },
    newsModalTopButtonsContainer: {
        alignSelf: "flex-start",
        flexDirection: "row",
        marginTop: 42.1,
        position: "absolute",
        justifyContent: "space-between",
        width: "100%", //This is what makes alignement space-between work because before this width was not 100%
        paddingHorizontal: 25
    },
    noWifiText: {
        color: "rgba(0, 0, 0, 1)",
        fontSize: 52,
        fontWeight: "bold",
        fontFamily: "",
        textAlign: "center",
    },
    noWifiSubText: {
        color: "rgba(124, 124, 124, 1.0)",
        fontSize: 18,
        fontWeight: "normal",
        fontFamily: "",
        textAlign: "center",
        paddingTop: 7,
    }
});

export default HomePage;