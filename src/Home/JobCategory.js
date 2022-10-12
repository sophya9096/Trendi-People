import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
class JobCategory extends Component {
  render() {
    return (
      <View style={styles.shadow}>
        <View style={{ flex: 1 }}>
          <Image
            style={{ width: 45, height: 45, resizeMode: "cover" }}
            source={this.props.imageUri}
          />
        </View>
        <View
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-start",
            alignSelf: "center"
          }}
        >
          <Text numberOfLines={2}
            style={{
              fontSize: 14,
              color: "#323232",
              fontWeight: "300",
              overflow: "hidden",
              textAlign: "left",
            }}
          >
            {this.props.name}
          </Text>
        </View>
      </View>
    );
  }
}
export default JobCategory;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  shadow: {
    maxHeight: 70,
    display: "flex",
    padding: 10,
    width: 150,
    marginLeft: 5,
    shadowRadius: 10,
    borderWidth: 0.5,
    borderColor: "#dddddd",
    backgroundColor: "#ffffff",
    flexDirection: "row",
    borderRadius: 4,
    borderWidth: 0,
    borderColor: "transparent",
    elevation: 3,
    shadowOffset: { width: 0, height: 1 },
    shadowColor: "#000",
    shadowOpacity: 0.1,
    marginBottom: 5
  }
});
