import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";
class JobSkill extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.skillName}</Text>
      </View>
    );
  }
}
export default JobSkill;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 5
  }
});
