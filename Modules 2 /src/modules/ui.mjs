import readline from 'readline'

import { getProducts,getCart, saveCart} from "./data.mjs";
import {helper} from "./helper.mjs";


const io=readline.createInterface(
  {
    input:process.stdin,
    output:process.stdout
  }
)

const renderMainMenu=()=>{
console.clear();
console.log("==========");
console.log("Main Menu");
console.log("==========");
console.log("1. Catalog");
console.log("2. Cart");
console.log("0. Exit");
io.question("choose > ", async (answer) => {
  let option = parseInt(answer)
  switch(option) {
      case 1:
          let cart = await getCart();
          renderCart(cart, 'info')
          let products = await getProducts();
          renderCatalog(products, async (n, product, q) => {
              cart.items.push({ n, product, q })
              const saved = await saveCart(cart)
              renderMainMenu();
          });
           break;
    case 2:
      let loadCart = await getCart();
      renderCart(loadCart, 'option')
      break;
  case 0:
      io.close() 
      break;
}
});
}

const renderCart=(cart,view)=>{
  console.clear();
console.log("==========");
console.log("CART");
console.log("=========="); 
cart.items.forEach((item,idx)=>{
       console.log(idx + 1,item.product.name,item.q)
       });
       console.log("==========");
       console.log("1. Remove item");
       console.log("2. Change quantity");
       console.log("3. Checkout");
       console.log("0. Exit to main menu");
       console.log("==========");
       io.question("choose > ",answer=>{
        let option =parseInt(answer)
         if (isNaN(option)) {
           console.error("It is not a number!");
           return;
         }
       
         switch(option){
          case 1:
            io.question("What product do you want to delete > ", answer => {
              let option = parseInt(answer);
          
          if (option < 1 || option > cart.items.length) {
              console.error("Invalid option!");
              return;
            }
            cart.items.splice(option - 1, 1);
            console.log("Item removed successfully!");
            renderCart(cart);
          });
                 break;
          case 2:
            io.question("Which product's quantity do you want to change > ", answer => {
              let option = parseInt(answer);
              if (isNaN(option)) {
                console.error("It is not a number!");
                return;
              }
              if (option < 1 || option > cart.items.length) {
                console.error("Invalid option!");
                return;
              }
              io.question("Enter new quantity > ", newQuantity => {
              let quantity = parseInt(newQuantity);
              cart.items[option - 1].q = quantity;
              renderCart(cart);
            })
          });
          break;
          case 3:
        
          break;
          case 0:
            console.clear()
            getProducts((products)=>{
              renderCatatlog(products,(n,product,q)=>{
                 cart.items.push({ n, product, q });
                 renderMainMenu()
           })
          })
                break;
         }
      })
}

const renderCatatlog = (products,confirmCB) => {
  console.clear();

helper("Catalog:");
 
  products.forEach((product, idx) => {
    const idxStr = (idx + 1).toString().padStart(3, " "); // 3 ячейки для индекса
    const nameStr = product.name.padEnd(20, " "); // 20 ячеек для названия
    const priceStr = product.price.toLocaleString().padEnd(7, " "); // 10 ячеек для цены

    console.log(`${idxStr} ${nameStr} ${priceStr}`);
  });
  console.log("==========");
  console.log("0. Exit to main menu");
  io.question("choose > ",answer=>{
    let n =parseInt(answer)
     if (isNaN(n)) {
       console.error("It is not a number!");
       return;
     }
    if(1 <= n && n <= products.length){
      let product =products[n-1]
      io.question(`How many "${product.name}":? `,answer=>{
        let q=parseInt(answer)
        if (isNaN(q)) {
         console.error("It is not a number!");
         return;
          }

         let cost =q * product.price
         io.question(`Product cost = "${cost}": confirm (y/n) `,answer=>{
          switch(answer){
            case 'y':
              confirmCB(n,product,q)  
            break;
            case 'n':console.log(`product "${product.name}" was not confirmes!`); break;
            default:console.log('Invalid option'); break;     
          }
         
         }) 
      
      })
    }
    else if(n === 0){
      renderMainMenu()
    }
  });
};

export  {renderCatatlog, renderMainMenu, renderCart};
