const mongoose = require("mongoose");
const app = require("./app");
const port = process.env.PORT || 3077;
const { API_VERSION, IP_SERVERDB, portDb, IP_SERVER } = require("./config");

mongoose.connect(`mongodb://${IP_SERVERDB}:${portDb}/mezdri`,{useNewUrlParser: true, useUnifiedTopology: true}, (err, res) => {
    if (err){
        throw err;
    }else {
        console.log("La Conexion a la base de datos es Correcta");
        app.listen(port, () => {
            console.log('#########################');
            console.log('####### API REST ########');
            console.log('#########################');
            console.log(`http://${IP_SERVER}:${port}/api/${API_VERSION}/`);
        })
    }
});

