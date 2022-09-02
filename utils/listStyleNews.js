import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions, RefreshControl, TouchableOpacity, ImageBackground, Modal, SafeAreaView, Linking, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { getFirstTwo, getReadingTime, ShareNews, getCurrDateTime, convertTime, formatDate, getSlicePoint } from './helpers';

const ListStyleNews = (props) => {

    if(props.articles){
        return props.articles.map((article, i) => {
            const [isVisible, setIsVisible] = useState(false); // Each modal needs its own State!, not a common one, which will just make all visible at the same time!

            // The point after which the first two lines begin after extracting the first "VALID" character
            const slicePoint = getSlicePoint(article.summary);

            const firstLetter = article.summary ? article.summary.slice(slicePoint, slicePoint+1) : "null summary";
            const firstTwoLines = article.summary  ? getFirstTwo(article.summary.slice(slicePoint+1), 58) : "null summary";
            const restSummary = article.summary ? article.summary.slice(firstTwoLines.length+slicePoint+1).replace(/\s\s+/g, '\n\n') : "null summary";

            // passing length of article, trim() removes whitespace from both ends
            const readingTime = getReadingTime(article.summary.trim().length);
            const titleNumWords = article.title.split(' ').length;

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
                                            <Text style={[styles.modalshortNewsInfoText, {fontWeight: "bold"}]}>{article.clean_url}</Text>
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
                                            <Text style={styles.modalshortNewsInfoText}>{FinalTime} ago</Text>
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
                                    {/* This "height" prop removes extra padding! */}
                                    <View style={{flexDirection: "row", marginTop: 7, height: firstLetter === "Q" ? 69.1 : 67, marginRight: 25, flex: 1, marginLeft: 16}} key={i+"/%2"}> 
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

                    <TouchableOpacity style={[styles.newsContainer, props.isLightMode ? {borderBottomColor: "#b3b3b3"}: {borderBottomColor: "#404040"}]} key={i+'%'} onPress={() => setIsVisible(true)}>
                        <Image 
                            source={{uri: article.media ? article.media : "https://www.albertadoctors.org/images/ama-master/feature/Stock%20photos/News.jpg"}}
                            style={[styles.newsImageStyle, (titleNumWords <= 5) ? {height: "108%", width: "52%"} : ""]}
                            key={i+'/%'}
                        />
                        <View style={{flexDirection: "column", flex: 1, paddingLeft: "2.5%"}} key={i}>
                            <Text style={[styles.newsHeadlineText, props.isLightMode ? {color: "#000"}: {color: "#fff"}]}>
                                {article.title.length > 108 ? article.title.slice(0,100) + "..." : article.title}
                            </Text>
                            <View key={i} style={{
                                flexDirection: "row", 
                                marginLeft: 0,
                                alignItems: "center",
                                marginTop: "2.5%",
                                flex: 1,
                            }}>
                                <Text style={[styles.shortNewsInfoText, {fontWeight: "bold"}, props.isLightMode ? {color: "#000"}: {color: "#b3b3b3"}]}>
                                    {article.clean_url.length > 16 ? article.clean_url.slice(0,16) + "..." : article.clean_url}
                                </Text>
                                <Text style={{fontSize: 11.5, color: props.isLightMode ? "#000" : "#b3b3b3", paddingHorizontal: 5.2}}>{"•"}</Text>
                                <Text style={[styles.shortNewsInfoText, props.isLightMode ? {color: "#000"}: {color: "#b3b3b3"}]}>{FinalTime} ago</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>        
            );
        });
    }
}

const styles = StyleSheet.create({
    newsContainer: {
        flex: 1,
        flexDirection: "row",
        paddingVertical: 25,
        marginHorizontal: 18,
        borderBottomWidth: 1,
        borderBottomWidth: 0.52,
        paddingHorizontal: 7,
    },
    newsImageStyle: {
       width: 151,
       height: "102.4%",
       resizeMode: "cover",
       borderRadius: 18,
    },
    newsHeadlineText: {
        color: "#000",
        fontSize: 18.4,
        fontFamily: "",
        fontWeight: "bold",
        lineHeight: 25,
    },
    shortNewsInfoText: {
        color: "rgba(0, 0, 0, 0.52)",
        fontSize: 10.8,
        fontFamily: "", // IMPORTANT NOTE: Gotta add this to show all characters!!!!!!!
        alignItems: "center",
        justifyContent: "center",
    },
    newsModalTopButtonsContainer: {
        alignSelf: "flex-start",
        flexDirection: "row",
        marginTop: 42.1,
        position: "absolute",
        justifyContent: "space-between",
        width: "100%", // This is what makes alignement space-between work because before this width was not 100%
        paddingHorizontal: 25
    },
    authorContainer: {
        backgroundColor: "#000",
        alignSelf: "flex-start",
        marginHorizontal: "4.21%",
        marginTop: 18,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 52,
        flexDirection: "row",
        paddingLeft: 5.2,
        paddingRight: 7
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
    },
    firstTwoLinesText: {
        fontFamily: "",
        fontSize: 18,
        color: "rgba(124, 124, 124, 1.0)",
        alignSelf: "baseline",
        paddingRight: 25,
        marginLeft: 2.5,
        lineHeight: 27,
    },
    headlineText: {
        color: "#fff",
        fontSize: 25,
        fontWeight: "700",
        fontFamily: "",
        paddingBottom: 8.8,
        marginHorizontal: "4.21%",
    },
    modalshortNewsInfoText: {
        color: "#fff",
        fontSize: 12.4,
        fontFamily: "",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default ListStyleNews;