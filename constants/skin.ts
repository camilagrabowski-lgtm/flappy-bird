
interface skin {
    [key: string]: {
       image: any,
       price: number
    }
}
export const skins = [
  {
    id: 1,
    nome: "BMO",
    preco: 0,
    imagem: require("@/assets/images/bird.gif"),
    size: 120,
  },
  {
    id: 2,
    nome: "Jake",
    preco: 20,
    imagem: require("@/assets/images/jake.png"),
    size: 150,
  },
  {
    id: 3,
    nome: "Finn",
    preco: 50,
    imagem: require("@/assets/images/finn.png"),
    size: 150,
  },
  {
    id: 4,
    nome: "Marceline",
    preco: 60,
    imagem: require("@/assets/images/marceline.png"),
    size: 200,
  },
  {
    id: 5,
    nome: "Princesa Jujuba",
    preco: 100,
    imagem: require("@/assets/images/princesa-jujuba.png"),
    size: 100,
  },
];