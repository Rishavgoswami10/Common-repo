import React, { useState } from "react";
import { Grid, Divider, Pagination } from "@mui/material";

const CustomTable = ({ data }) => {
  // console.log("data", data);
  const pageSize = 10;
  const [page, setPage] = useState(1); // Pagination component is 1-based

  const columns = [
    { id: "period", label: "Period" },
    { id: "trxBlockAddress", label: "Block" },
    { id: "blockTime", label: "Block time" },
    { id: "hash", label: "Hash" },
    { id: "big_small", label: "Result" },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const paginatedData = data.slice((page - 1) * pageSize, page * pageSize);

  return (
    <Grid container>
      {columns.map((column) => (
        <Grid
          item
          xs={2.4}
          key={column.id}
          sx={{
            backgroundColor: '#3A3947',
            color: 'white', 
            padding: '8px ', 
            fontWeight: 'bold', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            fontSize: '0.8rem'           }}
        >
          {column.label}
        </Grid>
      ))}
      <Divider />
      <Grid container direction="row"  justifyContent="space-evenly" backgroundColor="#333332">
      {paginatedData.map((row) => (
        <React.Fragment key={row._id} marginBlock={2}>
          <Grid
            item
            xs={2.4}
            sx={{
              padding: "8px",
              borderBottom: "1px solid #ccc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
              fontWeight: "bold",
              color: "white",
              
            }}
          >
            {row.periodId.slice(0, 3) + "**" + row.periodId.slice(-4)}
          </Grid>
          <Grid
            item
            xs={2.4}
            sx={{
              padding: "8px",
              borderBottom: "1px solid #ccc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
              fontWeight: "bold",
              color: "white",
             
            }}
          >
            {row.trxBlockAddress}
          </Grid>
          <Grid
            item
            xs={2.4}
            sx={{
              padding: "8px",
              borderBottom: "1px solid #ccc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
              fontWeight: "bold",
              color: "white",
             
            }}
          >
            {row.blockTime}
          </Grid>
          <Grid
            item
            xs={2.4}
            sx={{
              padding: "8px",
              borderBottom: "1px solid #ccc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
              fontWeight: "bold",
              color: "white",
             
            }}
          >
            {"** " + row.hash.slice(-4)}{" "}
          </Grid>
          <Grid
            item
            xs={1.2}
            sx={{
              padding: "8px",
              borderBottom: "1px solid #ccc",
              display: "flex",
              alignItems: "center",
             
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "15px",
                height: "15px",
                borderRadius: "50%",
                background:
                  Array.isArray(row.colorOutcome) &&
                  row.colorOutcome.length === 2
                    ? `linear-gradient(to bottom, ${
                        row.colorOutcome[0] === "red"
                          ? "rgb(253,86,92)"
                          : row.colorOutcome[0] === "green"
                          ? "rgb(64,173,114)"
                          : row.colorOutcome[0]
                      } 50%, ${
                        row.colorOutcome[1] === "red"
                          ? "rgb(253,86,92)"
                          : row.colorOutcome[1] === "green"
                          ? "rgb(64,173,114)"
                          : row.colorOutcome[1]
                      } 50%)`
                    : row.colorOutcome[0] === "red"
                    ? "rgb(253,86,92)"
                    : row.colorOutcome[0] === "green"
                    ? "rgb(64,173,114)"
                    : row.colorOutcome[0],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: "12px",
              }}
            >
              {row.numberOutcome}
            </div>
          </Grid>
          <Grid
            item
            xs={1.2}
            sx={{
              padding: "8px",
              borderBottom: "1px solid #ccc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textTransform: "capitalize",
              fontWeight: "bold",
              fontSize: "15px",
              color:
                row.sizeOutcome.charAt(0).toUpperCase() === "B"
                  ? "#dd9138"
                  : "#5088d3",
             
            }}
          >
            {row.sizeOutcome.charAt(0).toUpperCase()}
          </Grid>
        </React.Fragment>
      ))}
      </Grid>
      <Grid
        item
        xs={12}
        sx={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <Pagination
          count={Math.ceil(data.length / pageSize)}
          page={page}
          onChange={handleChangePage}
          sx={{
            '& .MuiPaginationItem-root': {
              color: '#A8A5A1',
            },
            '& .MuiPaginationItem-page.Mui-selected': {
            
              color: '#A8A5A1',
            },
            '& .MuiPaginationItem-ellipsis': {
              color: '#D9AC4F',
              backgroundColor: '##D9AC4F',
            },
            '& .MuiPaginationItem-previousNext': {
              backgroundColor: '#D9AC4F',
              color: '#8F5206',
              padding: '3px',
              width: 'auto',  // Ensure it doesn't stretch
              height: 'auto', // Ensure it doesn't stretch
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
            '& .MuiPaginationItem-icon': {
              width: '70px', // Adjust the size to make it square
              height: '40px', // Adjust the size to make it square
            },
          }}
        />
      </Grid>
    </Grid>
  );
};

export default CustomTable;