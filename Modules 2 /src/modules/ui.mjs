import {helper} from "./helper.mjs";

const renderCatatlog = (products) => {
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
  console.log("choose >");
};

export default { renderCatatlog };
