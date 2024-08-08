import Paciente from "../models/Pacientes.js";

const agregarPaciente = async (req, res) => {

    const paciente = new Paciente(req.body)
    paciente.veterinario = req.veterinario._id; 
    // console.log(paciente);

    try {
        const pacienteAlmacenado = await paciente.save(); 
        res.json(pacienteAlmacenado); 

        // console.log(paciente);
    } catch (error) {
        console.log(error);
    }
}

const mostrarPaciente = async(req, res) => {
    const pacientes = await Paciente.find().where('veterinario').equals(req.veterinario); 
    res.json(pacientes)
}

const obtenerPacientes = async (req, res) => {
    const {id} = req.params; 
    const paciente = await Paciente.findById(id)
    // console.log(paciente);

    if(!paciente){
        return res.status(404).json({ msg : "No encontrado" })
    }

    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        return res.json({ msg : "Accion no valida " }); 
    }

    if (paciente) {
        res.json(paciente)
    }
}

const actualizarPacientes = async (req, res) => {

    const {id} = req.params; 
    const paciente = await Paciente.findById(id)
    // console.log(paciente);

    if(!paciente){
        return res.status(404).json({ msg : "No encontrado" })
    }

    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        return res.json({ msg : "Accion no valida " }); 
    }

   
    // actualizar paciente 
    paciente.nombre  = req.body.nombre || paciente.nombre;
    paciente.propietario  = req.body.propietario || paciente.propietario;
    paciente.email  = req.body.email || paciente.email;
    paciente.fecha  = req.body.fecha || paciente.fecha;
    paciente.sintomas  = req.body.sintomas || paciente.sintomas;

    try {
        const pacienteActualizado = await paciente.save(); 
        res.json({ pacienteActualizado })
    } catch (error) {
        console.log(error);
    }
    

}

const eliminarPacientes = async (req, res) => {

    const {id} = req.params; 
    const paciente = await Paciente.findById(id)
    // console.log(paciente);

    if(!paciente){
        return res.status(404).json({ msg : "No encontrado" })
    }

    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        return res.json({ msg : "Accion no valida " }); 
    }

    try {
        await paciente.deleteOne(); 
        res.json({ msg : "paciente eliminado" })
    } catch (error) {
        console.log(error);
    }


}

export { agregarPaciente, mostrarPaciente, obtenerPacientes, actualizarPacientes, eliminarPacientes }  