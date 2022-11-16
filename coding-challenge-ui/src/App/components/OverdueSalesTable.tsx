import { Table } from "antd";
import { memo, useState, useMemo, useCallback } from "react";

import { getFlagEmoji } from "../utils";

const OverdueSalesTable = ({ orders = [], isLoading = false }: any) => {
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  const columns = useMemo(
    () => [
      {
        title: "MARKETPLACE",
        render: (record: any) => {
          const flag = getFlagEmoji(record.store.country.slice(0, 2));
          return (
            <div
              style={{
                fontWeight: "normal",
                display: "flex",
                flexDirection: "row",
              }}
            >
              {`${flag} ${record.store.marketplace}`}
            </div>
          );
        },
        sorter:(record1:any,record2:any)=>{
          return record1.store.marketplace>record2.store.marketplace;
        },
        responsive: ["md"],
      },
      {
        title: "STORE",
        render: (record: any) => record.store.shopName,
        responsive: ["md"],
        sorter:(record1:any,record2:any)=>{
          return record1.store.shopName>record2.store.shopName;
        },
      },
      {
        title: "ORDER ID",
        dataIndex: "orderId",
        sorter:(record1:any,record2:any)=>{
          return record1.orderId>record2.orderId;
        },
      },
      {
        title: "ITEMS",
        dataIndex: "items",
        align: "center",
        sorter:(record1:any,record2:any)=>{
          return record1.items>record2.items;
        },
      },
      {
        title: "DESTINATION",
        dataIndex: "destination",
        responsive: ["md"],
        sorter:(record1:any,record2:any)=>{
          return record1.destination>record2.destination;
        },
      },
      {
        title: "DAYS OVERDUE",
        render: (record:any)=>{ 
          const date2:any=new Date().getTime();
          const date1:any=new Date(record.latest_ship_date).getTime();
          return <p style={{color:"red"}}>{Math.floor((date1-date2)/(24*3600*1000))}</p>;
        },
        sorter:(record1:any,record2:any)=>{
          return record1>record2;
        },
        responsive: ["md"],
      },
      {
        title: "ORDER VALUE",
        // dataIndex: "orderValue",
        render: (record:any)=> {return <p>{"$"+ record.orderValue}</p>},
        responsive: ["md"],
        sorter:(record1:any,record2:any)=>{
          return record1.orderValue>record2.orderValue;
        },
      },
      {
        title: "ORDER TAXES",
        // dataIndex: "taxes",
        render: (record:any)=> {return <p>{Math.round(record.taxes)+"%"}</p>},
        sorter:(record1:any,record2:any)=>{
          return record1.taxes>record2.taxes;
        },
        responsive: ["md"],
      },
      {
        title: "ORDER TOTAL",
        render: (record:any)=>{return <p>{"$"+(record.items*record.orderValue).toFixed(2)}</p>},
        sorter:(record1:any,record2:any)=>{
          return record1>record2;
        },
        responsive: ["md"],
      },
    ],
    []
  );

  const onChange = useCallback((current: number, pageSize: number) => {
    setPagination({ current, pageSize });
  }, []);

  const showTotal = useCallback((total: any, range: any) => {
    return `${range[0]} - ${range[1]} of ${total}`;
  }, []);

  const paginationObj = useMemo(
    () => ({
      onChange,
      showTotal,
      pageSizeOptions: [5, 10],
      ...pagination,
    }),
    [onChange, pagination, showTotal]
  );

  return (
    <Table
      size="small"
      // @ts-ignore
      columns={columns}
      loading={isLoading}
      dataSource={orders}
      pagination={paginationObj}
    />
  );
};

export default memo(OverdueSalesTable);
