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

export default function InventoryScreen({ changeStatus }) {
  //session = retrieveUserSession();
  //Session should include a username/email which will be used to access these inventory stats
  const { status } = React.useContext(tabContext);
  const { updateStatus } = React.useContext(tabContext);
  const { statusChange } = React.useContext(tabContext);
  const { addPoints } = React.useContext(tabContext);
  const { items } = React.useContext(tabContext);
  const { screenColors } = React.useContext(tabContext);
  const { cure_user } = React.useContext(tabContext);

  const santizerGoal = 5;
  const gloveGoal = 5;
  const faceMaskGoal = 5;
  const vaccineGoal = 5;
  const nebulizerGoal = 5;
  const paraGoal = 5;

  const [sumSanitizer, setSumSanitizer] = React.useState(0);
  const [sumGloves, setsumGloves] = React.useState(0);
  const [sumFaceMask, setsumFaceMask] = React.useState(0);
  const [sumVaccines, setsumVaccines] = React.useState(0);
  const [sumNebulizers, setsumNebulizers] = React.useState(0);
  const [sumPara, setsumPara] = React.useState(0);
  const [modalVis, setModalVis] = React.useState(false);
  const [modalImage, setModalImage] = React.useState(0);

  //Determine if conditions are set for user to be cleared
  const cureMe = 
    sumSanitizer >= santizerGoal &&
    sumFaceMask >= faceMaskGoal &&
    sumGloves >= gloveGoal &&
    sumVaccines >= vaccineGoal &&
    sumNebulizers >= nebulizerGoal &&
    sumPara >= paraGoal &&
    status == "Infected"
  

  const cureStatus = () => {
    if (status == "Infected") {
      PointSystem.cure();
      statusChange("Healthy");
      cure_user()
      addPoints(PointSystem.cure_bonus());
    }
  };

  const toggleVisible = () => {
    setModalVis(!modalVis);
  };

  return (
    <View style={styles.container}>
      <Modal animationType={"fade"} transparent={true} visible={modalVis}>
        <View style={styles.modal}>
          <TouchableOpacity activeOpacity={0.5} onPress={() => toggleVisible()}>
            <Image
              style={styles.modalImage}
              source={require("../../assets/images/sanitizerdesc.png")}
            />
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={styles.header}>
        <Text style={styles.header}>Inventory </Text>
      </View>

      <View>
        <View style={styles.item_container}>
          <TouchableOpacity
            style={styles.items}
            activeOpacity={0.5}
            onPress={() => toggleVisible()}
          >
            <Image
              source={require("../../assets/images/sanitizer.png")}
              style={styles.ImageIconStyle}
            />
            <Text style={{ fontSize: 22 , color:"#fff",}}>
              {items[3]}/{santizerGoal}{" "}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.items} activeOpacity={0.5}>
            <Image
              source={require("../../assets/images/gloves.png")}
              style={styles.ImageIconStyle}
            />
            <Text style={{ fontSize: 22, color:"#fff", }}>
              {items[1]}/{gloveGoal}{" "}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.item_container}>
          <TouchableOpacity style={styles.items} activeOpacity={0.5}>
            <Image
              source={require("../../assets/images/mask.png")}
              style={styles.ImageIconStyle}
            />
            <Text style={{ fontSize: 22, color:"#fff", }}>
              {items[0]}/{faceMaskGoal}{" "}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.items} activeOpacity={0.5}>
            <Image
              source={require("../../assets/images/syringe.png")}
              style={styles.ImageIconStyle}
            />
            <Text style={{ fontSize: 22, color:"#fff", }}>
              {items[2]}/{vaccineGoal}{" "}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.item_container}>
          <TouchableOpacity style={styles.items} activeOpacity={0.5}>
            <Image
              source={require("../../assets/images/Nebulizer.png")}
              style={styles.ImageIconStyle}
            />
            <Text style={{ fontSize: 22, color:"#fff",}}>
              {items[5]}/{nebulizerGoal}{" "}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.items} activeOpacity={0.5}>
            <Image
              source={require("../../assets/images/Tablets.png")}
              style={styles.ImageIconStyle}
            />
            <Text style={{ fontSize: 22 ,color:"#fff",}}>
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
    backgroundColor: "#0b4c68",
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
    color:"#fff",
    fontWeight: "bold",
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
    backgroundColor: "#FFFFFF",
    padding: 10,
    height: "30%",
    width: "80%",
    // borderRadius: 5,
    // borderWidth: 5,
    marginTop: 300,
    marginLeft: 40,
  },
  modalImage: {
    display: "flex",
    height: 300,
    width: 350,
    resizeMode: "contain",
    // alignItems: "center",
  },
});
