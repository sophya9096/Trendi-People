import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Button,
  StatusBar,
  FlatList,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";
import { Header } from "react-native-elements";
import FreelancerCategory from "../Home/FreelancerCategory";
const Entities = require("html-entities").Html5Entities;
const entities = new Entities();
import * as CONSTANT from '../Constants/Constant';
class SearchResultFreelancer extends Component {
  constructor() {
    super();
    this.onEndReachedCalledDuringMomentum = true;
    this.state = {
    data: [],
    isLoading: true,
    Toataldata: "",
    page: 1,
    fetching_from_server: false,
  };
  this.offset = 1;
}
  componentDidMount() {
    this.fetchFreelancerData();
  }
  fetchFreelancerData = async () => {
    const Pid = await AsyncStorage.getItem("projectProfileId");
    const { params } = this.props.navigation.state;
    var _location = this.get_search_array(
      params.projectLocationKnown,
      "location"
    );
    var _skills = this.get_search_array(params.SkillsKnown, "skills");
    var _type = this.get_search_array(params.freelancerLevelKnown, "type");
    var _english_level = this.get_search_array(
      params.englishKnown,
      "english_level"
    );
    var _language = this.get_search_array(params.LangKnown, "language");
    const response = await fetch(
      CONSTANT.BaseUrl +
      "listing/get_freelancers?listing_type=search&profile_id=" + Pid + "&keyword=" +
      params.title +
      _location +
      _skills +
      _type +
      _english_level +
      _language+ "&page_number=" +
      this.offset
    );
    const json = await response.json();
    if (Array.isArray(json) && json[0] && json[0].type && json[0].type === 'error') {
      this.setState({ data: [], isLoading: false }); // empty data set 
    } else {
      this.offset = this.offset + 1;
      this.setState({
        data: [...this.state.data, ...this.state.data.concat(json)],
        isLoading: false
      });
      this.setState({ Toataldata: json[0].count_totals, isLoading: false });
    }
  };
  get_search_array = (term, key) => {
    var _list = "";
    for (var i = 0; i < term.length; i++) {
      _list += "&" + key + "[]=" + term[i];
    }
    return _list;
  };
  _listEmptyComponent = () => {
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: "center", height: '100%', alignSelf: 'center', alignItems: 'center' }}>
        <Image style={{ resizeMode: 'contain', height: 150, width: 150 }}
          source={require('../Images/nodata.png')}
        />
      </View>
    )
  }
  loadMoreData = async() => {
    
    const Pid = await AsyncStorage.getItem("projectProfileId");
    const { params } = this.props.navigation.state;
    var _location = this.get_search_array(
      params.projectLocationKnown,
      "location"
    );
    var _skills = this.get_search_array(params.SkillsKnown, "skills");
    var _type = this.get_search_array(params.freelancerLevelKnown, "type");
    var _english_level = this.get_search_array(
      params.englishKnown,
      "english_level"
    );
    var _language = this.get_search_array(params.LangKnown, "language");
    //On click of Load More button We will call the web API again
    this.setState({ fetching_from_server: true }, () => {
      fetch(
        CONSTANT.BaseUrl +
        "listing/get_freelancers?listing_type=search&profile_id=" + Pid + "&keyword=" +
        params.title +
        _location +
        _skills +
        _type +
        _english_level +
        _language+ "&page_number=" +
        this.offset
      )
        //Sending the currect offset with get request
        .then(response => response.json())
        .then(responseJson => {
          //Successful response from the API Call

          //After the response increasing the offset for the next API call.
          if (
            Array.isArray(responseJson) &&
            responseJson[0] &&
            responseJson[0].type &&
            responseJson[0].type === "error"
          ) {
            this.setState({ data: [], isLoading: false }); // empty data set
          } else {
            this.offset = this.offset + 1;
            this.setState({
              data: this.state.data.concat(responseJson),
              isLoading: false,
              fetching_from_server: false
            });
            //                   this.setState({Toataldata: responseJson[0].totals , isLoading: false});
          }
        })
        .catch(error => {
          console.error(error);
        });
    });
  };
  renderFooter() {
    return (
      //Footer View with Load More button
      <View>
        {this.state.Toataldata.toString() != this.state.data.length ? (
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={this.loadMoreData}
              style={styles.loadMoreBtn}
            >
              <Text style={styles.btnText}>Load More</Text>
              {this.state.fetching_from_server ? (
                <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
              ) : null}
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  }
  render() {
    const { params } = this.props.navigation.state;
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
            }}>
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
                Search Result Freelancers
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
          this.state.data != "" &&
          <View>
            <Text style={{fontSize:18 , margin:10 , fontWeight:'700'}}>{this.state.data[0].count_totals} Freelancers found:</Text>
          </View>
        }
        <FlatList
          style={{ paddingLeft: 5 }}
          data={this.state.data}
          ListEmptyComponent={this._listEmptyComponent}
          keyExtractor={(x, i) => i.toString()}
          renderItem={({ item }) =>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() =>
                this.props.navigation.navigate("DetailFreelancerScreen", {
                  profile_id: item.profile_id,
                  user_id: item.user_id
                })
              }>
              <FreelancerCategory
                imageUrifreelancer={{ uri: `${item.profile_img}` }}
                imageUrifeatured={{ uri: `${item.badge.badget_url}` }}
                featuredColor={`${entities.decode(item.badge.badget_color)}`}
                flagimageUri={{ uri: `${item.location.flag}` }}
                freelancername={`${entities.decode(item.name)}`}
                title={`${entities.decode(item._tag_line)}`}
                rate={`${entities.decode(item._perhour_rate)}`}
                country={`${entities.decode(item.location._country)}`}
                Fav_Color={`${entities.decode(item.favorit)}`}
                fav_user_id={`${entities.decode(item.user_id)}`}
              />
            </TouchableOpacity>
            
          }
          ListFooterComponent={this.renderFooter.bind(this)}
        />
      </View>
    );
  }
}
export default SearchResultFreelancer;
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  footer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  loadMoreBtn: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: CONSTANT.primaryColor,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  btnText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
    fontFamily:CONSTANT.PoppinsMedium,
  },
});
