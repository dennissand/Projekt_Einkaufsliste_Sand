/**
 * Es werden die Funktionen aufgezeigt, die man benutzten kann wenn die Gruppen bearbeitet werden, genutzt wird.
  */


class GruppenDialogTag extends React.Component {

    constructor(props) {
        super(props);
        /**
         *
         * @type 
         * {showDialog}: *,
         * {gruppenListe}: ([]|*),
         * {editID}: null,
         * {editName}: string
         */
        this.state = {
            showDialog: this.props.visible, gruppenListe: this.props.gruppenListe,
            editID: null, editName: ""
        }
    }

    
    /**
     * Das hinzufügen der Gruppe als Funktion
     */
    gruppeHinzufuegen = () => {
        let eingabe = document.getElementById("Gruppeneingabe")
        let neueGruppe = eingabe.value.trim()
        console.log(neueGruppe)
        if (neueGruppe.length > 0) {
            App.gruppeHinzufuegen(neueGruppe)
        }
        eingabe.value = ""
        eingabe.focus()
    }
    
    /**
     *Das löschen wird über den vergleich der GruppenListen und id ausgeführt
     * @param id
     */
    gruppeEntfernen = (id) => {
        App.gruppeEntfernen(id)
        this.setState({gruppenListe: App.gruppenListe})
    }
    
    /**
     *hier wird id und name gesetztin der Gruppe
     * @param id
     * @param name
     */
    gruppeBearbeiten = (id, name) => {
        this.setState({editID: id})
        this.setState({editName: name})
    }
    
    /**
     * Gruppe wird dort über id und name umbenannt
     */
    gruppeUmbenennen = () => {
        App.gruppeUmbenennen(this.state.editID, this.state.editName)
        this.setState({editID: null})
    }
    
    /**
     * hier wird der neue Name der Gruppe aus dem Textfeld direkt ausgelesen
     * @param e
     */
    handelEditChange = (e) => {
        this.setState({editName: e.target.value})
    }


    render = () => {

        /**
         * die erste Konstruktion erstellt das Meldefenster um dort die Gruppen zu bearbeiten
         */
        return (<div className={this.props.visible ? "mdc-dialog mdc-dialog--open" : "mdc-dialog"}>
            <div className="mdc-dialog__container">
                <div className="mdc-dialog__surface">
                    <h2 className="mdc-dialog__title">Gruppen bearbeiten</h2>
                    <div className="mcd-dialog__content">
                        <label htmlFor="Gruppe"><input type="text" id="Gruppeneingabe" placeholder="Gruppe hinzufügen"
                                                       autoComplete="on"/></label>
                        <button onClick={this.gruppeHinzufuegen}> +</button>
                        <hr/>
                        <dl className="mdc-deprecated-list">
                            {App.gruppenListe.map(gruppe => {

                                return (
                                    <dt key={gruppe.id} className="popup">
                                        {this.state.editID === gruppe.id ? <input type="text" id="Eingabefeld"
                                                                                 value={this.state.editName}
                                                                                 onChange={this.handelEditChange}/> :
                                            <span>{gruppe.name}</span>}
                                        {this.state.editID === gruppe.id ?
                                            /**
                                             * an dieser Stelle werden die Buttons mit den Funktionen verbunden.
                                             */
                                            <i onClick={() => this.gruppeUmbenennen()}
                                               className="material-icons">check_circle</i> :
                                            <i onClick={() => this.gruppeBearbeiten(gruppe.id, gruppe.name)}
                                               className="material-icons">edit</i>}
                                        <i onClick={() => this.gruppeEntfernen(gruppe.id)}
                                           className="material-icons">delete</i>

                                    </dt>

                                )
                            })
                            }
                        </dl>

                    </div>
                    <div className="mdc-dialog__actions">
                        <button onClick={this.props.onDialogClose}><span className="mdc-button__label"></span>Schliessen
                        </button>
                    </div>


                </div>
            </div>
        </div>)


    }


}