import React, { useState } from "react"
import {
  CheckBox,
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native"
import { Form, Item, Label, Input, Button } from "native-base"
import * as ImagePicker from "expo-image-picker"
import { getToken } from "../token/Token"

export default function Register({ navigation }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [cardId, setCardId] = useState("")
  const [street, setStreet] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [city, setCity] = useState("")
  const [photo, setPhoto] = useState("")
  const [debetCard, setDebetCard] = useState("")

  const [registerResult, setRegisterStatus] = useState("")
  const [css, setCss] = useState("none")
  const [isSelected, setSelection] = useState(false)
  const [state, setState] = useState(false)

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
      base64: true,
    })
    setPhoto(result.base64)
    console.log(photo.substring(0, 30))
  }

  const handleSignUp = () => {
    if (
      email == "" ||
      password == "" ||
      firstname == "" ||
      lastname == "" ||
      cardId == "" ||
      city == "" ||
      street == "" ||
      postalCode == "" ||
      debetCard == "" ||
      isSelected == false
    ) {
      setRegisterStatus("You have to fill every field.")
      setCss("flex")
      return
    }

    console.log(
      email,
      password,
      firstname,
      lastname,
      cardId,
      city,
      street,
      postalCode,
      debetCard
    )
    fetch("http://192.168.191.118:8000/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname,
        card_id: cardId,
        city: city,
        street: street,
        postal_code: postalCode,
        debet_card_number: debetCard,
        photo: photo,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.response == "email is already used") {
          console.log("Email is used")
          setRegisterStatus("Email is already used.")
          setCss("flex")
        } else if (json.response == "card id is already used") {
          console.log("card id is already used")
          setRegisterStatus("Card Id is already used.")
          setCss("flex")
        } else {
          setState(true)
        }
      })
  }

  return (
    <View style={styles.containerMain}>
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.entryMessage}>
          Create your account. It's free and only takes a minute.
        </Text>
        <ScrollView>
          <Form>
            <Item stackedLabel>
              <Label style={styles.regInput}>Email</Label>
              <Input
                onChangeText={(val) => {
                  setEmail(val)
                  setCss("none")
                }}
              />
            </Item>
            <Item stackedLabel last>
              <Label style={styles.regInput}>Password</Label>
              <Input
                secureTextEntry={true}
                onChangeText={(val) => {
                  setPassword(val)
                  setCss("none")
                }}
              />
            </Item>
            <Item stackedLabel last>
              <Label style={styles.regInput}>First name</Label>
              <Input
                onChangeText={(val) => {
                  setFirstname(val)
                  setCss("none")
                }}
              />
            </Item>
            <Item stackedLabel last>
              <Label style={styles.regInput}>Last name</Label>
              <Input
                onChangeText={(val) => {
                  setLastname(val)
                  setCss("none")
                }}
              />
            </Item>
            <Item stackedLabel last>
              <Label style={styles.regInput}>Card ID</Label>
              <Input
                keyboardType="numeric"
                onChangeText={(val) => {
                  setCardId(val)
                  setCss("none")
                }}
              />
            </Item>
            <Item stackedLabel last>
              <Label style={styles.regInput}>City</Label>
              <Input
                onChangeText={(val) => {
                  setCity(val)
                  setCss("none")
                }}
              />
            </Item>
            <Item stackedLabel last>
              <Label style={styles.regInput}>Street</Label>
              <Input
                onChangeText={(val) => {
                  setStreet(val)
                  setCss("none")
                }}
              />
            </Item>
            <Item stackedLabel last>
              <Label style={styles.regInput}>Postal code</Label>
              <Input
                keyboardType="numeric"
                onChangeText={(val) => {
                  setPostalCode(val)
                  setCss("none")
                }}
              />
            </Item>
            <Item stackedLabel last>
              <Label style={styles.regInput}>Debet card</Label>
              <Input
                keyboardType="numeric"
                onChangeText={(val) => {
                  setDebetCard(val)
                  setCss("none")
                }}
              />
            </Item>
            <Button
              style={styles.buttonUpload}
              onPress={() => {
                pickImage()
              }}
            >
              <Text style={styles.buttonUpload}>Upload your photo</Text>
            </Button>
            <View style={styles.checkboxContainer}>
              <CheckBox
                value={isSelected}
                onValueChange={() => setSelection(!isSelected)}
                style={styles.checkbox}
              />
              <Text style={{ color: "#989eb1", fontSize: 16 }}>
                I agree to the{" "}
                <Text
                  style={{
                    color: "#0c6cf5",
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  Terms of Services
                </Text>{" "}
                and{" "}
                <Text
                  style={{
                    color: "#0c6cf5",
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  Privacy Policy
                </Text>
                .
              </Text>
            </View>
            <Button
              block
              light
              style={styles.button}
              onPress={() => handleSignUp()}
            >
              <Text style={styles.button}>Sign Up</Text>
            </Button>
          </Form>
          <Text
            style={{
              display: css,
              color: "red",
              marginBottom: 10,
              fontSize: 16,
              alignSelf: "center",
            }}
          >
            {registerResult}
          </Text>
          <Text style={styles.signUpText}>Already have an account ? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.signUp}>Sign In</Text>
          </TouchableOpacity>
        </ScrollView>
        <Modal
          visible={state}
          animationType="slide"
          presentationStyle="overFullScreen"
          transparent={true}
          onRequestClose={() => {
            setState(false)
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "#000000aa",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#0c6cf5",
                marginTop: "133%",
                width: "100%",
                height: "30%",
                borderRadius: 10,
              }}
            >
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    alignSelf: "flex-end",
                    marginRight: 20,
                    marginTop: 20,
                  }}
                >
                  x
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                  alignSelf: "center",
                  marginTop: "13%",
                }}
              >
                Registered succesfully!
              </Text>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
  },
  containerMain: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  image: {
    marginTop: 20,
    marginBottom: 25,
    width: 300,
    height: 100,
    resizeMode: "contain",
  },

  title: {
    textAlign: "left",
    alignSelf: "stretch",
    marginLeft: 45,
    marginTop: 60,
    fontWeight: "bold",
    fontSize: 26,
    color: "#35424a",
    marginBottom: 6,
  },
  entryMessage: {
    textAlign: "left",
    alignSelf: "stretch",
    marginLeft: 45,
    marginRight: 45,
    marginBottom: 15,
    color: "#989eb1",
    fontSize: 16,
  },
  regInput: {
    color: "#3d8af7",
    fontWeight: "bold",
    marginTop: 20,
  },

  button: {
    backgroundColor: "#0c6cf5",
    color: "white",
    fontWeight: "bold",
    width: 290,
    textAlign: "center",
    margin: 20,
    fontSize: 17,
    borderRadius: 7,
  },

  buttonUpload: {
    backgroundColor: "#d6d6d6",
    color: "white",
    fontWeight: "bold",
    width: 250,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
    fontSize: 17,
    borderRadius: 7,
    alignSelf: "center",
  },

  signUpText: {
    marginLeft: 75,
    alignItems: "center",
    justifyContent: "center",
    color: "#989eb1",
    fontSize: 16,
  },

  signUp: {
    marginLeft: 140,
    alignItems: "center",
    justifyContent: "center",
    color: "#0c6cf5",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: "20%",
  },
  checkboxContainer: {
    width: 300,
    flexDirection: "row",
    marginBottom: 20,
    marginTop: 40,
  },
  checkbox: {
    color: "#0c6cf5",
    alignSelf: "center",
  },
})
