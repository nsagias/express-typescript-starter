import * as dotenv from "dotenv";
import express, { Request, Response} from "express";
import cors from "cors";
import helmet from "helmet";
import products from "../products_db";
import { IProduct, Product, Products } from "../products.models";

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

dotenv.config();


app.get('/', (req: Request, res: Response) => {
  const message: {"welcome": string} = {"welcome": "Hello World!"};
  res.json(message);
});


app.get('/products', (req: Request, res: Response) => {
  let allProducts: Products;
  try {
    allProducts = [...products];
    if (!allProducts) allProducts = {message: "undefind"};
    if (!Array.isArray(allProducts)) allProducts = {message: "not and array"};
    if (Array.isArray(allProducts) &&  allProducts.length <= 0) allProducts = {message: "zero length"};
    
    // res.json(allProducts);
    
  } catch (error: any) {

    allProducts = {message: error.message};
    console.error(allProducts);
  };
  res.status(200).json(allProducts);

});


app.get('/products/:id', (req: Request, res: Response) => {
  let productById: Product;
  try {
    productById = products.find((p) => p._id === req.params.id);
    if (!productById) productById = {message: "undefind"};
    if (productById !== productById as IProduct ) productById = {message: "undefind"};
    return res.json(productById);

  } catch (error: any) {

    productById = {message: error.message};
    console.error(productById);
    return res.status(404).json(productById);
   
  };

});


app.get('/a-products', async (req: Request, res: Response) => {
  const message: Products = await products;
  res.json(message);
});


const PORT: number = parseInt(process.env.PORT as string, 10);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});