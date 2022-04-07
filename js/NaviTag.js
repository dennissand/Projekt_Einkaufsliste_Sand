/**
 * mit NaviTag wird der Footer separiert dargestellt (Besonderheit bei "Mir")
 */


class NaviTag extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <nav className="navibutton">
                <button className="navi"
                        onClick={this.props.gruppenDialogOpen}
                >Gruppen bearbeiten</button>
            </nav>)
    }
}


