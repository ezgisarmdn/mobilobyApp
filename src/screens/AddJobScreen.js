import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";
import React, { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { FontAwesome5 } from "@expo/vector-icons";

export default function AddJobScreen() {
  const [startDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [startDate, setStartDate] = useState();
  const [stringStartDate, setStringStartDate] = useState(
    "Başlangıç tarihi seçiniz"
  );
  const [endDatePickerVisible, setEndDatePickerVisible] = useState(false);
  const [endDate, setEndDate] = useState();
  const [stringEndDate, setStringEndDate] = useState("Bitiş tarihi seçiniz");
  const [jobTitle, setJobTitle] = useState("");
  const [jobOwner, setJobOwner] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const showStartDatePicker = () => {
    setStartDatePickerVisible(true);
  };
  const hideStartDatePicker = () => {
    setStartDatePickerVisible(false);
  };
  const handleStartDateConfirm = (startDate) => {
    console.log("A date has been picked: ", startDate);
    setStartDate(moment(startDate, "YYYY.MM.DD HH:mm"));
    setStringStartDate(moment(startDate).format("MMMM D, YYYY"));
    console.log("startDate: ", startDate);
    console.log("stringStartDate: ", stringStartDate);
    hideStartDatePicker();
  };
  const showEndDatePicker = () => {
    setEndDatePickerVisible(true);
  };
  const hideEndDatePicker = () => {
    setEndDatePickerVisible(false);
  };
  const handleEndDateConfirm = (endDate) => {
    console.log("A date has been picked: ", endDate);
    setEndDate(moment(endDate, "YYYY.MM.DD HH:mm"));
    setStringEndDate(moment(endDate).format("MMMM D, YYYY"));
    console.log("endDate: ", endDate);
    console.log("stringEndDate: ", stringEndDate);
    hideEndDatePicker();
  };

  //--------------------POST METHOD----------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      job_title: jobTitle,
      job_owner: jobOwner,
      job_start_date: startDate,
      job_end_date: endDate,
      job_description: jobDescription,
    };
    const result = await fetch("https://mobiloby.click/test/insert_job.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    // console.log(data);
    await result.json();

    Alert.alert('Yeni İş İlanı', 'Kaydedildi!', [
      {text: 'Tamam', onPress: () => console.log('OK Pressed')},
    ]);
  };

  return (
    <ScrollView>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Yeni İş İlanı</Text>
        <Text style={styles.text}>Lütfen yeni iş ilanı giriniz</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Başlık giriniz"
          placeholderTextColor="#B2B2B2"
          onChangeText={(e) => setJobTitle(e)}
          // value='Başlık'
        />
        <TextInput
          style={styles.input}
          // onChangeText={onChangeText}
          // value={text}
          placeholder="İş Sahibi(Ad Soyad) giriniz"
          placeholderTextColor="#B2B2B2"
          onChangeText={(e) => setJobOwner(e)}
        />
        <View style={styles.datePickerStyle}>
          <TouchableOpacity onPress={showStartDatePicker}>
            <View style={{ flexDirection: "row" }}>
              <FontAwesome5 name="calendar-alt" size={24} color="black" />
              <Text style={{ paddingLeft: 10, paddingTop: 5 }}>
                {stringStartDate}
              </Text>
            </View>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={startDatePickerVisible}
            mode="date"
            onConfirm={handleStartDateConfirm}
            onCancel={hideStartDatePicker}
          />
        </View>
        <View style={styles.datePickerStyle}>
          <TouchableOpacity onPress={showEndDatePicker}>
            <View style={{ flexDirection: "row" }}>
              <FontAwesome5 name="calendar-alt" size={24} color="black" />
              <Text style={{ paddingLeft: 10, paddingTop: 5 }}>
                {stringEndDate}
              </Text>
            </View>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={endDatePickerVisible}
            mode="date"
            onConfirm={handleEndDateConfirm}
            onCancel={hideEndDatePicker}
          />
        </View>
        <TextInput
          style={styles.multilineInput}
          // value={this.state.value}
          // onChangeText={text=>this.setState({value:text})}
          multiline={true}
          numberOfLines={7}
          placeholder="Açıklama yazınız"
          onChangeText={(e) => setJobDescription(e)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>KAYDET</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    // backgroundColor: 'yellow',
    height: 150,
    justifyContent: "center",
    paddingLeft: 37,
    paddingTop: 50,
  },
  inputContainer: {
    height: 400,
    alignItems: "center",
    // backgroundColor: "yellow",
  },
  buttonContainer: {
    height: 130,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    paddingBottom: 10,
    color: "#3B9AE1",
  },
  text: {
    fontSize: 17,
    paddingLeft: 5,
  },
  input: {
    height: 50,
    margin: 12,
    borderBottomWidth: 1.2,
    borderBottomColor: "#B2B2B2",
    padding: 10,
    width: 320,
  },
  multilineInput: {
    paddingTop: 20,
    marginLeft: 10,
    marginTop: 10,
    width: 328,
    lineHeight: 23,
    flex: 2,
    textAlignVertical: "top",
    padding: 10,
    borderBottomWidth: 1.2,
    borderBottomColor: "#B2B2B2",
  },
  datePickerStyle: {
    height: 70,
    width: 325,
    justifyContent: "center",
    marginLeft: 10,
    borderBottomWidth: 1.2,
    borderBottomColor: "#B2B2B2",
    paddingHorizontal: 10,
  },
  button: {
    height: 50,
    width: 335,
    marginLeft: 10,
    backgroundColor: "#3B9AE1",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
