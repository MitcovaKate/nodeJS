import {helper} from "./helper.mjs";
import readline from 'readline'

const io=readline.createInterface(
  {
    input:process.stdin,
    output:process.stdout
  }
)

const renderCatatlog = (products,cart,confirmCB) => {
  console.clear();
helper("Catalog:")
  // products.forEach((product,idx)=>{
  //     console.log(idx+1,product.name,product.price)
  // })

  products.forEach((product, idx) => {
    const idxStr = (idx + 1).toString().padStart(3, " "); // 3 ячейки для индекса
    const nameStr = product.name.padEnd(20, " "); // 20 ячеек для названия
    const priceStr = product.price.toLocaleString().padEnd(7, " "); // 10 ячеек для цены

    console.log(`${idxStr} ${nameStr} ${priceStr}`);
  });
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
          switch (answer) {
            case "y":
              // Add product to cart
              cart.items.push({ n, product, q });
              console.log("Product added to cart!");
              confirmCB(cart); //  updated cart to callback
              
              break;
            case "n":
              console.log(`product "${product.name}" was not confirmes!`);
              break;
            default:
              console.log("Invalid option");
              break;
          }
          io.close();
         }) 
      
      })
    }
  });
};

export default { renderCatatlog };
