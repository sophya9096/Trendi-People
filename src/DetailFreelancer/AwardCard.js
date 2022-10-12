import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";
import * as CONSTANT from '../Constants/Constant';
class AwardCard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View
          elevation={3}
          style={{
            flexDirection: "column",
            shadowColor: "#000000",
            shadowOpacity: 0.8,
            shadowRadius: 2,
            shadowOffset: { height: 1, width: 1 },
            backgroundColor: "#fafafa",
            width: "97%",
            margin: 5,
            borderRadius: 4,
            overflow: "hidden",
            shadowOffset: { width: 0, height: 2 },
            shadowColor: "#000",
            shadowOpacity: 0.2
          }}
        >
          <View style={{ flexDirection: "row", backgroundColor: "#fff" }}>
            <Image
              style={{
                borderRadius: 3,
                width: 60,
                marginBottom: 15,
                marginTop: 15,
                marginRight: 15,
                marginLeft: 20,
                height: 60
              }}
              source={this.props.AwardImage}
            />
            <View
              style={{
                flexDirection: "column",
                overflow: "hidden",
                marginRight: 30,
                display: "flex",
                alignContent: "center",
                alignSelf: "center",
                justifyContent: "center"
              }}
            >
              <Text
                style={{ fontSize: 13, color: "#323232", alignItems: "center" }}
              >
                {this.props.AwardDate}
              </Text>
              <Text style={{ marginRight: 50 }}>{this.props.AwardTitle}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
export default AwardCard;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowColor: "#000",
  }
});
