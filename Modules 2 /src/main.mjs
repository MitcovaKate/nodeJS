import ui from './modules/ui.mjs'
import data from "./modules/data.mjs"
ui.renderCatatlog(data.products,(n,product,q)=>{
    cart.items.push({ n, product, q });
    // console.log(n, product, q);
console.log(cart)
    
})
