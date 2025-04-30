import { View, Text, StyleSheet, Button } from "react-native";
import React, { useState } from "react";
import { authClient } from "@/src/auth-client";

export default function DashboardLayout() {
  const { data: session } = authClient.useSession();
  const [responseMsg, setResponseMsg] = useState("");

  const handlePost = async () => {
    try {
      const cookie = authClient.getCookie();

      // console.log('cookie HERE:', cookie);

      const res = await fetch("http://localhost:3000/api/get-stuff", {
        method: "POST",
        headers: {
          Cookie: cookie,
        }
      });
      if (res.status === 201) {
        setResponseMsg("Good");
      } else {
        setResponseMsg(`Received status ${res.status}`);
      }
    } catch (err) {
      setResponseMsg("Network error");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Dashboard!</Text>
      <Text>Welcome, {session?.user?.name || "UNKNOWN USER"}</Text>
      <Button title="Get Stuff" onPress={handlePost} />
      {!!responseMsg && <Text>{responseMsg}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
  },
});
