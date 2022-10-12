import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  FlatList
} from "react-native";
import { withNavigation } from "react-navigation";
import AntIcon from "react-native-vector-icons/AntDesign";
import CompleteJobLayout from "../Home/CompleteJobLayout";
import * as CONSTANT from "../Constants/Constant";
const Entities = require("html-entities").Html5Entities;
const entities = new Entities();
class JobbyCategorylist extends Component {
  state = {
    data: [],
    isLoading: true,
    fetchJobs: [],
  };
  componentWillMount() {
    this.fetchJobData();
  }
  fetchJobData = async () => {
    const { params } = this.props.navigation.state;
    const response = await fetch(
      CONSTANT.BaseUrl + "listing/get_jobs?listing_type=search&category=" + params.slug
    );
    const json = await response.json();
    this.setState({ fetchJobs: json, isLoading: false });
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
                Jobs By Category
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
          this.state.fetchJobs.length >= 1 && ("employer_name" in this.state.fetchJobs[0]) ?
        <FlatList
          data={this.state.fetchJobs}
          keyExtractor={(a, b) => b.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() =>
                this.props.navigation.navigate("DetailJobScreen", {
                  job_id: item.job_id
                })
              }
            >
              <CompleteJobLayout
                Completejobname={`${entities.decode(item.employer_name)}`}
                featuredCompleteJobColor={`${entities.decode(
                  item.featured_color
                )}`}
                imageUriCompleteJobfeatured={{ uri: `${item.featured_url}` }}
                Completejobtitle={`${entities.decode(item.project_title)}`}
                jobflagimageUri={{ uri: `${item.location.flag}` }}
                Completejoblevel={`${entities.decode(
                  item.project_level.level_title
                )}`}
                Completejobcountry={`${entities.decode(
                  item.location._country
                )}`}
                Completejobrate={`${entities.decode(item.project_cost)}`}
                Completejobduration={`${entities.decode(
                  item.project_duration
                )}`}
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
export default withNavigation(JobbyCategorylist);
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
