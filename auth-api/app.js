import express from "express";
import { createInitialData } from './src/config/db/initialData.js';
import router from "./src/modules/user/routes/userRoutes.js";

const app = express();

const env = process.env;
const PORT = env.PORT || 8080;

createInitialData();
app.use(express.json());
app.use(router);
app.get("/api/status",(req,res)=> {
    return res.status(200).json({
        service:"Auth-API",
        status:"up",
        httpStatus:200
    })
})

app.listen(PORT, () => {
    console.info(`Server rodando na porta ${PORT}`)
})