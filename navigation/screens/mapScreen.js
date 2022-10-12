import * as React from "react";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  icon,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";
import { randomCirclePoint } from "random-location";
import { tabContext } from "../../tabContext";
import PointSystem from "../../pointSystem";

export default function MapScreen() {
  const UNIQUEITEMS = 3;
  // constant that stores a pin and method (setpin) that changes it. values are just dummy data
  const birsbane = { latitude: -27.4705, longitude: 153.026 };
  const uq = { latitude: -27.4975, longitude: 153.0137 };
  const [pin, setPin] = React.useState({
    latitude: -27.470125,
    longitude: 153.021072,
  });
  const [distance, setDistance] = React.useState({ thing: 0 });
  const [user, setUser] = React.useState("");
  const [testuser, setTestUser] = React.useState({ latitude: 0, latitude: 0 });
  const { screenColors } = React.useContext(tabContext)
  const { addPoints } = React.useContext(tabContext)
  // const [items, setItems] = React.useState({
  //   ids: [],
  //   idtypes: [],
  //   latitude: [],
  //   latitude: [],
  // });
  const [friends, setFriends] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const [items, setItems] = React.useState([]);

  const itemNames = {
    0: 'Sanitizer',
    1: 'Gloves',
    2: 'Face Mask'
  }

  const getItemName = (itemType) => {
    return itemNames[itemType]
  }

  const [initialCentre, setInitialCentre] = React.useState({
    latitude: 0,
    longitude: 0,
  });

  //Will store user using context
  const getUser = async () => {
    try {
      if (user != "") {
          return;
      }
      const value = await AsyncStorage.getItem("user");
      if (value != null) {
        setUser(JSON.parse(value));
      } else {
        return null;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const distanceUsers = () => {
    getUser();
    Axios.post(
      "https://deco3801-betterlatethannever.uqcloud.net/users/distance",
      {
        username: user,
      }
    ).then((response) => {
        setUsers(response.data.users);
        console.log("users", users);
    });
  }

  const infect = (username) => {
    Axios.post(
      "https://deco3801-betterlatethannever.uqcloud.net/users/infect",
      {
        username: username,
      }
    ).then((response) => {
        Alert.alert("Infected", "Username must not be empty", [{text:"Ok"}]);
        console.log("infected", {username});
        
    });
  }

  const contact = () => { 
    for (var i = 0; i < users.length; i++) {
      let dist = calculateDistance(pin.latitude, pin.longitude, users[i].Latitude, users[i].Longitude);
      if (dist < 100){
        infect(users[i].Username);
      }
    }
  }

  //Retrieves list of friends from the backend
  const myFriends = () => {
    getUser();
    Axios.post(
      "https://deco3801-betterlatethannever.uqcloud.net/friends/approved",
      {
        username: user,
      }
    ).then((response) => {
      setFriends(response.data.friends);
      console.log("friends", friends);
    });
  };

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  const calculateDistance = (lat1, long1, lat2, long2) => {
    //birsbane is lat 1
    //uq lat 2
    let R = 6371000; // metres
    let phi1 = (lat1 * Math.PI) / 180; // φ, λ in radians
    let phi2 = (lat2 * Math.PI) / 180;
    let deltaphi = ((lat2 - lat1) * Math.PI) / 180;
    let deltalambda = ((long2 - long1) * Math.PI) / 180;
    let a =
      Math.sin(deltaphi / 2) * Math.sin(deltaphi / 2) +
      Math.cos(phi1) *
        Math.cos(phi2) *
        Math.sin(deltalambda / 2) *
        Math.sin(deltalambda / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c; // in metres
    return d;
  };

  const errorAlert = () => {
    Alert.alert("Invalid Login", "Login details did not exist", [
      { text: "Cancel", style: "cancel" },
      { text: "OK" },
    ]);
  };

  const validAlert = () => {
    Alert.alert("Valid Login", "User exists", [
      { text: "Cancel", style: "cancel" },
      { text: "OK" },
    ]);
  };

  const UpdateLocation = () => {
    getUser();
    Axios.post(
      "https://deco3801-betterlatethannever.uqcloud.net/location/update",
      {
        user: user,
        latitude: pin.latitude,
        longitude: pin.longitude,
      }
    ).then((response) => {
      if (response.data.message) {
        errorAlert();
      } else {
        validAlert();
      }
    });
  };

  const GetLocation = () => {
    getUser();
    Axios.post(
      "https://deco3801-betterlatethannever.uqcloud.net/location/get",
      {
        user: "Test@gamil",
      }
    ).then((response) => {
      if (response) {
        setTestUser({
          latitude: response.data.loc[1],
          longitude: response.data.loc[0],
        });
      }
    });
  };

  const getItems = () => {
    Axios.post(
      "https://deco3801-betterlatethannever.uqcloud.net/items/get",
      {}
    ).then((response) => {
      if (response) {
        setItems({
          ids: response.data.loc[0],
          itemType: response.data.loc[1],
          latitude: response.data.loc[3],
          longitude: response.data.loc[2],
        });
      }
    });
  };

  const countItems = () => {
    Axios.post(
      "https://deco3801-betterlatethannever.uqcloud.net/items/count",
      {}
    ).then((response) => {
      if (response) {
        setCount(response.data.count[0].count);
      }
    });
  };

  const addItem = (itemtype) => {
    Axios.post("https://deco3801-betterlatethannever.uqcloud.net/user/item", {
      itemid: itemtype,
      username: user,
    }).then((response) => {
      console.log("response received");
      console.log(response.data);
      if (response.data.result.length == 0) {
        console.log(itemtype, (PointSystem.collect_item(itemtype)))
        console.log(typeof(PointSystem.collect_item(itemtype)), PointSystem.collect_item(itemtype))
        addNewItem(itemtype); 
      } else {
        updateItem(itemtype);
      }
    });
    console.log("post sent");
  };

  const addNewItem = (itemtype) => {
    Axios.post("https://deco3801-betterlatethannever.uqcloud.net/user/addNewItem", {
      itemid: itemtype,
      username: user,
    }).then((response) => {
      console.log("New User Item Added");
      console.log(response.data);
      console.log(itemtype, (PointSystem.collect_item(itemtype)))
      console.log(typeof(PointSystem.collect_item(itemtype)), PointSystem.collect_item(itemtype))
    });

  };

  const updateItem = (itemtype) => {
    Axios.post("https://deco3801-betterlatethannever.uqcloud.net/user/updateItemCount", {
      itemid: itemtype,
      username: user,
    }).then((response) => {
      console.log("Updated Item Count");
      console.log(response.data);
      console.log(itemtype + "This is that number")
      console.log(typeof(PointSystem.collect_item(itemtype)), PointSystem.collect_item(itemtype))
    });

  };

  function getItem(itemType) {
    if (itemType == 1) {
      return require("../../assets/images/sanitizer.png");
    }

    if (itemType == 2) {
      return require("../../assets/images/gloves.png");
    }

    if (itemType == 0) {
      return require("../../assets/images/mask.png");
    }
  }

  // event that get asks for permission then gets the users inital location
  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      } else {
        console.log("Permission to access locaion was approved");
      }

      distanceUsers();
      let location = await Location.getCurrentPositionAsync({});
      getUser();
      myFriends();
      // set Pin being used to change the pin
      setPin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        // where the map will hover when opened Location is St Lucia
        initialRegion={{
          latitude: -27.4975,
          longitude: 153.0137,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        showsUserLocation={true}
        //method that will update the location of user when it changes
        onUserLocationChange={(e) => {
          setPin({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          });

          const nonCollectedItems = [];

          for (var i = 0; i < items.length; i++) {
            if (
              calculateDistance(
                items[i].latitude,
                items[i].longitude,
                e.nativeEvent.coordinate.latitude,
                e.nativeEvent.coordinate.longitude
              ) < 100
            ) {
              addItem(items[i].itemType);
              Alert.alert(
                "item collected ",
                "You've just collected " + items[i].itemType,
                [{ text: "OK" }]
              );
            } else {
              nonCollectedItems.push(items[i]);
            }
          }
          setItems(nonCollectedItems);

          if (
            calculateDistance(
              initialCentre.latitude,
              initialCentre.longitude,
              e.nativeEvent.coordinate.latitude,
              e.nativeEvent.coordinate.longitude
            ) > 300
          ) {
            setInitialCentre({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            });

            const newItems = [];

            for (var i = 0; i < items.length; i++) {
              if (
                calculateDistance(
                  items[i].latitude,
                  items[i].longitude,
                  e.nativeEvent.coordinate.latitude,
                  e.nativeEvent.coordinate.longitude
                ) < 500
              ) {
                newItems.push(items[i]);
              }
            }

            if (newItems.length < 7) {
              for (var x = newItems.length; x < 8; x++) {
                const distance = Math.floor(Math.random() * 440) + 70;
                const newLocation = randomCirclePoint(
                  e.nativeEvent.coordinate,
                  distance
                );
                newItems.push({
                  itemType: Math.floor(Math.random() * UNIQUEITEMS),
                  longitude: newLocation.longitude,
                  latitude: newLocation.latitude,
                });
              }
            }
            setItems(newItems);
          }
          //distanceUsers();
          //contact();
          UpdateLocation();
          setDistance({
            thing: calculateDistance(
              pin.latitude,
              pin.longitude,
              uq.latitude,
              uq.longitude
            ),
          });
        }}
      >
        <Marker
          // marker that shows Birsbane and says Brisbane when hovered
          coordinate={{ latitude: -27.470125, longitude: 153.021072 }}
          pinColor="blue"
        >
          <Callout>
            <Text>Brisbane</Text>
          </Callout>
        </Marker>
        <Marker
          // marker that shows UQ st lucia
          coordinate={{ latitude: -27.4975, longitude: 153.0137 }}
          pinColor="#0000FF"
        >
          <Callout>
            <Text>UQ Campus</Text>
          </Callout>
        </Marker>
        {friends.map((friend, index) => {
          return (
            <Marker
              coordinate={{
                latitude: friend.Latitude,
                longitude: friend.Longitude,
              }}
              pinColor={friend.InfectionStatus = screenColors}
            >
              <Callout>
                <Text>{friend.Username}</Text>
              </Callout>
            </Marker>
          );
        })}

        {items.map((item) => {
          return (
            <Marker
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
            >
              <Image
                source={getItem(item.itemType)}
                style={{ height: 50, width: 50 }}
              />
            </Marker>
          );
        })}

        {/* <Marker
          //item marker for mask
          coordinate={{ latitude: -27.496, longitude: 153.0137 }}
        >
          <Image
            source={require("../../assets/images/mask.jpg")}
            style={{ height: 50, width: 50 }}
          />
          <Callout>
            <Text>Mask</Text>
          </Callout>
        </Marker>

        <Marker
          // Item marker for gloves
          coordinate={{ latitude: -27.497, longitude: 153.012 }}
          pinColor="#00FF00"
        >
          <Image
            source={require("../../assets/images/gloves.png")}
            style={{ height: 50, width: 50 }}
          />
          <Callout>
            <Text>Gloves</Text>
          </Callout>
        </Marker> */}

        <Marker
          // marker that shows the user location and is on top of the user icon from the MapView
          coordinate={pin}
          pinColor="red"
        >
          <Callout>
            <Text>User is {distance.thing} metres away</Text>
          </Callout>
        </Marker>
        <Circle //circle that is around the user, maybe can be used as the infection radius
          center={pin}
          radius={100}
        />
      </MapView>
    </View>
  );
}

const statusColours = {
    Cured: "#05cf02",
    Infected: "#f52718",
    Immune: "#0aefff",
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  imageDisplay: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-before"
  },
  imageDisplay: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-before"
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  modal: {
    //justifyContent: 'center',  
    alignItems: 'center',   

    backgroundColor : '#FFFFFF',
    padding: 10,
    height: '75%',  
    width: '85%',  
    borderRadius:10,  
    borderWidth: 9,  
    borderColor: statusColours["Immune"],    
    marginTop: 80,  
    marginLeft: 40,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
