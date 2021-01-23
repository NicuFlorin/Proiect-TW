import React from "react";
import aliments from "../Utils/AlimenteBack";
import Aliment from "./Aliment";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdaugaAliment from "./AdaugaAliment";
import { Notifications } from "react-push-notification";
import addNotification from "react-push-notification";

class Alimente extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lista: [],
      id: props.id,
    };
  }

  getAll = async () => {
    let x = await aliments.getAlimenteByUsers(this.state.id);
    this.setState({ lista: x });
    this.notificare();
  };
  changeDisponibil = async (id) => {
    await aliments.changeDisp(id);
  };

  adaugaAliment = () => {
    return ReactDOM.render(
      <React.StrictMode>
        <Router exact path="/alimente">
          <AdaugaAliment idUtilizator={this.state.id} />
        </Router>
      </React.StrictMode>,
      document.getElementById("root")
    );
  };

  notificare() {
    this.state.lista.map((aliment) => {
      const {
        idAliment,
        categorie,
        cantitate,
        numeAliment,
        dataExpirare,
        disponibilitate,
      } = aliment;

      let newDate = new Date(Date.now());
      let nrZileRamase =
        (new Date(aliment.dataExpirare).getTime() - newDate.getTime()) /
        (1000 * 3600 * 24);

      if (nrZileRamase <= 2 && nrZileRamase >= 0) {
        addNotification({
          title: "Atentionare",
          subtitle: "Data expirare",
          message: "Alimentul " + aliment.numeAliment + " va expira in curand!",
          theme: "darkblue",
          native: true,
        });
      } else if (nrZileRamase < 0) {
        addNotification({
          title: "Atentionare",
          subtitle: "Data expirare",
          message: "Alimentul " + aliment.denumire + " a expirat!",
          theme: "darkblue",
          native: true,
        });
      }
    });
  }

  sterge = async (id) => {
    await aliments.deleteAliment(id);
    alert("Alimentul a fost sters!");
  };

  render() {
    return (
      <div className="Content">
        <button type="button" onClick={this.getAll}>
          afiseaza
        </button>
        <button className="aliment" onClick={this.adaugaAliment}>
          Adauga aliment
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
                <input
                  type="button"
                  id={aliment.idAliment}
                  className="dispClass"
                  onClick={() => this.changeDisponibil(aliment.idAliment)}
                  value="Schimba disponibilitatea"
                />
                <input
                  type="button"
                  className="dispClass"
                  onClick={() => this.sterge(aliment.idAliment)}
                  value="Sterge"
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default Alimente;
