import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  AsyncStorage,
  Alert
} from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";
import MultiSelect from "react-native-multiple-select";
import axios from "axios";
import * as CONSTANT from '../Constants/Constant';
import { Header } from "react-native-elements";
class SendReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Uid: "",
      EmployerJobsKnown: "",
      Description: ""
    };
  }
  componentDidMount() {
    this.fetchReportJobReason();
  }
  fetchReportJobReason = async () => {
    const response = await fetch(
      CONSTANT.BaseUrl + "taxonomies/get_list?list=reason_type"
    );
    const json = await response.json();
    this.setState({ EmployerJobs: json });
  };
  SendOffer = async () => {
    const { EmployerJobsKnown, Description } = this.state;
    const Uid = await AsyncStorage.getItem("projectUid");
    const { params } = this.props.navigation.state;
    axios
      .post(
        CONSTANT.BaseUrl + "chat/send_offer",
        {
          id: Uid,
          user_id: params.user_id,
          reason: EmployerJobsKnown[0],
          description: Description,
          type: "project"
        }
      )
      .then(async response => {
        Alert.alert("Report Send Successfully", response.message);
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    const { Description } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={CONSTANT.statusBarColor} barStyle="light-content" />
        <View
          style={{
            height: 60,
            paddingLeft: 15,
            paddingRight: 15,
            width: "100%",
            backgroundColor: CONSTANT.statusBarColor,
            flexDirection: "row",
            shadowOffset: { width: 0, height: 2 },
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 10
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack(null)}
            style={{
              flexDirection: "column",
              width: "20%",
              display: "flex",
              alignContent: "center",
              alignSelf: "center",
              justifyContent: "center"
            }}
          >
            <AntIcon name="back" size={25} color={"#fff"} />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "column",
              width: "60%",
              display: "flex",
              alignContent: "center",
              alignSelf: "center",
              justifyContent: "center"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                display: "flex",
                alignSelf: "center"
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "500",
                  color: "#fff",
                  height: 30,
                  marginTop: 9
                }}
              >
                Send Report
              </Text>
            </View>
          </View>
        </View>
        <ScrollView style={{ flexDirection: "column" }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "500",
              colorL: "#000",
              marginLeft: 15,
              marginTop: 15
            }}
          >
            Send Report
          </Text>
          <View
            style={{
              marginBottom: 20,
              backgroundColor: "#fff",
              paddingLeft: 15,
              paddingRight: 15,
              marginTop: 15
            }}
          >
            <MultiSelect
              ref={component => {
                this.multiSelect = component;
              }}
              onSelectedItemsChange={value =>
                this.setState({ EmployerJobsKnown: value })
              }
              uniqueKey="value"
              items={this.state.EmployerJobs}
              selectedItems={this.state.EmployerJobsKnown}
              borderBottomWidth={0}
              single={true}
              inputContainerStyle={{ borderBottomColor: "transparent" }}
              searchInputPlaceholderText="Search Reason..."
              selectText="Pick Reason To Leave"
              styleMainWrapper={{backgroundColor:'#fff' , borderRadius:4 , marginTop:10   }}
              styleDropdownMenuSubsection={{backgroundColor:'#fff' , paddingRight:-7  , height:60 , paddingLeft:10  , borderWidth:0.6 , borderColor:'#fff' , borderColor:'#dddddd' , borderRadius:4}}

              onChangeInput={text => console.log(text)}
              displayKey="title"
              submitButtonText="Submit"
            />
            <TextInput
              underlineColorAndroid="transparent"
              style={{
                marginBottom: 20,
                borderColor: "#807f7f",
                borderWidth: 0.2,
                borderRadius: 4,
                fontSize: 15,
                padding: 5,
                height: 150,
                textAlignVertical: "top"
              }}
              name="username"
              onChangeText={Description => this.setState({ Description })}
              placeholder="Description"
              placeholderTextColor="#807f7f"
            />
            <TouchableOpacity
              onPress={this.SendOffer}
              style={{
                alignItems: "center",
                height: 40,
                margin: 20,
                borderRadius: 4,
                width: "50%",
                alignSelf: "center",
                backgroundColor: CONSTANT.primaryColor
              }}
            >
              <Text
                style={{
                  alignSelf: "center",
                  alignItems: "center",
                  textAlign: "center",
                  color: "#fff",
                  paddingTop: 10
                }}
              >
                Send Report
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default SendReport;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7"
  }
});
