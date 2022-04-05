/**
 * Die Komponente Gruppe beinhaltet die Funktionen der Artikel
 */
class Gruppe {
    static gruppenCounter = 1

    /**
     * 
     * @param name
     * @param index
     */
    constructor(name, index) {
        this.id = Gruppe.gruppenCounter++
        this.index = index
        this.name = name
        this.artikelListe = []
    }

    /**
     * 
     * @param suchName
     * @param meldungAusgeben
     * @returns {null|*}
     */
    artikelFinden(suchName, meldungAusgeben) {
        let gefundeneArtikel = this.artikelListe.filter(artikel => artikel.name === suchName)
        if (gefundeneArtikel.length > 0) {
            return gefundeneArtikel[0]
        }
        if (meldungAusgeben) {
            App.informieren(`[${this.name}] Artikel "${suchName}" nicht gefunden`, true)
        }
        return null
    }

    /**
     * 
     * @param gekauft
     */
    artikelAuflisten(gekauft) {
        this.artikelListe.map(artikel => {
            if (artikel.gekauft === gekauft) {
                console.debug(`  ${artikel.name}`)
            }
        })
    }

    /**
     * 
     * @param name
     * @param menge
     * @returns {Artikel}
     */
    artikelHinzufuegen(name, menge) {
        let vorhandenerArtikel = this.artikelFinden(name, false)
        if (!vorhandenerArtikel) {
            let neuerArtikel = new Artikel(name, this.artikelListe.length, menge)
            this.artikelListe.push(neuerArtikel)
            App.informieren(`[${this.name}] Artikel "${name}" hinzugefügt`)
            return neuerArtikel
        } else {
            this.artikelMengeAendern(vorhandenerArtikel, menge)
            App.informieren(`[${this.name}] Artikel "${name}" existiert schon!`, true)
        }
    }

    /**
     * 
     * @param artikelobjekt
     * @param neueMenge
     */
    artikelMengeAendern(artikelobjekt, neueMenge) {
        artikelobjekt.menge = artikelobjekt.menge + neueMenge
    }

    /**
     * 
     * @param artikel
     */
    artikelObjektHinzufuegen(artikel) {
        let neuerArtikel = this.artikelHinzufuegen(artikel.name)
        // kopiert alle Properties aus "artikel" nach "neuerArtikel"
        Object.assign(neuerArtikel, artikel)
    }

    /**
     * 
     * @param alterName
     * @param neuerName
     */
    artikelUmbenennen(alterName, neuerName) {
        let artikel = this.artikelFinden(alterName, true)
        if (artikel) {
            artikel.name = neuerName
            App.informieren(`[${this.name}] Artikel "${alterName}" umbenannt in "${neuerName}"`)
        }
    }

    /**
     * 
     * @param name
     */
    artikelEntfernen(name) {
        console.log(name)
        let artikel = this.artikelFinden(name, true)
        if (artikel) {
            let index = this.artikelListe.indexOf(artikel)
            this.artikelListe.splice(index, 1)
            App.informieren(`[${this.name}] Artikel "${name}" entfernt`)
        }
    }
}