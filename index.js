import express from 'express';
import dotenv from 'dotenv';
import connectarDB from './config/db.js';
import VeterinarioRoutes from './routes/veterinarioRoutes.js';
import PacienteRoutes from './routes/pacienteRoutes.js';
import cors from 'cors'; 

const app = express()
app.use(express.json()); 
dotenv.config();
connectarDB();

const dominiosPermitidos = [process.env.FRONT_URL]; 
const corsOptions = {
    origin: function(origin, callback){
        if (dominiosPermitidos.indexOf(origin) !== -1) {
            callback(null, true)
        }else{
            callback(new Error('No permitodo por CORS')) 
        }
    }
}

app.use(cors(corsOptions))
app.use('/api/veterinarios', VeterinarioRoutes);
app.use('/api/pacientes', PacienteRoutes);


const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`funcionando desde el puerto ${PORT}`);
})