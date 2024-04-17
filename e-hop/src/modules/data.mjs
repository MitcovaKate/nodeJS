// import {readFile, writeFile} from 'node:fs/promises' ;
import postgres from 'postgres';
const sql=postgres('postgres://postgres:kate@localhost:10000/e_shop_db',{});
// const getProducts_ = (cb) => {
//     fs.readFile("./storage/products.json", (err, data)=> {
//         if (err !== null) {
//             console.log("Error: can't read products!")
//         } else if (data) {
//             let products = JSON.parse(data.toString())
//             cb(products)
//         }
//     })
// }

// const getProducts = async () => {
//     let data = await readFile("./storage/products.json")
//     let products = JSON.parse(data.toString())
//     return products
// }

const getProducts = async () => {
    let products =await sql`SELECT * FROM products`;
    return products ;
}


// const getProductByID = async (id) =>(await getProducts()).find ((product)=> product.id===id);

const getProductByID = async (id) =>(
    await sql`SELECT * FROM products WERE id = ${id};`).shift();

// const saveCart = async (cart) => {
//     await writeFile("./storage/cart.json", JSON.stringify(cart, null, 2));
//     return true;
// }

// // HW1: make a function called - getCart which using promisse will load the cart at the begining
// const getCart = async () => {
//     let data = await readFile("./storage/cart.json")
//     let cart = JSON.parse(data.toString())
//     return cart
// }


// const saveOrder = async (order) => {
// let data=await readFile("./storage/orders.json");
// let orders=JSON.parse(data.toString());
// orders.push(order);
// data=JSON.stringify(orders,null,2);
// writeFile("./storage/orders.json", data);
// }

const saveOrder = async (order) => {
    await sql`INSERT INTO orders (id,productId,fullName,emailAddress,phonenumber) 
              VALUES(${order.id},${order.productId},${order.fullName}, ${order.emailAddress},${order.phonenumber})`;
};

export { getProducts,getProductByID,saveOrder}