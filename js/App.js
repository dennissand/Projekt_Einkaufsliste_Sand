/**
 * Diese Klasse steuert das Modell der ShoppingList
 *
 * @property {string}   STORAGE_KEY          - Name des Eintrags im LocalStorage
 * @property {Gruppe[]} gruppenListe         - enthält die Artikelgruppen
 * @property {number}   aktiveGruppe         - enthält die ID der aktuell ausgewählten Gruppe
 * @property {boolean}  meldungenAusgeben    - steuert, ob eine Meldung ausgegeben werden soll oder nicht
 * @property {boolean}  einkaufenAufgeklappt - merkt sich, ob die "Einkaufen"-Liste aufgeklappt ist
 * @property {boolean}  erledigtAufgeklappt  - merkt sich, ob die "Erledigt"-Liste aufgeklappt ist
 */

class App {
    static STORAGE_KEY = "einkaufslisteDaten"
    static gruppenListe = []
    static aktiveGruppe = null
    static meldungenAusgeben = true

    /**
     * Sucht eine Gruppe nach ihrer ID und liefert sie als Objekt zurück
     * @param {number} gruppenId - ID der gesuchten Gruppe
     * @returns {Gruppe|null} gefundeneGruppe - die gefundene Gruppe; `null`, wenn nichts gefunden wurde
     */
    static gruppeFinden(gruppenId) {
        const gefundeneGruppen = this.gruppenListe.filter((gruppe) => gruppe.id == gruppenId)
        if (gefundeneGruppen.length > 0) {
            return gefundeneGruppen[0]
        } else {
            App.informieren(`[App] Gruppe "${gruppenId}" nicht gefunden`, true)
            return null
        }
    }

    /**
     * Fügt eine Gruppe in der Gruppenliste hinzu
     * @param {string} name - Name der neuen Gruppe
     * @returns {Gruppe} neueGruppe - die neu hinzugefügte Gruppe
     */
    static gruppeHinzufuegen = (name) => {

        const gleicheGruppen = this.gruppenListe.filter(gruppe => gruppe.name === name)
        // keine Gruppe mit diesem Namen vorhanden
        if (gleicheGruppen.length === 0) {
            let neueGruppe = new Gruppe(name, this.gruppenListe.length)
            this.gruppenListe.push(neueGruppe)
            console.log(neueGruppe)
            App.informieren(`[App] Gruppe "${neueGruppe.name}" hinzugefügt`)
            this.aktiveGruppe = neueGruppe.id
            return neueGruppe
        } else {
            App.informieren(`[App] Gruppe "${name}" existiert schon!`, true)
        }
    }

    /**
     * Benennt die Gruppe mit der ID `gruppenId` um
     * @param {number} gruppenId - ID der umzubenennenden Gruppe
     * @param {string} neuerName - der neue Name der Gruppe
     */
    static gruppeUmbenennen(gruppenId, neuerName) {
        let gruppe = this.gruppeFinden(gruppenId)
        if (gruppe) {
            App.informieren(`[App] Gruppe "${gruppe.name}" umbenannt in "${neuerName}"`)
            gruppe.name = neuerName

        }
    }

    /**
     * Entfernt die Gruppe mit der `gruppenId`
     * @param {number} gruppenId - ID der zu löschenden Gruppe
     */
    static gruppeEntfernen(gruppenId) {
        let gruppe = this.gruppeFinden(gruppenId)
        if (gruppe) {
            let index = this.gruppenListe.indexOf(gruppe)
            // alle Artikel dieser Gruppe entfernen
            gruppe.artikelListe.map((artikel) => gruppe.artikelEntfernen(artikel))
            this.gruppenListe.splice(index, 1)
            App.informieren(`Gruppe "${gruppe.name}" entfernt`)
        } else {
            App.informieren(`Gruppe "${gruppenId}" konnte NICHT entfernt werden`, true)
        }
    }

    /**
     * Gibt die Gruppen mit Artikeln auf der Konsole aus
     */
    static allesAuflisten() {
        this.informieren("\nEinkaufsliste              ^")
        this.informieren("----------------------------")
        this.gruppenListe.map(gruppe => {
            console.debug(`[${gruppe.name}]`)
            gruppe.artikelAuflisten(false)
        })
        console.debug()
    }

    /**
     * Liest den Startzustand aus einer JSON-Datei ein
     * @param {string} dateiname - Name der einzulesenden JSON-Datei
     */
    static async datenEinlesen(dateiname = "js/startzustand.json") {
        const response = await fetch(dateiname)
        const daten = await response.json()
        this.initialisieren(daten)
    }

    /**
     * Initialisiert die App  aus einer JSON-Datei oder aus dem LocalStorage
     * @param {object} jsonDaten - die übergebenen JSON-Daten
     */
    static initialisieren(jsonDaten) {
        this.gruppenListe = []
        jsonDaten.gruppenListe.map(gruppe => {
            let neueGruppe = this.gruppeHinzufuegen(gruppe.name)
            gruppe.artikelListe.map(artikel => {
                neueGruppe.artikelObjektHinzufuegen(artikel)
            })
        })
        this.aktiveGruppe = jsonDaten.aktiveGruppe
    }

    /**
     * Deaktiviert die Konsolen-Ausgabe in {@link informieren()}
     */
    static stummschalten() {
        this.meldungenAusgeben = false
    }

    /**
     * Aktiviert die Konsolen-Ausgabe in {@link informieren()}
     */
    static lautschalten() {
        this.meldungenAusgeben = true
    }

    /**
     * Speichert den App-Zustand im LocalStorage
     */
    static speichern = () => {
        const json = {
            gruppenListe: this.gruppenListe,
            aktiveGruppe: this.aktiveGruppe,
        }
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(json))
    }

    /**
     * Lädt den App-Zustand aus dem LocalStorage
     */
    static laden = () => {
        let daten = JSON.parse(localStorage.getItem(this.STORAGE_KEY))
        this.initialisieren(daten)
    }

    /**
     * Gibt eine Meldung aus und speichert den aktuellen Zustand im LocalStorage
     * @param {string} nachricht - die auszugebende Nachricht
     * @param {boolean} istWarnung - steuert, ob die {@link nachricht} als Warnung ausgegeben wird
     */
    static informieren(nachricht, istWarnung) {
        if (this.meldungenAusgeben) {
            if (istWarnung) {
                console.warn(nachricht)
            } else {
                console.debug(nachricht)
                this.speichern()
            }
        }
    }
}

