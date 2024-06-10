import DataTable from "datatables.net-dt";
import "datatables.net-buttons-bs5";
import "datatables.net-fixedcolumns-bs5";
import "jquery-datatables-checkboxes";
import "datatables.net-fixedheader-bs5";

import { buildColumns } from "../dt-columns";
import { dtConfig } from "./dt-config";

export function initializeTable(tableElement, data, columns) {
  const { dataset, defs } = buildColumns(columns);

  return new DataTable(tableElement, {
    data,
    columns: [{ data: "" }, ...dataset],
    columnDefs: [
      {
        className: "control",
        searchable: false,
        orderable: false,
        responsivePriority: 2,
        targets: 0,
        render: function (data, type, row, meta) {
          return "";
        },
      },
      ...defs,
    ],
    ...dtConfig,
  });
}

export const tableEventsManager = (eventsCbs = []) => {
  eventsCbs.forEach((cb) => {
    cb();
  });
};

export async function refreshTable({
  dt = null,
  dataFetcher = null,
  events = [],
}) {
  if (!dataFetcher || !dt) {
    console.error("no datatable found");
    return;
  }

  const { data } = dataFetcher;

  dt.clear();
  dt.rows.add(data);
  dt.draw();

  tableEventsManager(events);
}
