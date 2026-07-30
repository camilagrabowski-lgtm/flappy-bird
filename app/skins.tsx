import { useState, useEffect } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useGame } from "@/hooks/games";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { skins } from "@/constants/skin";

export default function Personagens() {
  const {
    coins,
    spendCoins,
    skinSelecionada,
    setSkinSelecionada,
  } = useGame();

  const [skinsCompradas, setSkinsCompradas] = useState<number[]>([1]);

useEffect(() => {
  async function carregar() {
    const skinsSalvas = await AsyncStorage.getItem("skinsCompradas");
    const skinAtual = await AsyncStorage.getItem("skinSelecionada");

    if (skinsSalvas) {
      setSkinsCompradas(JSON.parse(skinsSalvas));
    } else {
      const inicial = [1]; // BMO começa liberado
      setSkinsCompradas(inicial);

      await AsyncStorage.setItem(
        "skinsCompradas",
        JSON.stringify(inicial)
      );
    }

    if (skinAtual) {
      setSkinSelecionada(Number(skinAtual));
    } else {
      setSkinSelecionada(1);

      await AsyncStorage.setItem(
        "skinSelecionada",
        "1"
      );
    }
  }

  carregar();
}, []);

const selecionarSkin = async (skin: (typeof skins)[number]) => {
  // Ainda não comprou
  if (!skinsCompradas.includes(skin.id)) {
    if (coins < skin.preco) {
      Alert.alert(
        "Moedas insuficientes",
        "Você não possui moedas suficientes para comprar esta skin."
      );
      return;
    }

    await spendCoins(skin.preco);

    const novasSkins = [...skinsCompradas, skin.id];

    setSkinsCompradas(novasSkins);

    await AsyncStorage.setItem(
      "skinsCompradas",
      JSON.stringify(novasSkins)
    );

    setSkinSelecionada(skin.id);

    await AsyncStorage.setItem(
      "skinSelecionada",
      skin.id.toString()
    );

    Alert.alert(
      "Compra realizada!",
      `${skin.nome} foi comprada e equipada.`
    );

    return;
  }

  // Apenas equipa
  setSkinSelecionada(skin.id);

  await AsyncStorage.setItem(
    "skinSelecionada",
    skin.id.toString()
  );

  Alert.alert(
    "Skin equipada!",
    `${skin.nome} equipada.`
  );
};

  return (
  <ImageBackground
    source={require("../assets/images/fundo.png")}
    style={{ flex: 1 }}
    resizeMode="cover"
  >
    <View style={styles.overlay}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>🎮 Compre sua Skin</Text>

        <View style={styles.coinsBox}>
          <Text style={styles.coins}>🪙 {coins} moedas</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
        >
          {skins.map((skin) => (
  <View
    key={skin.id}
    style={styles.card}
  >
  <View style={styles.imageContainer}>
 <Image
  source={skin.imagem}
  style={[
  styles.image,
  {
    width: skin.size,
    height: skin.size,
  },
  !skinsCompradas.includes(skin.id) && styles.lockedImage,
]}
/>

 {!skinsCompradas.includes(skin.id) && (
  <View style={styles.lock}>
    <Text style={styles.lockText}>🔒</Text>
  </View>
)}
</View>

  <View style={styles.info}>
    <Text style={styles.name}>{skin.nome}</Text>

    <View style={styles.priceBox}>
      <Text style={styles.price}>
  {skinsCompradas.includes(skin.id)
    ? "GRÁTIS"
    : `🪙 ${skin.preco}`}
</Text>
    </View>
  </View>

 <Pressable
  style={styles.selectButton}
  onPress={() => selecionarSkin(skin)}
>
 <Text style={styles.selectText}>
  {skinSelecionada === skin.id
    ? "Selecionado"
    : skinsCompradas.includes(skin.id)
    ? "Selecionar"
    : "Comprar"}
</Text>
</Pressable>
</View>

          ))}
        </ScrollView>

        <Pressable
          style={styles.button}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>← Voltar</Text>
        </Pressable>
            </SafeAreaView>
    </View>
  </ImageBackground>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
  },

  info: {
  alignItems: "center",
  justifyContent: "center",
},
overlay: {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.20)",
},

  title: {
    fontSize: 34,
    color: "#FFF",
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 15,
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },

  coinsBox: {
    alignSelf: "center",
    backgroundColor: "#ffffff6e",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 30,
    marginBottom: 20,
  },

  lockedImage: {
  opacity: 0.35,
},
lock: {
  position: "absolute",
  width: 45,
  height: 45,
  borderRadius: 22.5,
  backgroundColor: "rgba(255, 255, 255, 0.3)",
  justifyContent: "center",
  alignItems: "center",
},

lockText: {
  fontSize: 24,
},

  coins: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    paddingBottom: 30,
  },

  card: {
  width: 170,
  height: 320, // altura fixa
  backgroundColor: "rgba(255,255,255,0.85)",
  borderWidth: 3,
  borderColor: "#000",
  borderRadius: 22,
  marginBottom: 22,
  padding: 15,
  alignItems: "center",
  justifyContent: "space-between",

  shadowColor: "#000",
  shadowOpacity: 0.25,
  shadowRadius: 8,
  shadowOffset: {
    width: 0,
    height: 5,
  },
  elevation: 8,
},

imageContainer: {
  width: 120,
  height: 120,
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  marginBottom: 5,
},

image: {
  resizeMode: "contain",
},

  name: {
  fontSize: 20,
  fontWeight: "bold",
  marginTop: 10,
  color: "#000",
  textAlign: "center",
  height: 52, // reserva espaço para nomes grandes
},


  priceBox: {
    marginTop: 10,
    backgroundColor: "#FFE082",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  price: {
    color: "#8a5d00",
    fontWeight: "bold",
    fontSize: 16,
  },

  selectButton: {
  width: "100%",
  paddingVertical: 12,
  borderRadius: 12,
  backgroundColor: "#000",
  alignItems: "center",
},


  selectText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  button: {
    backgroundColor: "#000000",
    padding: 16,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },

  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fdfcfc",
  },
});
