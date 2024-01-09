const mascotaInput = document.querySelector( "#mascota" );
const propietarioInput = document.querySelector( "#propietario" );
const telefonoInput = document.querySelector( "#telefono" );
const fechaInput = document.querySelector( "#fecha" );
const horaInput = document.querySelector( "#hora" );
const sintomasInput = document.querySelector( "#sintomas" );
const formulario = document.querySelector( "#nueva-cita" );
const contenedorCitas = document.querySelector( "#citas" );


class Citas {
    
    constructor() {
        this.citas = [];
    }


    agregarCita( cita ) {
        
        this.citas = [ ...this.citas , cita ];
        console.log( this.citas );

    }


    eliminarCita( id ) {
        this.citas = this.citas.filter( cita => cita.id != id );
    }


}


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

            divCita.appendChild( mascotaParrafo );
            divCita.appendChild( propietarioParrafo );
            divCita.appendChild( telefonoParrafo );
            divCita.appendChild( fechaParrafo );
            divCita.appendChild( horaParrafo );
            divCita.appendChild( sintomasParrafo );
            divCita.appendChild( btnEliminar );


            
            contenedorCitas.appendChild( divCita );

        } );
    }

    limpiarHTML() {
        
        while( contenedorCitas.firstChild ) {
            contenedorCitas.removeChild( contenedorCitas.firstChild );
        }

    }

}

const ui = new UI();
const administrarCitas = new Citas();


eventListeners();

function eventListeners() {

    mascotaInput.addEventListener( "input" , datosCita );
    propietarioInput.addEventListener( "input" , datosCita );
    telefonoInput.addEventListener( "input" , datosCita );
    fechaInput.addEventListener( "input" , datosCita );
    horaInput.addEventListener( "input" , datosCita );
    sintomasInput.addEventListener( "input" , datosCita );
    formulario.addEventListener( "submit" , nuevaCita ); 

}


const citaObj = {
    mascota: "",
    propietario: "",
    telefono: "",
    fecha: "",
    hora: "",
    sintomas: ""
}


function datosCita( e ) {

    citaObj[e.target.name] = e.target.value;
    console.log( citaObj );

}


function nuevaCita( e ) {

    e.preventDefault();
    const { mascota , propietario , telefono , fecha , hora , sintomas } = citaObj;
    if ( mascota === "" || propietario === "" || telefono === "" || fecha === "" || hora === "" || sintomas === "" ) {

        ui.imprimirAlerta( "Todos los campos son obligatorios" , "error" );
        return;

    }

    citaObj.id = Date.now();

    administrarCitas.agregarCita( {...citaObj} );
    reiniciarObjeto();
    formulario.reset();
    ui.imprimirCitas( administrarCitas );

}


function reiniciarObjeto() {

    citaObj.mascota = "";
    citaObj.propietario = "";
    citaObj.telefono = "";
    citaObj.fecha = "";
    citaObj.hora = "";
    citaObj.sintomas = "";

}


function eliminarCita( id ) {
    
    administrarCitas.eliminarCita( id );
    ui.imprimirAlerta( "La cita se elimino correctamente" );
    ui.imprimirCitas( administrarCitas );
    
}



