import React from "react";
import aliments from "../Utils/AlimenteBack";
import Aliment from "../Alimente/Aliment";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import AdaugaAliment from "./AdaugaAliment";

class Alimente extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lista: [],
      id: props.id,
      //cantitate:''
    };
    this.handleBack = this.handleBack.bind(this);
  }
  handleBack() {
    this.props.history.push("/");
  }
  getAll = async () => {
    let x = await aliments.getAlimenteByUsers(this.state.id);
    x = x.filter((aliment) => aliment.disponibilitate === true);
    this.setState({ lista: x });
  };

  //   handleChange =(evt)=>{
  //       this.setState({
  //           [evt.target.name]: evt.target.value
  //       })
  //   }

  verificare = (id) => {
    let ok = false;
    let aliment;
    for (let i = 0; i < this.state.lista.length; i++) {
      if (this.state.lista[i].idAliment === id) {
        ok = true;
        aliment = this.state.lista[i];
      }
    }
    if (ok) {
      try {
        console.log(this.props.idPrimitor);
        aliments.addAliment({
          numeAliment: aliment.numeAliment,
          cantitate: aliment.cantitate,
          dataExpirare: aliment.dataExpirare,
          idUtilizator: this.props.idPrimitor,
          categorie: aliment.categorie,
          disponibilitate: aliment.disponibilitate,
        });

        aliments.deleteAliment(aliment.idAliment);
      } catch (err) {}
    }
  };

  render() {
    return (
      <div className="Content">
        <button type="button" onClick={this.getAll}>
          afiseaza
        </button>

        <div className="mapare">
          {this.state.lista.map((aliment) => {
            const {
              idAliment,
              denumire,
              cantitate,
              dataExpirare,
              disponibilitate,
              categorie,
            } = aliment;
            return (
              <div className="aliment">
                <Aliment
                  numeAliment={aliment.numeAliment}
                  cantitate={aliment.cantitate}
                  dataExpirare={aliment.dataExpirare}
                  disponibilitate={aliment.disponibilitate.toString()}
                  categorie={aliment.categorie}
                />
                <button
                  type="button"
                  className="claim"
                  onClick={() => this.verificare(aliment.idAliment)}
                >
                  claim
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Alimente;
