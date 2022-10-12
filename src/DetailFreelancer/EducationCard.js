import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";
import * as CONSTANT from '../Constants/Constant';
import HTML from 'react-native-render-html';
class EducationCard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View
          elevation={3}
          style={{
            paddingBottom: 10,
            paddingTop: 10,
            paddingLeft: 20,
            paddingRight: 20,
            flexDirection: "column",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowColor: "#000",
            backgroundColor: "#ffffff",
            width: "97%",
            marginBottom: 5,
            marginTop: 5,
            marginLeft: 5,
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <Text style={{ fontSize: 15 }}>{this.props.title}</Text>
          <View style={{ flexDirection: "row", marginTop: 7 }}>
            <AntIcon
              name="home"
              color={"#323232"}
              size={13}
              style={{ alignSelf: "center" }}
            />
            <Text style={{ fontSize: 10, paddingLeft: 10, paddingRight: 10 }}>
              {this.props.company}
            </Text>
            <AntIcon
              name="calendar"
              color={"#323232"}
              size={13}
              style={{ alignSelf: "center" }}
            />
            <Text style={{ fontSize: 10, paddingLeft: 10, paddingRight: 10 }}>
              {this.props.date}
            </Text>
          </View>
          <View style={{ paddingTop: 17 }}>
            <HTML html={this.props.content} imagesMaxWidth={Dimensions.get('window').width} />
          </View>
          {/* <Text style={{ fontSize: 13, paddingTop: 17 }}>
            {this.props.content}
          </Text> */}
        </View>
      </View>
    );
  }
}
export default EducationCard;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowColor: "#000",
  }
});
