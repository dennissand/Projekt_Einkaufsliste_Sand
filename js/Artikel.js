/**
 * Diese Klasse beinhaltet die Artikel Attribute 
 */
class Artikel {
    static artikelCounter = 1

    /**
     * werden die Artikel festgelegt
     * @param {name}
     * @param {index} 
     * @param {menge}       
     */
    constructor(name, index, menge = 1) {
        
        this.id = Artikel.artikelCounter++
        this.index = index
        this.name = name
        this.gekauft = false
        this.menge = menge
    }
}