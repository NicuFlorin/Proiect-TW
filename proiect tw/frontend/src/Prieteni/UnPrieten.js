import React, { Component } from "react";
import AlimentePrieteni from "./AlimentePrieteni";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Link,
  Route,
} from "react-router-dom";

class UnPrieten extends Component {
  veziAlimente = () => {
    return ReactDOM.render(
      <BrowserRouter>
        <AlimentePrieteni
          id={this.props.idP}
          idPrimitor={this.props.idUtilizator}
        ></AlimentePrieteni>
      </BrowserRouter>,
      document.getElementById("root")
    );
  };

  render(props) {
    return (
      <div className="content">
        {/* <input
          type="image"
          src="Media/prieten_icon.png"
          width="100"
          height="100"
        ></input> */}
        <div className="divtext">{this.props.nume}</div>
        <div className="divCaracteristica">#{this.props.detalii}</div>
        <button
          type="button"
          className="btnAlimentPrieten"
          onClick={this.veziAlimente}
        >
          vezi alimente
        </button>
      </div>
    );
  }
}

export default UnPrieten;
