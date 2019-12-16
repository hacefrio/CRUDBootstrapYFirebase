firebase.initializeApp({
    apiKey: "AIzaSyATX7l8DQWg7-Hrbz7Yg2jdVO-6HleUD78",
    authDomain: "proyecto-prueba-f746d.firebaseapp.com",
    projectId: "proyecto-prueba-f746d"
});

var db = firebase.firestore();
//Añadir datos
function guardar() {
    var nombre = document.getElementById('nombre').value;
    var ano = document.getElementById('ano').value;
    var artista = document.getElementById('artista').value;
    var unidadesVendidas = document.getElementById('unidadesVendidas').value;
    db.collection("DiscosTop").add({
        nombre: nombre,
        anno: ano,
        artista: artista,
        unidadesVendidas: unidadesVendidas
    })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}

//Mostrar datos
var tabla = document.getElementById("Tabla");
db.collection("DiscosTop").onSnapshot((querySnapshot) => {
    tabla.innerHTML = "";
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        tabla.innerHTML += `
            <tr>
            <th scope="row">${doc.id}</th>
            <td>${doc.data().anno}</td>
            <td>${doc.data().artista}</td>
            <td>${doc.data().nombre}</td>
            <td>${doc.data().unidadesVendidas}</td>
            <td><button class="btn btn-danger" onClick="eliminar('${doc.id}')">Eliminar</button></td>
            <td><button class="btn btn-warning" onClick="modificar('${doc.id}','${doc.data().anno}','${doc.data().artista}','${doc.data().nombre}','${doc.data().unidadesVendidas}')">Modificar</button></td>
        </tr >
        `

    });
});

//Eliminar datos
function eliminar(id) {
    db.collection("DiscosTop").doc(id).delete().then(function () {
        console.log("Document successfully deleted!");
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });
}

//modificar
function modificar(id, ano, artista, nombre, unidadesVendidas) {

    document.getElementById('nombre').value = nombre;
    document.getElementById('ano').value = ano;
    document.getElementById('artista').value = artista;
    document.getElementById('unidadesVendidas').value = unidadesVendidas;

    var boton = document.getElementById('boton');
    boton.innerHTML = 'Modificar';
    boton.onclick = function () {
        var washingtonRef = db.collection("DiscosTop").doc(id);
        var nombre = document.getElementById('nombre').value;
        var ano = document.getElementById('ano').value;
        var artista = document.getElementById('artista').value;
        var unidadesVendidas = document.getElementById('unidadesVendidas').value;

        return washingtonRef.update({
            nombre: nombre,
            anno: ano,
            artista: artista,
            unidadesVendidas: unidadesVendidas

        })
        
            .then(function () {
                console.log("Document successfully updated!");
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            }),
            boton.innerHTML = "Guardar",
            boton.onclick = "guardar()",
            document.getElementById('nombre').value = '',
            document.getElementById('ano').value = '',
            document.getElementById('artista').value = '',
            document.getElementById('unidadesVendidas').value = '' ;


    }


    // Set the "capital" field of the city 'DC'

}
