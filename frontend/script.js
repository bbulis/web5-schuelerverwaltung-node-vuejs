let schuelers = [];

let url = 'http://localhost:3000';

function Schueler(id, firstname, lastname, klasse, zweig) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.klasse = klasse;
    this.zweig = zweig;
}

let app = new Vue({
    el: '#app',
    mounted: function() {
        this.getSchuelers()
    },
    data: {
        firstname: '',
        lastname: '',
        klasse: '',
        zweig: '',
        schuelers
    },
    methods: {
        getSchuelers: async function() {
            this.schuelers = []
            try {
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