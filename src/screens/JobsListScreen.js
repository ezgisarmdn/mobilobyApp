import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import JobsFlatList from "../components/JobsFlatList";

export default function JobsListScreen({navigation}) {
  return (
    <View>
      <JobsFlatList navigation={navigation} />
    </View>
  )
}

const styles = StyleSheet.create({})





