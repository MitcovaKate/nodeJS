import http from 'node:http'
import querystring from 'node:querystring'
import { getProducts,getProductByID, saveOrder } from './modules/data.mjs'

import {render} from './modules/template.mjs'
import { readFile } from 'node:fs'
import {v4 as uuid} from 'uuid'
import stripeMode from 'stripe'
const stripe=stripeMode('sk_test_51P0sHYP3Qk5IuYwgLm0FwferKwhzFxRAWzMylL4C0of24bmg1ECMT5QvP2RkaaB55nejMBXhzCD6lluzIgIYXn7I00VnqbZDPl')

const server = http.createServer(async (req,res) =>{
  res.setHeader("Content-type", "text/html" )
  
// rendering
let html
if(req.url === "/"){
const products = await getProducts()
 html= await render('./pages/home.html',{products:products})
}
else if(req.url.startsWith("/images")){
html = await readFile(`.${req.url}`)
}
else if(req.url.startsWith("/buy")){
  let id=parseInt(req.url.split('/').pop())
  let product = await getProductByID(id)
  html= await render("./pages/order.html",{product:product})
} else if(req.url.startsWith("/pay")){
let parameters=req.url.split("?");
let data= querystring.parse(parameters[1])

data.id=uuid()
data.payed=false
data.productId=parseInt(data.productId)

await saveOrder(data);
let product= await getProductByID(data.productId);
//working with stripe
const productStripe= await stripe.products.create({
  name:product.name,
});
const price = await stripe.prices.create({
currency:"usd",
unit_amount:product.price * 100,
product:productStripe.id,
});
const paymentLink = await stripe.paymentLinks.create({line_items:[
  {
    price:price.id,
    quantity:1,
  },
]})
///////////////////////////////

html= `You will be rederected to stripe in 3 sec <a href="${paymentLink.url}">here</a>`;
res.setHeader("Refresh", `0 ; URL=${paymentLink.url}`);
}
  else {
        html=`Oops, not found ;(`
        res.statusCode = 404
        
    }
    res.end(html)
})


server.listen("3000", "localhost")

