import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import moment from "moment";

export default function JobsFlatList() {

  //--------------------GET METHOD----------------------
  const [data, setData] = useState();
  const [defaultData, setDefaultData] = useState();

  useEffect(() => {
    fetch("https://mobiloby.click/test/get_jobs.php")
      .then((response) => response.json())
      .then((usefulData) => {
        setData(usefulData);
        setDefaultData(usefulData);
      })
      .catch((e) => {
        console.error(`An error occurred: ${e}`);
      });
    // console.log(defaultData);
  }, []);

  function generateDate(startDate, endDate) {
    const current = moment();
    if (moment(startDate).isAfter(current)) {
      let diff = moment(startDate).diff(moment(current), "days");
      return diff + " gün sonra yayınlanacak";
    } else if (
      moment(endDate).isAfter(current) &&
      moment(current).isAfter(startDate)
    ) {
      let diff = moment(current).diff(moment(startDate), "days");
      return diff + " gündür yayında";
    } else if (moment(current).isAfter(endDate)) {
      let diff = moment(current).diff(moment(endDate), "days");
      return diff + " gün önce yayından kaldırılmış";
    }
  }

  return (
    <View>
      <FlatList
        data={defaultData?.jobs}
        contentContainerStyle={styles.container}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View
              style={{
                padding: 10,
                paddingVertical: 10,
                borderBottomWidth: 0.5,
                borderBottomColor: "#B2B2B2",
              }}
            >
              <Text style={styles.titleText}> {item.job_title}</Text>
              <Text
                style={{ paddingHorizontal: 10, paddingTop: 5, fontSize: 12 }}
              >
                İşveren: {item.job_owner}
              </Text>
              <Text style={styles.descriptionText}>{item.job_description}</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesome5 name="business-time" size={18} color="#9D9D9D" />
              <Text
                style={{
                  paddingLeft: 5,
                  paddingVertical: 15,
                  color: "#9D9D9D",
                }}
              >
                {generateDate(item.job_start_date, item.job_end_date)}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 310,
    marginHorizontal: 15,
    backgroundColor: "#0000",
  },
  itemContainer: {
    borderWidth: 0.5,
    borderColor: "#B2B2B2",
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#D8D8D8",
    // flexDirection: 'row',
  },
  titleText: {
    fontSize: 17,
    fontWeight: "bold",
    padding: 5,
    color: "#3B9AE1",
  },
  descriptionText: {
    padding: 10,
    paddingTop: 10,
  },
});
