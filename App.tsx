import React, { useState } from "react";
import { View, Text } from "react-native";
import * as Yup from "yup";

export default function App() {
  const [password, setPassword] = useState<string | number>("");
  const [isPasswordGenerated, setIsPasswordGenerated] = useState<
    string | number
  >("");
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

  const generatePasswordString = (passwordLength: number) => {};
  const createPassword = (characters: string, passwordLength: number) => {};
  const resetPasswordState = () => {};
  return (
    <View>
      <Text style={{ textAlign: "center", fontSize: 30, padding: 20, backgroundColor: "gray", color: "white", borderColor: "black", borderWidth: 3 }}>App</Text>
    </View>
  );
}
