# backend project 
# Abstract
        *Developer is responsible for server-side web application logic and database/model integration. Write the web services and APIs that can seamlessly use by front-end developers and mobile application developers.

# description 
 * this project is related to e-commerce website where we have to create admin and supervisor(user) 
 * admin can login create update and delete the product 
 * supervisor can order the product and update in the order section as a normal user do in e-commarce website and cancle the order
 * in this project we create three collection 
      1) user
      2) product
      3) order
      
  * in the user collection I created two api 
    1) createUser
    2) login user
    while create the user we have to give the Designation as "admin" or "supervisor" along with name username password we have to give
    and in login we have to give username and password
    
    in login api we have used 'jsonwebtokon' to create token 
    
  * in product api I created four api 
     in the product api all the function oprate by admin
     as create product change the price and update delete
     
     api name in product 
      1) createProduct
      2) getAllProduct
      3) updateProduct
      4) deleteProduct
      
   * in order api have 3 api 
      in the order operate by user as user order the product to flipkart
      user can change the Quantity paid or not and placed or not get refund or not that all the functionalty 
      
        1) createOrder
        2) getAllOrder
        3) updateOrder
