import * as React from "react";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, Image, icon } from "react-native";
import * as Location from "expo-location";

export default function MapScreen() {
  // constant that stores a pin and method (setpin) that changes it. values are just dummy data
  const birsbane = {latitude: -27.4705,
                    longitude: 153.0260};
  const uq = {latitude: -27.4975,
              longitude: 153.0137};
  const [pin, setPin] = React.useState({latitude: -27.470125,
                                        longitude: 153.021072,});
  const [distance, setDistance] = React.useState({thing: 0});

  const calcualteDistance = () => {
    //birsbane is lat 1
    //uq lat 2
    let R = 6371000; // metres
    let phi1 = birsbane.latitude * Math.PI/180; // φ, λ in radians
    let phi2 = uq.latitude * Math.PI/180;
    let deltaphi = (uq.latitude - birsbane.lat) * Math.PI/180;
    let deltalambda = (uq.longitude - uq.longitude) * Math.PI/180;

    let a = Math.sin(deltaphi/2) * Math.sin(deltaphi/2) +
              Math.cos(phi1) * Math.cos(phi2) *
              Math.sin(deltalambda/2) * Math.sin(deltalambda/2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    let d = R * c; // in metres
    return(d);
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

  const location = () => {
    Axios.post("https://deco3801-betterlatethannever.uqcloud.net/location", {
      latitude: pin.latitude,
      longitude: pin.longitude,
    }).then((response) => {
      if (response.data.message) {
        errorAlert();
      } else {
        validAlert();
      }
    });
  };

  // event that get asks for permission then gets the users inital location
  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      } else {
        console.log('Permission to access locaion was approved')
      }

      let location = await Location.getCurrentPositionAsync({});

      // set Pin being used to change the pin
      setPin({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
      });

      setDistance(
        {thing: calcualteDistance()}
      )

    })();
    }, []);
 
  return (
    <View style={styles.container}>
      <MapView style={styles.map}
              // where the map will hover when opened Location is St Lucia
              initialRegion = {{latitude: -27.4975,
                                longitude: 153.0137,
                                latitudeDelta: 0.005,
                                longitudeDelta: 0.005}}
                showsUserLocation = {true}
                //method that will update the location of user when it changes
                onUserLocationChange = {(e) => {
                  //console.log("location changed", e.nativeEvent.coordinate);
                  setPin({
                    latitude: e.nativeEvent.coordinate.latitude,
                    longitude: e.nativeEvent.coordinate.longitude,
                });
                  setDistance({
                    thing: calcualteDistance()
                  })
                  console.log("distance changed", calcualteDistance())
                }}
                >
          <Marker 
            // marker that shows Birsbane and says Brisbane when hovered
            coordinate = {{latitude: -27.470125,
                          longitude: 153.021072,}}
            pinColor = "blue"
            >
                <Callout>
						      <Text>Brisbane</Text>
					      </Callout>
          </Marker>
          
          <Marker 
            // marker that shows UQ st lucia
            coordinate = {{latitude: -27.4975,
                          longitude: 153.0137,}}
            pinColor = "#0000FF"
            >
                <Callout>
						      <Text>UQ distance from brisbane:{distance.thing}</Text>
					      </Callout>
                
          </Marker>

          <Marker
            //item marker for mask
            coordinate = {{latitude: -27.496,
                          longitude: 153.0137,}}
            >
              <Image
              source={require("../../assets/mask.jpg")}
              style={{ height: 50, width: 50 }}
              />
                <Callout>
						      <Text>Mask</Text>
					      </Callout>
          </Marker>

          <Marker
              // Item marker for gloves
            coordinate = {{latitude: -27.497,
                          longitude: 153.012,}}
            pinColor = "#00FF00"
            >
              <Image
              source={require("../../assets/gloves.jpg")}
              style={{ height: 50, width: 50 }}
              />
                <Callout>
						      <Text>Gloves</Text>
					      </Callout>
          </Marker>

          <Marker
            // marker that shows the user location and is on top of the user icon from the MapView 
            coordinate = {pin}
            pinColor = "red"
            >
              <Callout>
						    <Text>Marker linked to User Location</Text>
					    </Callout>
          </Marker>
        
          <Circle //circle that is around the user, maybe can be used as the infection radius
          center={pin} radius={100}/>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});