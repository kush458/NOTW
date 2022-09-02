import React from "react";
import { Alert, Share } from 'react-native';

const getFirstTwo = (article, numChars) => {
    const firstTwoLinesList = article.split(' ').slice(0, 13);
    let ans = '';
    
    while(firstTwoLinesList.join(' ').length > numChars){
        firstTwoLinesList.pop();
    }
    ans = firstTwoLinesList.join(' ');

    return ans;
}; 

const getReadingTime = (articleLength) => {
    
    const charsPerMin = 225;
    
    // If summary not provided 7 mins is the default reading time of the full content, 
    // else give estimated reading time of the summary
    const readingTime = (articleLength < charsPerMin) ? 7 : Math.ceil(articleLength / charsPerMin);

    return readingTime;
}

const ShareNews = async (url) => {
    try {
        const result = await Share.share({
            message: url,
        })
    } catch (e) {
        Alert.alert(e);
    }
}

function convertTime (ms) {
    
    var Time = ms;
    const possibleTimes = [];
    const checkList = { 'sec': 1000, 'min': 60, 'hr': 60, 'days': 24 };
    
    for (var key in checkList){
      Time /= checkList[key];
      checkList[key] = Time;
    }
      
    let ans = '';
    for (var key in checkList){
      if (checkList[key] > 1){
        possibleTimes.push(key);
      }
    }
    
    ans = possibleTimes.pop();
    return Math.floor(checkList[ans]) + ' ' + ans;
}

function isDigit(val) {
    return String(+val).charAt(0) == val;
}

const formatDate = (givenDate) => {
    const date = givenDate.split(' ');
    return date.slice(0, 1) + "T" + date.slice(1) + "Z";
}

const getCurrDateTime = () => {
    //Thank God UTC TIME Works!!!!!!!

    let today = new Date();

    let Month = isDigit(today.getUTCMonth() + 1) ? "0"+(today.getUTCMonth() + 1) : (today.getUTCMonth() + 1);
    let todayDate = isDigit(today.getUTCDate()) ? "0"+(today.getUTCDate()) : (today.getUTCDate());
    let date = today.getUTCFullYear() + "-" + (Month) + "-" + todayDate;

    let hrs = isDigit(today.getUTCHours()) ? "0"+(today.getUTCHours()) : (today.getUTCHours());
    let mins = isDigit(today.getUTCMinutes()) ? "0"+(today.getUTCMinutes()) : (today.getUTCMinutes());
    let secs = isDigit(today.getUTCSeconds()) ? "0"+(today.getUTCSeconds()) : (today.getUTCSeconds());
    let Time = hrs + ":" + mins + ":" + secs;
    return date + "T" + Time + "Z";
  }

const getSlicePoint = (text) => {
    let i = 0;

    if(text === null){
        return i;
    }

    while(!(/^[a-zA-Z]+$/.test(text.slice(i, i+1)))){
        i = i + 1;
    }

    return i;
}

export {getReadingTime, getFirstTwo, ShareNews, getCurrDateTime, convertTime, formatDate, getSlicePoint};