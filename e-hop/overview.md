# templating engines

template
    |
    v
 +---------+
|          |
|  engine  | <---------    data 
|          |    
|          |
+----------+
     |
     v
 rendered result


 user
   |
   V
   home.html(catalog)
         |
         +--Product 1
                |
                +----<a href="/buy/1">--->  /buy/xxxxx
                                              |
     +--Product 2                          order.html
             |
             +----<a href="/buy/2">--->  /buy/xxxxx|
   
     +--Product 3                                   
                                         

     Client
     --------------------- req GET-------"/buy/1---->req.url 
                                                       V
                                                       id
                                                       V
                                                       V product=getProductById(id) <----data
                                                       V    V
                           render(order.html,{product:product})  
                                                      V
                                                      +
      form<-----resHTML-------------------------------     
      |
      V
      fills data
      |
      V
      SUBMIT
      V
      name="fullName"     |
      name="emailAdress"  | ---> /pay?fullName=John Doe&emailAdress=...-----+
      name="phoneNumber"  |                                                 |
                                                                            V 
                                                                fullName=John Doe&emailAdressDoe&emailAdress   
                                                                            | 
                                                              querystring.parse() 
                                                                            |   
                                                                            V
                                                                            {
                                                                     fullName=John Doe&emailAdress}
            
                show form                       process form
            
              s           e                    s        e                       
               +--req-----+                    +--req-- +
               |          |                    |        |
               |          V                    |        V
  -------------X----------X---------------------X-------X                                                                         |           ^
                                    V           |
                                   +------------+  
                                    id(input > form)  
                                     window
                                      client                                           


 how to save
                    parse
                       |
 orders.json-----read--+->[{},{}]
                            |
                            V
                            .push()
                            |
                            V
                            [{},{},{}]
                            |
                            V
                            +
orders.json<-----write--+--
                        |
                        stringify


  GET----------req ?productId=1&fullName=...----->querystring.parse()
                                                       |
                                                       V
                                                    data={
                                                      id:.... <------uuidi()
                                                      paid: <-----------false
                                                      productId:....
                                                      fullName
                                                      ....
                                                    }
                                                    |
                                                    V
                                                    saveOrder()
                                                    |
                                                    V
                                                    orders.json

  stripe/gateway  
  >payment link + redirect

  app----api/info/product + price + payment link-->STRIPE   
                                              |
                                              +
 <-------------url ----------------------------  

client ---url--->+
                 |
                 pay/cancel
                 |
                 V