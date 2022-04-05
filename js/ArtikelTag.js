/**
 * Hier werden die Artikel abgeändert über den Button: Edit
  */


class ArtikelTag extends React.Component {
    constructor(props) {
        super(props)
        /**
         * 
         * @type {{newName, isEditing: boolean}}
         */
        this.state = {
            /**
             * schaltet den Edit Modus um für Artikel umbenennen
             */
            isEditing: false,
            /**
             * enthält den Namen des Artikels im Edit-Modus
             */
            newName: this.props.artikel.name
        }
    }

    /**
     * ändert den Modus 
     * @param event
     */
    handleChange(event) {
        this.setState({newName: event.target.value})
    }

    /**
     * übernimmt den neuen Namen
     * @param artikel
     * @param event
     */
    artikelUmbenennen(artikel, event) {
        if (event && event.key != "Enter") return
        artikel.name = this.state.newName
        this.setState({isEditing: false})
    }

    render = () => {
        const artikel = this.props.artikel

        const viewTemplate = (
            <dd>
                <label>
                    <input type="checkbox" checked={artikel.gekauft}
                           onChange={() => this.props.checkHandler(this.props.artikel)}/>
                    {artikel.gekauft ?
                        /**
                         * wird die Menge vor dem Namen angezeigt
                         */
                        <s>{artikel.name}</s> : artikel.menge + " x " + artikel.name}
                </label>
                <i className="material-icons"
                   onClick={() => this.setState({isEditing: true})}>edit </i>
                <i className="material-icons"
                   onClick={() => this.props.deleteHandler(artikel.name)}>delete </i>
            </dd>
        )

        const editTemplate = (
            <dd>
                <input type="search" value={this.state.newName} autoFocus={true}
                       onChange={event => this.handleChange(event)}
                       onKeyPress={event => this.artikelUmbenennen(artikel, event)}/>
                <i className="material-icons"
                   onClick={() => this.setState({isEditing: false})}>cancel </i>
                <i className="material-icons"
                   onClick={() => this.artikelUmbenennen(artikel)}>check_circle </i>
            </dd>
        )

        return (
            this.state.isEditing
                ? editTemplate
                : viewTemplate
        )


    }
}

