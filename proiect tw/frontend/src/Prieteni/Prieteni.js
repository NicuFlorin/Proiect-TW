import React from "react";
import users from "../components/login/Users";
import UnPrieten from "./UnPrieten";
import AdaugaPrieten from "./AdaugaPrieten";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdaugaAliment from "../Alimente/AdaugaAliment";

class Prieteni extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listaPrieteni: [],
      idPrieten: props.idPrieten,
      listaDetalii: [],
    };
  }
  getPrieteni = async () => {
    let x = await users.getPrieteni(this.state.idPrieten);
    this.setState({ listaPrieteni: x });
    await this.getDetalii();
  };

  addPrieten = () => {
    return ReactDOM.render(
      <React.StrictMode>
        <Router exact path="/prieteni">
          <AdaugaPrieten idPrieten1={this.state.idPrieten} />
        </Router>
      </React.StrictMode>,
      document.getElementById("root")
    );
  };

  getDetalii = async () => {
    let detalii = [];
    for (let i = 0; i < this.state.listaPrieteni.length; i++) {
      detalii.push(
        await users.getDetalii(this.state.listaPrieteni[i].idPrieten1)
      );
    }
    this.setState({
      listaDetalii: detalii,
    });
  };
  componentDidMount() {
    this.getPrieteni();
  }

  func = () => {
    console.log("harcea parcea");
  };

  render() {
    return (
      <div className="classPrieteni">
        <button type="button" onClick={this.getPrieteni}>
          Prieteni
        </button>

        <button className="prieteni" onClick={this.addPrieten}>
          Adauga prieten
        </button>
        <div className="mapare">
          {}
          {this.state.listaDetalii.map((detaliu, index) => {
            // console.log(prieten);
            // const idPrieten = prieten.idPrieten1;

            return (
              <div className="classViz">
                <UnPrieten
                  nume={detaliu[0]}
                  detalii={detaliu[1]}
                  idP={detaliu[2]}
                  idUtilizator={this.props.idPrieten}
                ></UnPrieten>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Prieteni;
