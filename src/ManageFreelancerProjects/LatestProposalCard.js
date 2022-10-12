import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import RNFetchBlob from 'rn-fetch-blob';
import * as CONSTANT from '../Constants/Constant';
class LatestProposalCard extends Component {
  state = {
    data: [],
    fetchFiles: [],
    isLoading: true,
  };
  FileDownload = async () => {
    const response = await fetch(
      CONSTANT.BaseUrl + 'dashboard/get_attachments?id=' + this.props.ID,
    );
    const json = await response.json();
    this.setState(
      {fetchFiles: json[0].attachment, isLoading: false},
      this.fetchfile.bind(this),
    );
  };
  fetchfile = () => {
    if (this.state.fetchFiles != '') {
      const {dirs} = RNFetchBlob.fs;
      RNFetchBlob.config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          mediaScannable: true,
          title: this.state.title,
          path: `${dirs.DownloadDir}/` + this.props.title,
        },
      })
        .fetch('GET', this.state.fetchFiles, {})
        .then(res => {})
        .catch(e => {
          console.log(e);
        });
    } else {
      Alert.alert('Sorry', 'No Attachment Avaailable');
    }
  };
  downloadFile = async () => {
    try {
      const granted_permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to memory to download the file ',
        },
      );
      if (granted_permission === PermissionsAndroid.RESULTS.GRANTED) {
        this.FileDownload();
      } else {
        Alert.alert(
          'Permission Denied!',
          'You need to give storage permission to download the file',
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };
  render() {
    return (
      <View>
        <View style={styles.shadow}>
          <View
            style={{
              borderRadius: 5,
              width: 100,
              alignItems: 'center',
              paddingVertical: 8,
              margin: 10,
              borderColor: '#ddd',
              borderWidth: 1,
            }}>
            <Text>{this.props.status}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingLeft: 10,
              paddingRight: 10,
              alignItems: 'center',
            }}>
            <AntIcon
              name="checkcircle"
              color={CONSTANT.primaryColor}
              size={13}
              style={{alignItems: 'center'}}
            />
            {/* <Text
              style={{
                fontSize: 13,
                fontWeight: '300',
                overflow: 'hidden',
                marginTop: 1,
                marginLeft: 10,
                color: '#323232',
                textAlign: 'left',
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              {this.props.title}
            </Text> */}
            <Text
              numberOfLines={5}
              style={{
                fontSize: 17,
                marginRight: 10,
                fontWeight: '700',
                overflow: 'hidden',
                textAlign: 'left',
                color: '#323232',
                marginBottom: 10,
                marginLeft: 10,
                top: 5,
                textTransform: 'capitalize',
              }}>
              {this.props.job_title}
            </Text>
          </View>
          {/* <View
            style={{
              alignSelf: 'auto',
            }}>
            <Text
              numberOfLines={5}
              style={{
                fontSize: 17,
                marginRight: 10,
                fontWeight: '700',
                overflow: 'hidden',
                textAlign: 'left',
                color: '#323232',
                marginBottom: 10,
                marginLeft: 10,
                top: 5,
              }}>
              {this.props.job_title}
            </Text>
          </View> */}
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 20,
              paddingLeft: 10,
              paddingRight: 10,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 21,
                fontWeight: '700',
                overflow: 'hidden',
                marginTop: 1,
                color: CONSTANT.primaryColor,
                textAlign: 'left',
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              {this.props.price}
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontWeight: '300',
                overflow: 'hidden',
                marginTop: 1,
                marginLeft: 10,
                color: '#323232',
                textAlign: 'left',
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              ( {this.props.duration} )
            </Text>
            {/* <Text
              style={{
                fontSize: 15,
                fontWeight: '300',
                overflow: 'hidden',
                marginTop: 1,
                marginLeft: 10,
                marginBottom: 10,
                color: '#323232',
                textAlign: 'left',
              }}>
              {this.props.cover}
            </Text> */}
          </View>

          {this.props.status === 'Pending' ? (
            <View
              style={{
                height: 40,
                flexDirection: 'row',
                borderTopColor: '#ddd',
                borderTopWidth: 0.5,
              }}>
              <TouchableOpacity
                style={{
                  width: '25%',
                  borderRightWidth: 0.5,
                  borderRightColor: '#ddd',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <AntIcon
                  name="link"
                  color={'#323232'}
                  size={15}
                  style={{alignItems: 'center'}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: '25%',
                  borderRightWidth: 0.5,
                  borderRightColor: '#ddd',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <AntIcon
                  name="mail"
                  color={'#323232'}
                  size={15}
                  style={{alignItems: 'center'}}
                />
              </TouchableOpacity>

              <TouchableOpacity
                // onPress={() => this.props.navigation.navigate('')}
                style={{width: '50%'}}>
                <Text
                  style={{
                    color: CONSTANT.primaryColor,
                    alignSelf: 'center',
                    fontSize: 12,
                    top: 12,
                  }}>
                  Edit Proposal
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                height: 40,
                flexDirection: 'row',
                borderTopColor: '#ddd',
                borderTopWidth: 0.5,
              }}>
              <TouchableOpacity
                style={{
                  width: '50%',
                  borderRightWidth: 0.5,
                  borderRightColor: '#ddd',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <AntIcon
                  name="link"
                  color={'#323232'}
                  size={15}
                  style={{alignItems: 'center'}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: '50%',
                  borderRightWidth: 0.5,
                  borderRightColor: '#ddd',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <AntIcon
                  name="mail"
                  color={'#323232'}
                  size={15}
                  style={{alignItems: 'center'}}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  }
}
export default LatestProposalCard;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  shadow: {
    display: 'flex',
    margin: 5,
    shadowRadius: 10,
    borderWidth: 0.5,
    borderColor: '#dddddd',
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    borderRadius: 4,
    borderWidth: 0,
    borderColor: 'transparent',
    elevation: 3,
    shadowOffset: {width: 0, height: 1},
    shadowColor: '#000',
    shadowOpacity: 0.1,
  },
});
