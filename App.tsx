import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function App() {
  const [password, setPassword] = useState("");
  const [isPasswordGenerated, setIsPasswordGenerated] =
    useState<boolean>(false);
  const [lowercase, setLowerCase] = useState<boolean>(true);
  const [uppercase, setupperCase] = useState<boolean>(false);
  const [numbers, setNumbers] = useState<boolean>(false);
  const [symbols, setSymbols] = useState<boolean>(false);

  const minPasswordLength = 8;
  const maxPasswordLength = 50;
  const PasswordSchema = Yup.object().shape({
    passwordLength: Yup.number()
      .min(minPasswordLength, `Should be min of ${minPasswordLength}`)
      .max(maxPasswordLength, `Should be max of ${maxPasswordLength}`)
      .required("Length is Required"),
  });

  const generatePasswordString = (passwordLength: number) => {
    let characters = "";
    const lowercaseCharacters = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberCharacters = "0123456789";
    const symbolCharacters = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    if (uppercase) characters += uppercaseCharacters;
    if (lowercase) characters += lowercaseCharacters;
    if (numbers) characters += numberCharacters;
    if (symbols) characters += symbolCharacters;

    setIsPasswordGenerated(true);
    createPassword(characters, passwordLength);
  };
  const createPassword = (characters: string, passwordLength: number): void => {
    let password = "";
    for (let i = 0; i < passwordLength; i++) {
      password += characters.charAt(
        Math.floor(Math.random() * characters.length + 1)
      );
    }
    setPassword(password);
  };
  const resetPasswordState = () => {
    setPassword("");
    setIsPasswordGenerated(false);
    setLowerCase(true);
    setupperCase(false);
    setNumbers(false);
    setSymbols(false);
  };
  return (
    <ScrollView keyboardShouldPersistTaps={"handled"}>
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.mandorakannu}>Created By: Kannu Mandora</Text>
          <Text style={styles.title}>Password Generator</Text>

          <Formik
            initialValues={{ passwordLength: "" }}
            validationSchema={PasswordSchema}
            onSubmit={(values) =>
              generatePasswordString(Number(values.passwordLength))
            }
          >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
              /* and other goodies */
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.heading}>Password Length</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>
                        {errors.passwordLength}
                      </Text>
                    )}
                    <TextInput
                      style={styles.inputStyle}
                      value={values.passwordLength}
                      onChangeText={handleChange("passwordLength")}
                      placeholder="Ex. 8"
                      keyboardType="numeric"
                    />
                  </View>
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>
                    Include Lowercase Characters
                  </Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={lowercase}
                    onPress={() => setLowerCase(!lowercase)}
                    fillColor="#29ABB7"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>
                    Include Uppercase Characters
                  </Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={uppercase}
                    onPress={() => setupperCase(!uppercase)}
                    fillColor="#29ABB7"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Numbers</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={numbers}
                    onPress={() => setNumbers(!numbers)}
                    fillColor="#29ABB7"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Symbols</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={symbols}
                    onPress={() => setSymbols(!symbols)}
                    fillColor="#29ABB7"
                  />
                </View>
                <View style={styles.formActions}>
                  <TouchableOpacity
                    style={styles.primaryBtn}
                    disabled={!isValid}
                    onPress={() => handleSubmit()}
                  >
                    <Text style={{ textAlign: "center", color: "white" }}>
                      Generate Password
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      resetPasswordState();
                      handleReset();
                    }}
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#CAD5E2",
                      borderRadius: 8,
                      width: 120,
                    }}
                  >
                    <Text>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
        {isPasswordGenerated ? (
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle}>Result:</Text>
            <Text selectable={true} style={styles.subTitle}>
              {password}
            </Text>
          </View>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mandorakannu: {
    color: "white",
    backgroundColor: "gray",
    fontSize: 20,
    padding: 10,
    marginVertical: 10,
  },
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    marginBottom: 15,
  },
  subTitle: {
    color: "white",
    fontSize: 26,
    fontWeight: "600",
    marginBottom: 2,
  },
  description: {
    color: "#758283",
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  inputColumn: {
    flexDirection: "column",
  },
  inputStyle: {
    padding: 8,
    marginVertical: 8,
    width: "100%",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#16213e",
  },
  errorText: {
    fontSize: 12,
    color: "#ff0d10",
  },
  formActions: {
    flexDirection: "row",
    justifyContent: "center",
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: "#5DA3FA",
  },
  primaryBtnTxt: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: "#CAD5E2",
  },
  secondaryBtnTxt: {
    textAlign: "center",
  },
  card: {
    padding: 12,
    margin: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: "black",
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: "#333",
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 12,
    color: "#000",
  },
});
