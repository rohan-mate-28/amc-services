import express from "express";
import cookieParser from "cookie-parser"; 
import cors from "cors";
import conectdb from "./Utils/db.js";
import customerroute from "./routes/customerroute.js";
import adminroute from "./routes/adminroute.js";
import orderroute from "./routes/orderroute.js"
import servicesroute from "./routes/servicesroute.js"
import productroute from "./routes/productroute.js"
import product_crud_route from "./routes/product_crud_route.js"
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
const allowedOrigins = [
  "http://localhost:5173",
  "https://chimerical-treacle-110cc2.netlify.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


const PORTS=3020;
app.use("/app/v1/customer",customerroute);
app.use("/app/v1/admin",adminroute);
app.use("/app/v1/admin/order",orderroute);
app.use("/app/v1/customer/order",orderroute);
app.use("/app/v1/customer/services",servicesroute);
app.use("/app/v1/admin/services",servicesroute);
app.use("/app/v1/product",productroute);
app.use("/app/v1/crudsproduct",product_crud_route); 

conectdb().then(()=>{
      try{
            app.listen(PORTS,()=>{
                  console.log(`server is started on ${PORTS}`);
            })
      }
      catch(err){
            console.log("failed to conect db",err); 
      };
});
 
