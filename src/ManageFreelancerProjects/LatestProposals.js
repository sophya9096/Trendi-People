import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  FlatList,
  Alert,
  AsyncStorage
} from "react-native";
import { withNavigation } from "react-navigation";
import AntIcon from "react-native-vector-icons/AntDesign";
import LatestProposalCard from "./LatestProposalCard";
import * as CONSTANT from "../Constants/Constant";
import LatestJobsCard from  "../ManageEmployerJobs/LatestJobsCard";
const Entities = require("html-entities").Html5Entities;
const entities = new Entities();
class LatestProposals extends Component {
  state = {
    data: [],
    fetchProposal:[],
    isLoading: true,
  };
  componentWillMount() {
    this.fetchProposalData();
  }
  fetchProposalData = async () => {
    // const { params } = this.props.navigation.state;
    const uid = await AsyncStorage.getItem("projectUid");
    const response = await fetch(
      CONSTANT.BaseUrl + "dashboard/get_my_proposals?user_id=" + uid
    );
    const json = await response.json();
    this.setState({ fetchProposal: json, isLoading: false });
  };
  render() {
    const { isLoading } = this.state;
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
                Latest Proposals
              </Text>
            </View>
          </View>
        </View>
        {isLoading && (
          <View style={{ justifyContent: "center", height: "100%" }}>
            <ActivityIndicator
              size="small"
              color={CONSTANT.primaryColor}
              style={{
                height: 30,
                width: 30,
                borderRadius: 60,
                alignContent: "center",
                alignSelf: "center",
                justifyContent: "center",
                backgroundColor: "#fff",
                elevation: 5
              }}
            />
          </View>
        )}
        {
          this.state.fetchProposal.length >= 1 
          ?
          <FlatList
          data={this.state.fetchProposal}
          keyExtractor={(a, b) => b.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.9}
            >
             <LatestProposalCard
             title={`${entities.decode(item.title)}`}
             job_title={`${entities.decode(item.job_title)}`}
             status={`${entities.decode(item.status)}`}
             price={`${entities.decode(item.budget)}`}
             duration={`${entities.decode(item.duration)}`}
             cover={`${entities.decode(item.cover)}`}
             ID={`${item.ID}`}
             />
            </TouchableOpacity>
          )}
        />
          :
          <View style={styles.MainScrollArea}>
          <Image
            resizeMode={'contain'}
            style={styles.MainScrollImageStyle}
            source={require('../Images/nodata.png')}
          />
        </View>
        }
       
      </View>
    );
  }
}
export default withNavigation(LatestProposals);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  MainScrollArea: {
    flex: 1,
    marginTop: '40%',
    alignContent: 'center',
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  MainScrollImageStyle: {
    width: 250,
    height: 250,
  },
  MainScrollOopsText: {
    fontSize: 25,
    fontWeight: '700',
    marginVertical: 10,
  },
  MainScrollNoDataText: {
    fontSize: 17,
    fontWeight: '700',
  },
});
