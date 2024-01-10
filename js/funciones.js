import Citas from "./classes/Citas.js";
import UI from "./classes/UI.js";
import { 
    mascotaInput , 
    propietarioInput , 
    telefonoInput , 
    fechaInput , 
    horaInput , 
    sintomasInput ,
    formulario
} from "./selectores.js";

const ui = new UI();
const administrarCitas = new Citas();
let editando;

const citaObj = {
    mascota: "",
    propietario: "",
    telefono: "",
    fecha: "",
    hora: "",
    sintomas: ""
}


export function datosCita( e ) {

    citaObj[e.target.name] = e.target.value;
    console.log( citaObj );

}


export function nuevaCita( e ) {

    e.preventDefault();
    const { mascota , propietario , telefono , fecha , hora , sintomas } = citaObj;
    
    if ( mascota === "" || propietario === "" || telefono === "" || fecha === "" || hora === "" || sintomas === "" ) {

        ui.imprimirAlerta( "Todos los campos son obligatorios" , "error" );
        return;

    }

    if ( editando ) {
    
        administrarCitas.editarCita( {...citaObj} );
        ui.imprimirAlerta( "Editado Correctamente" );
        formulario.querySelector( "button[type='submit']").textContent = "Crear Cita";
        editando = false;
         
    }
    else {
        
        citaObj.id = Date.now();
        administrarCitas.agregarCita( {...citaObj} );
        ui.imprimirAlerta( "Se agrego correctamente" );
    
    }


    reiniciarObjeto();
    formulario.reset();
    ui.imprimirCitas( administrarCitas );

}


export function reiniciarObjeto() {

    citaObj.mascota = "";
    citaObj.propietario = "";
    citaObj.telefono = "";
    citaObj.fecha = "";
    citaObj.hora = "";
    citaObj.sintomas = "";

}


export function eliminarCita( id ) {
    
    administrarCitas.eliminarCita( id );
    ui.imprimirAlerta( "La cita se elimino correctamente" );
    ui.imprimirCitas( administrarCitas );

}


export function cargarEdicion( cita ) {
    
    const { mascota , propietario , telefono , fecha , hora , sintomas , id } = cita;
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    formulario.querySelector( "button[type='submit']").textContent = "Guardar Cambios";
    editando = true;

}