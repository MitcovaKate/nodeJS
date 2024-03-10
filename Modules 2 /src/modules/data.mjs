// const products = [
//   { name: "Product 1", price: 200 },
//   { name: "Another Product 2", price: 2100 },
//   { name: "Yep ,Product 3", price: 455600 },
// ];
import fs from 'node:fs'

const getProducts_ = (cb) => {
 fs.readFile("./storage/products.json",(err,data)=>{
  if(err !== null){
    console.log("Error:cannot read products!")
  }
  else if(data){
    let products = JSON.parse(data.toString())
     cb(products)
    }
 
 })

}


const getProducts = async () => {
  let data = await readFile("./storage/products.json")
  let products = JSON.parse(data.toString())
  return products
}

const saveCart = async (cart) => {
  await writeFile("./storage/cart.json", JSON.stringify(cart, null, 2));
  return true;
}

// HW1: make a function  getCart
const getCart = async () => {
  let data = await readFile("./storage/cart.json")
  let cart = JSON.parse(data.toString())
  return cart
}

export { getProducts, saveCart, getCart }
