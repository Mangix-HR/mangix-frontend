import Sidebar from "./components/sidebar.js";
import Table from "./utils/datatables.js";
import Events from "./utils/Events.js";

function init() {
  new Sidebar();
}

Events.$onPageLoad(async () => {
  init();

  // const myTable = new Table(".content-body");
  // console.log(await myTable.showData());
});
