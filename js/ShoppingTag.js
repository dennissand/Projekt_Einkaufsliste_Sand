/**
 * Hauptkomponente der gesamten APP
 */


class ShoppingTag extends React.Component {
    constructor(props) {
        super(props);

        /**
         *
         * @type {{showGruppenDialog: boolean,
         * erledigtAufgeklappt: boolean,
         * menge: number,
         * aktiveGruppe: number,
         * einkaufenAufgeklappt: boolean}}
         */
        this.state = {
            aktiveGruppe: 1, menge: 1,
            einkaufenAufgeklappt: true, erledigtAufgeklappt: false, showGruppenDialog: false
        }
        /**
         * hier wird der letzte Zustand geladen
         */
        this.startzustandLaden()
    }

    /**
     *
     * @returns {Promise<void>}
     */
    async startzustandLaden() {
        let gespeicherterZustand = localStorage.getItem(App.STORAGE_KEY)
        if (gespeicherterZustand) {
            App.laden()
        } else {
            await App.datenEinlesen()
            this.setState(this.state)
        }
    }

    /**
     * bestimmt die Aktive Gruppe der zu kaufenden Artikel
     * @param {gruppenID}
     */
    setAktivGruppe = (gruppenID) => {
        this.setState({aktiveGruppe: gruppenID})
        App.aktiveGruppe = gruppenID
    }
    /**
     * hier wird festgelegt ob gekauft oder nicht gekauft
     * @param {artikel}
     */
    artikelChecken = (artikel) => {
        artikel.gekauft = !artikel.gekauft

        this.setState(this.state)
    }

    /**
     *hier wird der Artikel hinzugefügt
     */
    artikelHinzufuegen = () => {
        let eingabe = document.getElementById("eingabe")
        let neuerName = eingabe.value.trim()

        if (neuerName.length > 0) {
            let gruppeFinden = App.gruppeFinden(this.state.aktiveGruppe)
            gruppeFinden.artikelHinzufuegen(neuerName, this.state.menge)
            this.setState({
                gruppenListe: App.gruppenListe
            })
        }
        eingabe.value = ""
        eingabe.focus()
    }

    /**
     *mit dieser Funktion wird die Menge als Zahl hinzugefügt
     */
    mengeErhoehen = () => {
        this.setState({menge: this.state.menge + 1})
    }

    /**
     *mit dieser Funktion kann die Menge wieder reduziert werden
     * aktuell kann man sogar eine negative Menge angeben.
     * Bei dem selben Artikelnamen kann die Menge nachträglich geändert werden
     * die Ursprüngliche Funktion hat eine negative Menge verhindert(ist auskommentiert)
     */
    mengeReduzieren = () => {
        //this.setState({menge: this.state.menge - 1 > 0 ? this.state.menge - 1 : this.state.menge})
        this.setState({menge: this.state.menge - 1})
    }

    /**
     *die Funktion zeigt einmal die Liste an oder schleißt diese mit einem Symbol das "die Richtung" ändert. 
     */
    toggleEinkaufenAufgeklappt = () => {
        this.setState({einkaufenAufgeklappt: !this.state.einkaufenAufgeklappt})
    }

    /**diese Funktion zeigt die Liste an
     *
     */
    toggleErledigtAufgeklappt = () => {
        this.setState({erledigtAufgeklappt: !this.state.erledigtAufgeklappt})
    }

    /**
     *öffnet/zeigt an die Eigabefläche um Gruppen zu bearbeiten
     */
    gruppenDialogOpen = () => {
        this.setState({showGruppenDialog: !this.state.showGruppenDialog})
    }

    /**
     *
     * @returns {JSX.Element}
     */
    render = () => {


        return (

            <div>
                <header>
                    <h1>Einkaufsliste</h1>
                    <div className="eingabeleiste">

                        <label htmlFor="Artikel"><input type="text" id="eingabe" placeholder="Artikel hinzufügen"
                                                        autoComplete="on"/></label>
                        <span className="mengenfeld">{this.state.menge}</span>
                        <button onClick={this.mengeErhoehen}><span className="material-icons">arrow_circle_up</span>
                        </button>
                        <button onClick={this.mengeReduzieren}><span className="material-icons">arrow_circle_down</span>
                        </button>
                        <button onClick={this.artikelHinzufuegen}><span className="material-icons">add_circle</span>
                        </button>
                    </div>
                </header>

                <main>
                    <section>
                        <nav>
                            <h2>Einkauf
                                <i onClick={this.toggleEinkaufenAufgeklappt}
                                   className="material-icons">{this.state.einkaufenAufgeklappt ? "expand_less" : "expand_more"}</i>
                            </h2>
                            <dl>
                                {this.state.einkaufenAufgeklappt && App.gruppenListe.map(gruppe => (
                                    <GruppenTag key={gruppe.id} gruppe={gruppe} setAktivGruppe={this.setAktivGruppe}
                                                erledigt={false} aktiv={gruppe.id === this.state.aktiveGruppe}
                                                checkHandler={this.artikelChecken}/>
                                ))}
                            </dl>
                        </nav>
                    </section>
                    <hr/>
                    <section>
                        <h2>Erledigt
                            <i onClick={this.toggleErledigtAufgeklappt}
                               className="material-icons">{this.state.erledigtAufgeklappt ? "expand_less" : "expand_more"}</i>
                        </h2>
                        <dl>
                            {this.state.erledigtAufgeklappt && App.gruppenListe.map(gruppe => (
                                <GruppenTag key={gruppe.id} gruppe={gruppe} setAktivGruppe={this.setAktivGruppe}
                                            erledigt={true}
                                            checkHandler={this.artikelChecken}/>
                            ))}
                        </dl>
                    </section>
                </main>
                <hr/>

                <NaviTag gruppenDialogOpen={this.gruppenDialogOpen}/>

                <GruppenDialogTag visible={this.state.showGruppenDialog}
                                  gruppeHinzufuegen={App.gruppeHinzufuegen}
                                  onDialogClose={() => this.setState({showGruppenDialog: false})}/>


            </div>

        )
    }
}
