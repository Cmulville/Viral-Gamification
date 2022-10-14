import * as React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import {useState} from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const SearchBar = ({searchPhrase, setSearchPhrase}) => {
      const [clicked, setClicked] = useState(false);
      return (
              <View style={styles.container}>
                <View
                  style={clicked ? styles.searchBar__clicked 
                                : styles.searchBar__unclicked}>

                  <Ionicons
                    name="search-outline"
                    size={20}
                    color="black"
                    style={{ marginLeft: 1 }}/>

                  <TextInput
                    style={styles.input}
                    placeholder="Search"
                    value={searchPhrase}
                    onChangeText={setSearchPhrase}
                    onFocus={() => {
                                    setClicked(true);
                                  }}
                  />

                  {/* cross Icon, depending on whether the search bar is clicked or not */}
                  {clicked && (<Ionicons name="close-outline" size={20} color="black"
                                        style={{padding:1}} onPress={() => {setSearchPhrase("")}}/>
                              )}
                </View>

                {/* cancel button, depending on whether the search bar is clicked or not */}
                {clicked && (
                            <View>
                              <Button
                                title="Cancel"
                                onPress={() => {Keyboard.dismiss();
                                                setClicked(false);
                                                }}
                              ></Button>
                            </View>
                          )}
              </View>
            );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
      container: {
              margin: 15,
              justifyContent: "flex-start",
              alignItems: "center",
              flexDirection: "row",
              width: "90%",

            },

      searchBar__unclicked: {
              padding: 10,
              flexDirection: "row",
              width: "95%",
              backgroundColor: "#d9dbda",
              borderRadius: 15,
              alignItems: "center",
            },
      searchBar__clicked: {
              padding: 10,
              flexDirection: "row",
              width: "80%",
              backgroundColor: "#d9dbda",
              borderRadius: 15,
              alignItems: "center",
              justifyContent: "space-evenly",
            },

      input: {
              fontSize: 20,
              marginLeft: 10,
              width: "90%",
              color: "black",
            },
});
