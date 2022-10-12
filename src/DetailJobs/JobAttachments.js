import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";
class JobAttachments extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View
          elevation={3}
          style={{
            marginLeft: 10,
            flexDirection: "column",
            shadowColor: "#000000",
            shadowOpacity: 0.8,
            shadowRadius: 2,
            shadowOffset: { height: 1, width: 1 },
            backgroundColor: "#ffffff",
            width: 150,
            marginBottom: 10,
            marginTop: 10,
            marginRight: 2,
            borderRadius: 4,
            overflow: "hidden"
          }}
        >
          <Image
            style={{
              borderRadius: 3,
              marginTop: 15,
              width: 80,
              alignItems: "center",
              alignSelf: "center",
              height: 80
            }}
            source={{ uri: "https://i.postimg.cc/VkzqqNsp/Untitled-1.png" }}
          />
          <Text
            style={{ textAlign: "center", alignSelf: "center", height: 20 }}
          >
            {this.props.attachmentName}
          </Text>
          <Text
            style={{
              textAlign: "center",
              alignSelf: "center",
              marginBottom: 15
            }}
          >
            {this.props.attachmentSize}
          </Text>
        </View>
      </View>
    );
  }
}
export default JobAttachments;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginBottom: 10
  }
});
