import express from "express";
import bodyParser from "body-parser";
import router from "./routes/index.js";
import cors from "cors";

const app = express();
app.use(cors());

//Configurations
app.set('port', process.env.PORT || 5000);
app.set('json spaces', 2);
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