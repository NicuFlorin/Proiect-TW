import React, {Component} from 'react';

class Aliment extends Component{
    render(props){
        return (
            <div className="aliment">
                <div className="detalii">
                    <div>Denumire: <span>{this.props.numeAliment}</span></div>
                    <div>Cantitate: <span>{this.props.cantitate}</span></div>
                    <div>Data expiratre: <span>{this.props.dataExpirare}</span></div>
                    <div>Disponibilitate: <span>{this.props.disponibilitate}</span></div>
                    <div>Categorie: <span>{this.props.categorie}</span></div>
                </div>
            </div>
        )
    }
}

export default Aliment;