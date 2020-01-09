// Array wo die Schüler lokal gesichert werden
let schuelers = [];
// URL an welche die Requests gesendet werden
let url = 'http://localhost:3000';
// Schüler Objekt
function Schueler(id, firstname, lastname, klasse, zweig) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.klasse = klasse;
    this.zweig = zweig;
}

let app = new Vue({
    // Element auf welches Vue zugreifen soll
    el: '#app',
    // Methode welche direkt beim Start ausgeführt werden soll
    mounted: function() {
        this.getSchuelers()
    },
    // Daten welche mit dem v-model korespondieren
    data: {
        firstname: '',
        lastname: '',
        klasse: '',
        zweig: '',
        schuelers
    },
    // Auflistung aller Methoden
    methods: {
        // Methode um alle Schüler vom Backend zu holen
        getSchuelers: async function() {
            this.schuelers = []
            try {
                // Axios führt einen AJAX Request an das Backend aus 
                const resp = await axios.get(url + '/schueler');
                for (let i = 0; i < resp.data.data.length; i++) {
                    this.schuelers.push(
                        new Schueler(
                            resp.data.data[i].id,
                            resp.data.data[i].firstname,
                            resp.data.data[i].lastname,
                            resp.data.data[i].klasse,
                            resp.data.data[i].zweig,
                        )
                    )
                }
            } catch (err) {
                console.log(err)
            }
        },
        // Methode welche einen Schüler hinzufügt
        addSchueler: async function() {
            try {
                const resp = await axios.post(url + '/schueler', {
                    firstname: this.firstname,
                    lastname: this.lastname,
                    klasse: this.klasse,
                    zweig: this.zweig
                })
                if (resp.data.success) {
                    this.getSchuelers()
                } else {
                    alert('Schüler konnte nicht hinzugefügt werden')
                }
            } catch (error) {
                console.log(error)
            }
        },
        // Methode welche einen Schüler löscht
        deleteSchueler: async function(inputSchueler) {
            try {
                const resp = await axios.delete(url + '/schueler/' + inputSchueler.id)
                if (resp.data.success) {
                    this.getSchuelers()
                } else {
                    alert('Schüler konnte nicht gelöscht werden')
                }
            } catch (err) {
                console.log(err)
            }
        }
    }
});