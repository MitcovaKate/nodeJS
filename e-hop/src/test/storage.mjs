import {getProducts} from './modules/data.mjs'
import { get } from "http";

getProducts().then(products => console.log(products))

const getData = async () => {
    let products = await getProducts()
  
    return products
  }