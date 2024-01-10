import {eliminarCita , cargarEdicion} from "../funciones.js";
import { contenedorCitas } from "../selectores.js";

class UI {

    imprimirAlerta( mensaje , tipoMensaje ) {

        const divMensaje = document.createElement( "DIV" );
        divMensaje.classList.add( "text-center" , "alert" , "d-block" , "col-12" );

        if ( tipoMensaje === "error" ) {
            divMensaje.classList.add( "alert-danger" );
        } 
        else {
            divMensaje.classList.add( "alert-success" );
        }

        divMensaje.textContent = mensaje;
        document.querySelector( "#contenido" ).insertBefore( divMensaje , document.querySelector( ".agregar-cita" ) );
        
        setTimeout(() => {
            divMensaje.remove();
        }, 5000 );

    }


    imprimirCitas( {citas} ) {

        this.limpiarHTML();

        citas.forEach( cita => {
            const { mascota , propietario , telefono , fecha , hora , sintomas , id } = cita;
            const divCita = document.createElement( "DIV" );
            divCita.classList.add( "cita" , "p-3" );
            divCita.dataset.id = id;
            
            const mascotaParrafo = document.createElement( "h2" );
            mascotaParrafo.classList.add( "card-title" , "font-weight-bolder" );
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement( "P" );
            propietarioParrafo.innerHTML = `
                <span class="font-weight-bolder">Propietario: </span> ${propietario}
            `;

            const telefonoParrafo = document.createElement( "P" );
            telefonoParrafo.innerHTML = `
                <span class="font-weight-bolder">Teléfono: </span> ${telefono}
            `;

            const fechaParrafo = document.createElement( "P" );
            fechaParrafo.innerHTML = `
                <span class="font-weight-bolder">Fecha: </span> ${fecha}
            `;

            const horaParrafo = document.createElement( "P" );
            horaParrafo.innerHTML = `
                <span class="font-weight-bolder">Hora: </span> ${hora}
            `;

            const sintomasParrafo = document.createElement( "P" );
            sintomasParrafo.innerHTML = `
                <span class="font-weight-bolder">Síntomas: </span> ${sintomas}
            `;

            const btnEliminar = document.createElement( "button" );
            btnEliminar.classList.add( "btn" , "btn-danger" , "mr-2" );
            btnEliminar.innerHTML = "Eliminar";
            btnEliminar.onclick = () => eliminarCita( id );

            const btnEditar = document.createElement( "button" );
            btnEditar.classList.add( "btn" , "btn-info" );
            btnEditar.innerHTML = "Editar";
            btnEditar.onclick = () => cargarEdicion( cita ); 

            divCita.appendChild( mascotaParrafo );
            divCita.appendChild( propietarioParrafo );
            divCita.appendChild( telefonoParrafo );
            divCita.appendChild( fechaParrafo );
            divCita.appendChild( horaParrafo );
            divCita.appendChild( sintomasParrafo );
            divCita.appendChild( btnEliminar );
            divCita.appendChild( btnEditar );

            contenedorCitas.appendChild( divCita );

        } );
    }

    limpiarHTML() {
        
        while( contenedorCitas.firstChild ) {
            contenedorCitas.removeChild( contenedorCitas.firstChild );
        }

    }

}

export default UI;