import * as React from "react";
import { ScrollView, StyleSheet, Text, View, Button } from "react-native";
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

  //   let sumSanitizer = 0;
  //   let sumGloves = 0;
  //   let sumFaceMask = 0;
  //   let sumVaccines = 0;
  //   let sumNebuilzers = 0;
  //   let sumPara = 0;

  //   items.forEach((element) => {
  //     if (element.ItemID == 0) {
  //       setsumFaceMask(element.Amount);
  //       //   sumFaceMask = element.Amount;
  //     } else if (element.ItemID == 1) {
  //       setsumGloves(element.Amount);
  //       //   sumGloves = element.Amount;
  //     } else if (element.ItemID == 2) {
  //       setsumVaccines(element.Amount);
  //       //   sumVaccines = element.Amount;
  //     } else if (element.ItemID == 3) {
  //       setSumSanitizer(element.Amount);
  //       //   sumSanitizer = element.Amount;
  //     } else if (element.ItemID == 4) {
  //       setsumPara(element.Amount);
  //       //   sumPara = element.Amount;
  //     } else if (element.ItemID == 5) {
  //       setsumNebulizers(element.Amount);
  //       //   sumNebulizers = element.Amount;
  //     }
  //   });

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

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Inventory </Text>
      </View>

      <ScrollView>
        <View style={styles.item_container}>
          <View style={styles.items}>
            <Button title="Santitizer" color={screenColors} />
            <Text style={{ fontSize: 22 }}>
              {items[3]}/{santizerGoal}{" "}
            </Text>
          </View>

          <View style={styles.items}>
            <Button title="Gloves" color={screenColors} />
            <Text style={{ fontSize: 22 }}>
              {items[1]}/{gloveGoal}{" "}
            </Text>
          </View>

          <View style={styles.items}>
            <Button title="Face Masks" color={screenColors} />
            <Text co style={{ fontSize: 22 }}>
              {items[0]}/{faceMaskGoal}{" "}
            </Text>
          </View>
        </View>
        <View style={styles.item_container}>
          <View style={styles.items}>
            <Button title="Vaccines" color={screenColors} />
            <Text style={{ fontSize: 22 }}>
              {items[2]}/{vaccineGoal}{" "}
            </Text>
          </View>

          <View style={styles.items}>
            <Button title="Nebulizers" color={screenColors} />
            <Text style={{ fontSize: 22 }}>
              {items[5]}/{nebulizerGoal}{" "}
            </Text>
          </View>

          <View style={styles.items}>
            <Button title="Paracetamol" color={screenColors} />
            <Text co style={{ fontSize: 22 }}>
              {items[4]}/{paraGoal}{" "}
            </Text>
          </View>
        </View>
        <View>
          <Button
            onPress={cureStatus}
            color="#00c749"
            title="Cure Yourself"
            disabled={cureMe}
          ></Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item_container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    fontSize: 32,
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
});
