import React from "react";
import { Card, Typography } from "@material-tailwind/react";
function InvoiceItemTable({ items }) {
  const TABLE_HEAD = ["Services", "Qty", "Price", "Total"];
  return (
    <Card className="h-full w-full overflow-auto shadow-none">
      <table className="w-full table-fixed text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => {
              const isServices = head === "Services";
              return (
                <th key={head} className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className={
                      isServices ? "font-bold text-sm text-sv-red" : ""
                    }
                  >
                    {head}
                  </Typography>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {items.map(({ item, qty, price, },index) => {
            return (
              <tr key={index}>
                <td className="p-4 break-words">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {qty}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {price}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {price * qty}
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}

export default InvoiceItemTable;
