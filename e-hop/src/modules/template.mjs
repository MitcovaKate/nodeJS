import { readFile } from "node:fs/promises"
import Twig from "twig"
// const loadTemplate = async (name) => {
//     return (await readFile(`pages/${name}`)).toString()
// }

const render =async(template,data)=>{

return new Promise((resolve,regect)=>{
  Twig.renderFile(template, data, (err, html) => {
        if (err) regect(err)
       resolve(html)
      });
}) 




  
}

// export {loadTemplate ,render } 
export {render } 