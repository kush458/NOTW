import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions, RefreshControl, TouchableOpacity, ImageBackground, Modal, SafeAreaView, Linking} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { getFirstTwo, getReadingTime, ShareNews, getCurrDateTime, convertTime, formatDate, getSlicePoint } from './helpers';
// This page is for general headlines

const TopImageNews = (props) => {

    if(props.articles){
        return props.articles.map((article, i) => {
            const [isVisible, setIsVisible] = useState(false); 
            
            // The point after which the first two lines begin after extracting the first "VALID" character
            const slicePoint = getSlicePoint(article.summary);
            const firstLetter = article.summary ? article.summary.slice(slicePoint, slicePoint+1) : "null summary";
            const firstTwoLines = article.summary ? getFirstTwo(article.summary.slice(slicePoint+1), 61) : "null summary";
            const restSummary = article.summary.slice(firstTwoLines.length+slicePoint+1).replace(/\s\s+/g, '\n\n');

            // passing length of article, trim() removes whitespace from both ends
            const readingTime = getReadingTime(article.summary.trim().length);

            // Start calculation of Time
            let currDateStr = getCurrDateTime();
            let currDandT = new Date(currDateStr);
            let apiDandT = new Date(formatDate(article.published_date));
            let TimeDifference = Math.abs(currDandT.valueOf() - apiDandT.valueOf());
            let FinalTime = convertTime(TimeDifference);

            return (
                <View key={i}>
                    <Modal
                        animationType='slide'
                        visible={isVisible}
                        onRequestClose={() => setIsVisible(false)}
                        transparent={true}
                        statusBarTranslucent={true}
                        key={i}
                    >
                        <View key={i} style={{
                            alignSelf: "center",
                            width: Dimensions.get("window").width,
                            height: Dimensions.get("screen").height,
                            backgroundColor: props.isLightMode ? "#fff" : "#121212"
                        }}>
                            <ImageBackground
                                source={{uri: article.media ? article.media : "https://www.albertadoctors.org/images/ama-master/feature/Stock%20photos/News.jpg"}}
                                resizeMode="cover"
                                style={{
                                    width: Dimensions.get("window").width,
                                    height: (Dimensions.get("window").height / 2) + 52
                                }}
                                imageStyle={{flex: 1}}
                                key={i}
                            >
                                <LinearGradient
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                    }}
                                    start={{x:0, y: 0}}
                                    end={{x:0, y:1}}
                                    colors={["rgba(0, 0, 0, 0.71)", "transparent", "transparent", "rgba(0, 0, 0, 0.71)", "rgba(0, 0, 0, 0.85)"]}
                                >
                                    <View style={styles.newsModalTopButtonsContainer} key={i}>
                                        <TouchableOpacity onPress={() => setIsVisible(false)}>
                                            <Entypo
                                                name='chevron-thin-left'
                                                size={25}
                                                color="#fff"
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => ShareNews(article.link)}>
                                            <Ionicons 
                                                name='ios-share-social-outline'
                                                size={25}
                                                color="#fff"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{position: "absolute", bottom: 16}}>
                                        <Text style={[styles.headlineText, {fontSize: 31.9}]} key={i}>
                                            {article.title.length > 108 ? article.title.slice(0,100) + "..." : article.title}
                                        </Text>
                                        <View style={{
                                        flexDirection: "row", 
                                        marginBottom: 2.5, 
                                        marginHorizontal: "4.21%",
                                        alignItems: "center",
                                        }}>
                                            <Text style={[styles.shortNewsInfoText, {fontWeight: "bold"}]}>{article.clean_url}</Text>
                                            <Text style={{fontSize: 13, color: "#fff", paddingHorizontal: 5.2}}>{" • "}</Text>
                                            <View style={{
                                                backgroundColor: "rgba(255, 255, 255, 0.18)",
                                                alignSelf: "baseline",
                                                alignItems: "baseline",
                                                justifyContent: "center",
                                                borderRadius: 25,
                                            }}>
                                                <Text style={{
                                                    color: "#fff",
                                                    fontSize: 12.4,
                                                    fontFamily: "",
                                                    paddingVertical: 3.19,
                                                    paddingHorizontal: 10,
                                                }}>{readingTime} min read</Text>
                                            </View>
                                            <Text style={{fontSize: 13, color: "#fff", paddingHorizontal: 5.2}}>{" • "}</Text>
                                            <Text style={styles.shortNewsInfoText}>{FinalTime} ago</Text>
                                        </View>
                                    </View>
                                </LinearGradient>
                            </ImageBackground>
                            <View style={{flex: 1, paddingVertical: 0}} key={i+"%"}>
                                <ScrollView style={{flexGrow: 1,}} key={i}>
                                    <View style={[styles.authorContainer, props.isLightMode ? {backgroundColor: "#000"} : {backgroundColor: "aqua"}]} key={i+"/%1"}>
                                        <Ionicons name="person-circle" size={25} color={props.isLightMode ? "#fff" : "#121212"} key={i+"/%1/1"} />
                                        <Text selectable={true} key={i+"/%1/2"} style={{
                                            color: props.isLightMode ? "#fff" : "#121212",
                                            fontSize: 14.2,
                                            fontFamily: "",
                                            paddingRight: 7,
                                            paddingLeft: 7,
                                            paddingVertical: 7,
                                            letterSpacing: 1,
                                        }}>{(article.author && !(/\d/.test(article.author)) && (article.author.length < 25)) ? article.author : article.clean_url}</Text>
                                    </View>
                                    {/* Thank God! This "height" prop removes extra padding!!!!!!! */}{/* Q takes up more space*/}
                                    <View style={{flexDirection: "row", marginTop: 7, height: firstLetter === "Q" ? 69.1 : 67, marginLeft: 16, marginRight: 25, flex: 1}} key={i+"/%2"}> 
                                        <Text style={[styles.firstNewsLetterText, props.isLightMode ? {color: "#000"} : {color: "aqua"}]}>{firstLetter.toUpperCase()}</Text>
                                        <Text selectable={true} style={styles.firstTwoLinesText}>{firstTwoLines.replace(/\n/g, " ")}</Text>
                                    </View>
                                    <Text selectable={true} style={styles.mainNewsInfoText}>{restSummary}</Text>
                                    <TouchableOpacity 
                                        style={[styles.authorContainer, {marginBottom: 18}, props.isLightMode ? {backgroundColor: "#000"} : {backgroundColor: "aqua"}]}
                                        key={i}
                                        onPress={() => Linking.openURL(article.link)}
                                    >
                                        <Text style={{
                                            color: props.isLightMode ? "#fff" : "#121212",
                                            fontSize: 14.2,
                                            fontFamily: "",
                                            paddingRight: 7,
                                            paddingLeft: 7,
                                            paddingVertical: 7,
                                            letterSpacing: 1
                                        }}>Full story</Text>
                                        <MaterialCommunityIcons name="chevron-right-circle" size={24.1} color={props.isLightMode ? "#fff" : "#121212"} />
                                    </TouchableOpacity>
                                </ScrollView>
                            </View>
                        </View>
                    </Modal>

                    <TouchableOpacity style={[styles.imageNewsButtonContainer, i == 0 ? {marginLeft: 25} : {marginLeft: 0}]} onPress={() => setIsVisible(true)}>
                        <ImageBackground 
                            source={{uri: article.media ? article.media : "https://www.albertadoctors.org/images/ama-master/feature/Stock%20photos/News.jpg"}}
                            resizeMode="cover"
                            style={{width: 313, height: "100%"}}
                            imageStyle={styles.imageBG}
                            key={i}
                        >
                            <LinearGradient 
                                style={styles.imageOverlay} 
                                colors={["rgba(0, 0, 0, 0.88)", "rgba(0, 0, 0, 0.71)", "transparent", "transparent"]}
                                start={{x:0, y:1}}
                                end={{x:0, y:0}}
                            >
                                <Text style={styles.headlineText} key={i} >
                                    {article.title.length > 108 ? article.title.slice(0,100) + "..." : article.title}
                                </Text>
                                <View style={{
                                    flexDirection: "row", 
                                    marginBottom: 18, 
                                    marginHorizontal: "4.21%",
                                    alignItems: "center",
                                    }}>
                                    <Text style={[styles.shortNewsInfoText, {fontWeight: "bold"}]}>{article.clean_url}</Text>
                                    <Text style={{fontSize: 13, color: "#fff", paddingHorizontal: 5.2}}>{" • "}</Text>
                                    <Text style={styles.shortNewsInfoText}>{FinalTime} ago</Text>
                                </View>
                            </LinearGradient>
                        </ImageBackground>
                    </TouchableOpacity>
                </View> 
            );
        });
    }
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        paddingTop: 0,
        backgroundColor: "#fff",
        alignItems: "center",
        paddingBottom: 0,
    },
    imageNewsButtonContainer: {
        alignSelf: "center",
        marginLeft: 25,
        marginRight: 25,
        borderRadius: 25,
        height: "97%",
        width: 313,
        backgroundColor: "#000"
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
        fontFamily: "", 
        alignItems: "center",
        justifyContent: "center",
    },
    newsModalTopButtonsContainer: {
        alignSelf: "flex-start",
        flexDirection: "row",
        marginTop: 42.1,
        position: "absolute",
        justifyContent: "space-between",
        width: "100%", 
        paddingHorizontal: 25
    },
    authorContainer: {
        backgroundColor: "#000",
        alignSelf: "flex-start",
        marginHorizontal: "3.91%",
        marginTop: 18,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
        flexDirection: "row",
        paddingRight: 7,
        paddingLeft: 5.2,
    },
    mainNewsInfoText: {
        fontFamily: "",
        fontSize: 18,
        color: "rgba(124, 124, 124, 1.0)",
        marginRight: "4.21%",
        marginLeft: "4.21%",
        marginBottom: 7,
        lineHeight: 27,
    },
    firstNewsLetterText: {
        fontFamily: "",
        fontSize: 58,
        fontWeight: "bold",
        color: "#000",
        alignSelf: "baseline",
        // marginLeft: "4.21%",
    },
    firstTwoLinesText: {
        fontFamily: "",
        fontSize: 18,
        color: "rgba(124, 124, 124, 1.0)",
        alignSelf: "baseline",
        paddingRight: 25,
        marginLeft: 2.5,
        lineHeight: 27,
    }
});

export default TopImageNews;