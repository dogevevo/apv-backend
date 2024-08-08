import express from 'express'; 
const router = express.Router();
import { agregarPaciente, mostrarPaciente, obtenerPacientes, actualizarPacientes, eliminarPacientes} from '../controllers/pacienteController.js';
import checkAuth from '../middleware/authMiddleware.js';

router.route('/').post(checkAuth, agregarPaciente).get(checkAuth, mostrarPaciente)
router.route('/:id').get(checkAuth, obtenerPacientes).put(checkAuth, actualizarPacientes).delete(checkAuth, eliminarPacientes);
export default router; 