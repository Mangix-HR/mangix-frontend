import DataTable from "datatables.net-dt";
import { getUsers } from "../services/users";
import Events from "./Events";
import { config } from "../config/theme-config";

let table = new DataTable("");

export default class Table {
  constructor(element, data) {
    this.table = new DataTable(element, {
      data,
    });
    this.theme = config.colors;
  }

  showData() {
    // console.log(this.table.);
  }
}
