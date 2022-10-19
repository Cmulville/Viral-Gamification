import * as React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import PointSystem from "../../pointSystem";
import { tabContext } from "../../tabContext";
import Axios from "axios";
import { Alert } from "react-native-web";

export default function InventoryScreen({}) {
  // Context variables
  const { status } = React.useContext(tabContext);
  const { username } = React.useContext(tabContext);
  const { statusChange } = React.useContext(tabContext);
  const { addPoints } = React.useContext(tabContext);
  const { items } = React.useContext(tabContext);
  const { updateItems } = React.useContext(tabContext);

  // Item goal for curing
  const santizerGoal = 5;
  const gloveGoal = 5;
  const faceMaskGoal = 5;
  const vaccineGoal = 5;
  const nebulizerGoal = 5;
  const paraGoal = 5;

  const [modalVis, setModalVis] = React.useState(false);
  const [modalImage, setModalImage] = React.useState(
    require("../../assets/images/nebulizerdesc.png")
  );

  //Determine if conditions are set for user to be cleared
  let cureMe = !(
    items[0] >= santizerGoal &&
    items[1] >= faceMaskGoal &&
    items[2] >= gloveGoal &&
    items[3] >= vaccineGoal &&
    items[4] >= nebulizerGoal &&
    items[5] >= paraGoal &&
    status == "Infected"
  );

  //Requires item images for startup.
  const itemImages = [
    require("../../assets/images/sanitizerdesc.png"),
    require("../../assets/images/glovesdesc.png"),
    require("../../assets/images/maskdesc.png"),
    require("../../assets/images/vaccinedesc.png"),
    require("../../assets/images/nebulizerdesc.png"),
    require("../../assets/images/paracetamoldesc.png"),
  ];

  /**
  * Cures user upon pressing cure button; adds points to user
  * 20% change user is bestowed with "Immunity" over being healthy
  */
  const cureStatus = () => {
    PointSystem.cure();
    if (Math.random <= 0.2) {
      statusChange("Immune");
    } else {
      statusChange("Healthy");
    }
    Axios.post(
      "https://deco3801-betterlatethannever.uqcloud.net/user/cure_user",
      {
        username: username,
      }
    ).then((respone) => {});
    updateItems(username);
    addPoints(PointSystem.cure_bonus());

    Alert.alert(
      "Cured!",
      "You have been cured from the virus, your new status is " + status,
      [{ text: "Ok" }]
    );
  };

  /**
   *  Toggles the visibility of the item information upon pressing the item image
   */
  const toggleVisible = () => {
    setModalVis(!modalVis);
  };

  /**
   * Determines the type of item being toggled in order to retrieve the appropriate image
   * @param {*} itemType: Id of item informate to be toggled
   */
  const setAndtoggle = (itemType) => {
    setModalImage(itemImages[itemType]);
    
    toggleVisible();
  };

  return (
    <View style={styles.container}>
      <Modal animationType={"fade"} transparent={true} visible={modalVis}>
        <View style={styles.modal}>
          <TouchableOpacity activeOpacity={0.5} onPress={() => toggleVisible()}>
            <Image style={styles.modalImage} source={modalImage} />
          </TouchableOpacity>
        </View>
      </Modal>

      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.header}>INVENTORY </Text>
        </View>

        <View>
          <View style={styles.item_container}>
            <TouchableOpacity
              style={styles.items}
              activeOpacity={0.5}
              onPress={() => setAndtoggle(0)}
            >
              <Image
                source={require("../../assets/images/sanitizer.png")}
                style={styles.ImageIconStyle}
              />
              <Text style={{ fontSize: 22 }}>
                {items[3]}/{santizerGoal}{" "}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.items}
              activeOpacity={0.5}
              onPress={() => setAndtoggle(1)}
            >
              <Image
                source={require("../../assets/images/gloves.png")}
                style={styles.ImageIconStyle}
              />
              <Text style={{ fontSize: 22 }}>
                {items[1]}/{gloveGoal}{" "}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.item_container}>
            <TouchableOpacity
              style={styles.items}
              activeOpacity={0.5}
              onPress={() => setAndtoggle(2)}
            >
              <Image
                source={require("../../assets/images/mask.png")}
                style={styles.ImageIconStyle}
              />
              <Text style={{ fontSize: 22 }}>
                {items[0]}/{faceMaskGoal}{" "}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.items}
              activeOpacity={0.5}
              onPress={() => setAndtoggle(3)}
            >
              <Image
                source={require("../../assets/images/syringe.png")}
                style={styles.ImageIconStyle}
              />
              <Text style={{ fontSize: 22 }}>
                {items[2]}/{vaccineGoal}{" "}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.item_container}>
            <TouchableOpacity
              style={styles.items}
              activeOpacity={0.5}
              onPress={() => setAndtoggle(4)}
            >
              <Image
                source={require("../../assets/images/Nebulizer.png")}
                style={styles.ImageIconStyle}
              />
              <Text style={{ fontSize: 22 }}>
                {items[5]}/{nebulizerGoal}{" "}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.items}
              activeOpacity={0.5}
              onPress={() => setAndtoggle(5)}
            >
              <Image
                source={require("../../assets/images/Tablets.png")}
                style={styles.ImageIconStyle}
              />
              <Text style={{ fontSize: 22 }}>
                {items[4]}/{paraGoal}{" "}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Button
              onPress={cureStatus}
              color="#00c749"
              title="Cure Yourself"
              disabled={cureMe}
            ></Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  ImageIconStyle: {
    resizeMode: "contain",
    height: 130,
    width: 130,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item_container: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    fontSize: 32,
    fontWeight: "bold",
    borderRadius: 20,
    padding: 5,
    backgroundColor: "#113b4d",
    color: "white",
  },
  items: {
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginVertical: 16,
  },
  modal: {
    alignItems: "center",
    paddingLeft: 110,
    paddingTop: 150,
  },
  modalImage: {
    height: 550,
    width: 500,
    resizeMode: "contain",
    alignItems: "center",
    paddingLeft: 100,
  },
});
