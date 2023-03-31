import express from "express";
import bodyParser from "body-parser";
import router from "./routes/index.js";
const app = express();
//Configurtions
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);
// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({ 
    extended: true                
}));
// Routes
app.use(router)
//Inicializating server, reading...
app.listen(app.get('port'),()=>{
    console.log(`Server listening on port ${app.get('port')}`);
});