import { EventEmitter } from "fbemitter";
const SERVER = "http://localhost:8000/api";

class Aliments {
  constructor() {
    this.data = [];
    this.emitter = new EventEmitter();
  }

  async getAlimenteByUsers(id) {
    try {
      const response = await fetch(`${SERVER}/alimente`);
      const data = await response.json();
      let alimente = [];
      for (let x of data) {
        if (x.idUtilizator === id) {
          alimente.push(x);
        }
      }
      this.data = alimente;
      return this.data;
    } catch (err) {
      console.warn(err);
      this.emitter.emit("GET_ALIMENTS_ERROR");
    }
  }

  async addAliment(al) {
    try {
      await fetch(`${SERVER}/alimente`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(al),
      });
    } catch (err) {
      console.warn(err);
      this.emitter.emit("ADD_ALIMENT_ERROR");
    }
  }

  async deleteAliment(id) {
    try {
      await fetch(`${SERVER}/alimente/${id}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.warn(err);
      this.emitter.emit("Delete_Aliment_Error");
    }
  }

  async changeDisp(id) {
    try {
      const response = await fetch(`${SERVER}/alimente`);
      const alimente = await response.json();
      for (let aliment of alimente) {
        if (aliment.idAliment === id) {
          aliment.disponibilitate = !aliment.disponibilitate;
          await fetch(`${SERVER}/alimente/${id}`, {
            method: "put",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(aliment),
          });
        }
      }
    } catch (err) {
      console.warn(err);
      this.emitter.emit("UPDATE_ALIMENT_ERROR");
    }
  }
}

const aliments = new Aliments();
export default aliments;
