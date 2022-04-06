/**
 * mit NaviTag wird der Footer separiert dargestellt (Besonderheit bei "Mir")
 */


class NaviTag extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <nav className="navi">
                <button onClick={this.props.gruppenDialogOpen}>
                    <span className="material-icons">bookmark_add</span>
                    <span className="mdc-button__ripple"></span>
                    Gruppen
                </button>

            </nav>)
    }
}


