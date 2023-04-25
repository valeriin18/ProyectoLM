import express from "express";
import bodyParser from "body-parser";
import router from "./routes/index.js";
import cors from "cors";

const app = express();

// Opciones de configuración de CORS
const allowedOrigins = ['http://localhost:3000'];

app.use(cors({
origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
    const msg = 'The CORS policy does not allow access from the specified origin.';
    return callback(new Error(msg), false);
    }
    return callback(null, true);
}
}));


//Configurations
app.set('port', process.env.PORT || 5000);
app.set('json spaces', 2);
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// Routes
app.use(router);

//Inicializating server, reading...
app.listen(app.get('port'),()=>{
    console.log(`Server listening on port ${app.get('port')}`);
});
