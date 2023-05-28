import express from "express";
import bodyParser from "body-parser";
import router from "./routes/index.js";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(cors());

//Configurations
app.set('port', process.env.PORT || 5000);
app.set('json spaces', 2);

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,PUT,POST,DELETE',
    credentials: true
}))

app.use(cookieParser());
app.use(express.json());
// Upload img
// Cron sending emails

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true                
}));

// Routes
app.use(router);
//Inicializating server, reading...
app.listen(app.get('port'),()=>{
    console.log(`Server listening on port ${app.get('port')}`);
});