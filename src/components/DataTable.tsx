import { Table } from 'antd';
import type { TableProps } from 'antd';

export type DataTableProps<T extends object> = TableProps<T> & {
  ariaLabel: string;
};

function DataTable<T extends object>({ ariaLabel, ...tableProps }: DataTableProps<T>) {
  return (
    <section aria-label={ariaLabel}>
      <Table<T> {...tableProps} />
    </section>
  );
}

export default DataTable;
