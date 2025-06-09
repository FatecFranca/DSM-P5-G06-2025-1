import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ToastManager, { Toast } from "toastify-react-native";
import { TextInput } from "react-native-paper";
import { useFocusEffect, useRouter } from "expo-router";
import Loader from "../../tools/loader";
import { api } from "../../tools/api";
import React from "react";

export default function ProfileScreen() {
  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [authType, setAuthType] = React.useState("login");
  const [registerStep, setRegisterStep] = React.useState(1);

  const [loading, setLoading] = React.useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password) {
      Toast.error("Por favor, preencha todos os campos", {
        duration: 3000,
        position: "top",
      });
      return;
    }

    setLoading(true);

    await api
      .post("/users/login", {
        username,
        password,
      })
      .then((response) => {
        console.log("Login response:", response.data);
        AsyncStorage.setItem("user", JSON.stringify(response.data));
        router.push("/recommendations");
      })
      .catch((error) => {
        Toast.error(error.response?.data?.error || "Erro ao fazer login", {
          duration: 3000,
          position: "top",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getUser = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        router.push("/recommendations");
      }
    } catch (error) {
      console.error("Erro ao obter usuário:", error);
    }
  };

  const handleRegister = async () => {
    if (!name || !username || !password) {
      Toast.error("Por favor, preencha todos os campos", {
        duration: 3000,
        position: "top",
      });
      return;
    }

    setLoading(true);

    await api
      .post("/users/register", {
        name,
        username,
        password,
      })
      .then((response) => {
        Toast.success("Cadastro bem-sucedido!", {
          duration: 3000,
          position: "top",
        });
      })
      .catch((error) => {
        Toast.error(error.response?.data?.error || "Erro ao cadastrar", {
          duration: 3000,
          position: "top",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      getUser();
    }, [])
  );
  
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/login.png")}
        style={{
          width: "100%",
          height: 390,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
        }}
        resizeMode="contain"
      />
      <View style={{ height: "45%", width: "100%" }}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <View
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={{
                  width: "48%",
                  padding: 10,
                  backgroundColor: authType === "login" ? "#e9edc9" : "#fff",
                  borderWidth: 1,
                  borderColor: authType === "login" ? "#e9edc9" : "#accbde",
                  borderRadius: 10,
                  alignItems: "center",
                }}
                onPress={() => setAuthType("login")}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: authType === "login" ? "#0a6d4f" : "#accbde",
                  }}
                >
                  Já tenho conta
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: "48%",
                  padding: 10,
                  backgroundColor: authType === "register" ? "#e9edc9" : "#fff",
                  borderWidth: 1,
                  borderColor: authType === "register" ? "#e9edc9" : "#accbde",
                  borderRadius: 10,
                  alignItems: "center",
                }}
                onPress={() => setAuthType("register")}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: authType === "register" ? "#0a6d4f" : "#accbde",
                  }}
                >
                  Quero me cadastrar
                </Text>
              </TouchableOpacity>
            </View>
            {authType === "register" && (
              <View
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <TouchableOpacity
                  style={{
                    width: "48%",
                    padding: 10,
                    backgroundColor: registerStep === 1 ? "#e9edc9" : "#fff",
                    borderWidth: 1,
                    borderColor: registerStep === 1 ? "#e9edc9" : "#accbde",
                    borderRadius: 10,
                    alignItems: "center",
                  }}
                  onPress={() => setRegisterStep(1)}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: registerStep === 1 ? "#0a6d4f" : "#accbde",
                    }}
                  >
                    Dados Pessoais
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: "48%",
                    padding: 10,
                    backgroundColor: registerStep === 2 ? "#e9edc9" : "#fff",
                    borderWidth: 1,
                    borderColor: registerStep === 2 ? "#e9edc9" : "#accbde",
                    borderRadius: 10,
                    alignItems: "center",
                  }}
                  onPress={() => setRegisterStep(2)}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: registerStep === 2 ? "#0a6d4f" : "#accbde",
                    }}
                  >
                    Gostos Musicais
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {authType === "login" ? (
              <View style={{ marginTop: 20 }}>
                <TextInput
                  label="Usuário"
                  value={username}
                  onChangeText={setUsername}
                  mode="outlined"
                  style={{ marginBottom: 10 }}
                />
                <TextInput
                  label="Senha"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  mode="outlined"
                />
                <TouchableOpacity
                  style={{
                    marginTop: 10,
                    padding: 10,
                    backgroundColor: "#accbde",
                    borderRadius: 10,
                    alignItems: "center",
                  }}
                  onPress={() => {
                    handleLogin();
                  }}
                >
                  <Text style={{ color: "#fff", fontWeight: "bold" }}>
                    Entrar
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ marginTop: 20 }}>
                {registerStep === 1 && (
                  <>
                    <TextInput
                      label="Nome Completo"
                      value={name}
                      onChangeText={setName}
                      mode="outlined"
                      style={{ marginBottom: 10 }}
                    />
                    <TextInput
                      label="Usuário"
                      value={username}
                      onChangeText={setUsername}
                      mode="outlined"
                      style={{ marginBottom: 10 }}
                    />
                    <TextInput
                      label="Senha"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                      mode="outlined"
                    />
                  </>
                )}
                {registerStep === 2 && (
                  <TextInput
                    label="Gostos Musicais (separados por vírgula)"
                    value=""
                    onChangeText={() => {}}
                    mode="outlined"
                  />
                )}
              </View>
            )}
          </>
        )}
      </View>
      <ToastManager />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    justifyContent: "flex-end",
  },
});
