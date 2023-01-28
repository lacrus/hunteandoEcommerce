// SEMILLADO DB
const { encrypt } = require("../../controllers/auth");
const User = require("../../models/users");
const UserDetails = require("../../models/usersdetails");
const Cart = require("../../models/cart");
const Product = require("../../models/products");

const productosIniciales = [
  {
    // id: 1,
    name: "remera",
    price: 300,
    description: "Remera estampada super liviana algodon",
    image: [
      "https://artelista.s3.amazonaws.com/obras/big/0/4/1/7382666047536905.jpg",
      "https://i.pinimg.com/736x/69/51/d3/6951d3a58296c1e2886972c9f187478c.jpg",
      "https://artelista.s3.amazonaws.com/obras/big/0/4/1/7382666047536905.jpg",
      "https://i.pinimg.com/736x/69/51/d3/6951d3a58296c1e2886972c9f187478c.jpg",
      "https://artelista.s3.amazonaws.com/obras/big/0/4/1/7382666047536905.jpg",
    ],
    stock: 10,
  },
  {
    // id: 2,
    name: "pantalon",
    price: 400,
    description: "Pantalon verano - diferentes motivos",
    image: [
      "https://i.pinimg.com/736x/69/51/d3/6951d3a58296c1e2886972c9f187478c.jpg",
    ],
    stock: 10,
  },
  {
    // id: 3,
    name: "gorra",
    price: 100,
    description: "Gorra tipo trucker",
    image: [
      "https://res.cloudinary.com/dmfmud5fb/image/upload/v1673301853/ecommerceMelindaMuriel/ek1cuwbmzbfxnhp56wry.webp",
    ],
    stock: 10,
  },
  {
    // id: 4,
    name: "cuadro",
    price: 100,
    description: "Cuadro",
    image: [
      "https://res.cloudinary.com/dmfmud5fb/image/upload/v1673301448/ecommerceMelindaMuriel/egdakfyoqisvbzfubxfn.png",
    ],
    stock: 10,
  },
  {
    // id: 4,
    name: "huevos",
    price: 100,
    description: "3 huevos",
    image: [
      "https://res.cloudinary.com/dmfmud5fb/image/upload/v1673301871/ecommerceMelindaMuriel/nyi3pfnulfb1if2strld.webp",
    ],
    stock: 10,
  },
  {
    name: "vacio1",
    price: 400,
    description: "Producto sin stock",
    image: [],
    stock: 0,
  },
  {
    name: "vacio 2",
    price: 200,
    description: "Producto sin stock",
    image: [],
    stock: 0,
  },
];

module.exports = {
  creacionUsuarioSuperAdmin: async () => {
    try {
      if (!(await User.findAndCountAll())?.count) {
        try {
          const [usuario, creado] = await User.findOrCreate({
            where: { email: "a@a.a" },
            defaults: {
              username: "SUPERADMIN",
              password: await encrypt("Asd123"),
              role: "superAdmin",
            },
          });
          if (creado) {
            await UserDetails.create({
              UserId: usuario.id,
            });
            await Cart.create({
              UserId: usuario.id,
            });
            console.log("Exito: Usuario superAdmin creado");
          }
        } catch (e) {
          console.log("ERROR al semillar usuario superAdmin");
          console.log(e);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  creacionProductos: async () => { 
    try {
      if (!(await Product.findAndCountAll())?.count) {
        try {
          await Product.bulkCreate(productosIniciales);
          console.log("Exito: Productos creados");
        } catch (e) {
          console.log("ERROR al semillar productos");
          console.log(e);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  },
};
