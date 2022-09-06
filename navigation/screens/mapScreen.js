import * as React from 'react';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import * as Location from "expo-location"

export default function MapScreen() {
  // constant that stores a pin and method (setpin) that changes it. values are just dummy data
  const [pin, setPin] = React.useState({latitude: -27.470125,
                                        longitude: 153.021072,});

  const [distance ] = React.useState(0)

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
      console.log(location);

      // set Pin being used to change the pin
      setPin({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
      });
    })();
    }, []);
 
  return (
    <View style={styles.container}>
      <MapView style={styles.map}
              // where the map will hover when opened Location is brisbane CBD
              initialRegion = {{latitude: pin.latitude,
                                longitude: pin.longitude,
                                latitudeDelta: 0.5,
                                longitudeDelta: 0.5}}
                showsUserLocation = {true}
                //method that will update the location of user when it changes
                onUserLocationChange = {(e) => {
                  console.log("location changed", e.nativeEvent.coordinate);
                  setPin({
                    latitude: e.nativeEvent.coordinate.latitude,
                    longitude: e.nativeEvent.coordinate.longitude,
                });
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
						      <Text>St Lucia</Text>
					      </Callout>
                
          </Marker>

          <Marker
            coordinate = {{latitude: -27.496,
                          longitude: 153.0137,}}
            >
                <Callout>
						      <Text>Mask</Text>
					      </Callout>
          </Marker>

          <Marker
            coordinate = {{latitude: -27.497,
                          longitude: 153.012,}}
            pinColor = "#00FF00"
            >
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