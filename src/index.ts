import * as dotenv from "dotenv";
import express, { Request, Response} from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

dotenv.config();


app.get('/', (req: Request, res: Response) => {
  const message: {"welcome": string} = {"welcome": "Hello World!"};
  res.json(message);
});



const PORT: number = parseInt(process.env.PORT as string, 10);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});