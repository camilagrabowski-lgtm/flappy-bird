import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

const skins = [
  {
    id: 1,
    nome: "Finn",
    preco: 0,
    imagem: require("@/assets/images/finn.png"),
  },
  {
    id: 2,
    nome: "Jake",
    preco: 50,
    imagem: require("@/assets/images/jake.png"),
  },
  {
    id: 3,
    nome: "BMO",
    preco: 100,
    imagem: require("@/assets/images/bird.gif"),
  },
  {
    id: 4,
    nome: "Marceline",
    preco: 150,
    imagem: require("@/assets/images/marceline.png"),
  },
  {
    id: 5,
    nome: "Princesa Jujuba",
    preco: 200,
    imagem: require("@/assets/images/princesa-jujuba.png"),
  },
];

export default function Personagens() {
  return (
    <LinearGradient
      colors={["#459107", "#dde032", "#429b49"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>🎮 Escolha sua Skin</Text>

        <View style={styles.coinsBox}>
          <Text style={styles.coins}>🪙 2.350 moedas</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
        >
          {skins.map((skin) => (
            <Pressable
              key={skin.id}
              style={styles.card}
              onPress={() => console.log(skin.nome)}
            >
              <Image source={skin.imagem} style={styles.image} />

<View style={styles.info}>
  <Text style={styles.name}>{skin.nome}</Text>

  <View style={styles.priceBox}>
    <Text style={styles.price}>
      {skin.preco === 0 ? "GRÁTIS" : `🪙 ${skin.preco}`}
    </Text>
  </View>
</View>

<Pressable style={styles.selectButton}>
  <Text style={styles.selectText}>Selecionar</Text>
</Pressable>
            </Pressable>
          ))}
        </ScrollView>

        <Pressable
          style={styles.button}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>← Voltar</Text>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
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
    backgroundColor: "#FFD54F",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 30,
    marginBottom: 20,
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
  backgroundColor: "rgba(255,255,255,0.25)", // transparente
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


  image: {
    width: 110,
    height: 110,
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
