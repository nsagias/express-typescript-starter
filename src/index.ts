import * as dotenv from "dotenv";
import express, { Request, Response} from "express";
import cors from "cors";
import helmet from "helmet";
import products, { IProduct, Product, Products} from "../products_db";

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
  const message: Products = products;
  res.json(message);
});


app.get('/products/:id', (req, res) => {
  let product: Product;
  try {
    product = products.find((p) => p._id === req.params.id);
    if (!product) product = {message: "undefind"};
    res.json(product);
  } catch (error: any) {
    product = {message: error.message};
    console.error(product);
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