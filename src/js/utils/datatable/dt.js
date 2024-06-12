import DataTable from "datatables.net-dt";
import "datatables.net-buttons-bs5";
import "datatables.net-fixedcolumns-bs5";
import "jquery-datatables-checkboxes";
import "datatables.net-fixedheader-bs5";

import { dtConfig } from "./dt-config";
import { colsMap } from "../../components/dt-columns";

export class Dt {
  constructor(
    tableElement,
    {
      fetcher,
      columns = [],
      actions = [],
      config = {},
      refreshInterval = 60_000,
    }
  ) {
    this.tableElement = tableElement;
    this.dataFetcher = fetcher;
    this.columns = columns;
    this.actions = actions;
    this.refreshInterval = refreshInterval;
    this.dtConfig = { ...dtConfig, ...config };

    this.dataTableInstance = undefined;
  }

  async initializeTable() {
    const { data } = await this.dataFetcher();
    const { dataset, defs } = this.buildColumns();

    if (data) {
      this.dataTableInstance = new DataTable(this.tableElement, {
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

      this.handleEventCallbacks();

      setInterval(async () => {
        await this.refresh();
      }, this.refreshInterval);
    }

    return this;
  }

  handleEventCallbacks() {
    this.actions.forEach((cb) => {
      cb();
    });
  }

  buildColumns() {
    if (!this.columns) return;

    return colsMap.reduce((acc, map) => {
      if (!acc.dataset) {
        acc.dataset = [];
      }

      if (!acc.defs) {
        acc.defs = [];
      }

      this.columns.forEach((c, index) => {
        if (c === map.column) {
          acc.dataset.push({
            data: map.column,
          });

          acc.defs.push(map.def(index + 1));
        }
      });

      return acc;
    }, {});
  }

  async refresh() {
    if (!this.dataTableInstance) {
      console.error("datatable  not found");
      return;
    }

    const { data } = await this.dataFetcher();

    this.dataTableInstance.clear();
    this.dataTableInstance.rows.add(data);
    this.dataTableInstance.draw();

    this.handleEventCallbacks();
  }
}
