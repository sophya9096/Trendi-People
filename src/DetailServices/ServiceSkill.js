import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";
class ServiceSkill extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ color: "#999999", fontSize: 10 }}>{this.props.serviceskillName}</Text>
      </View>
    );
  }
}
export default ServiceSkill;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginBottom: 3,
    marginLeft: 20,
    marginRight: 5
  }
});
