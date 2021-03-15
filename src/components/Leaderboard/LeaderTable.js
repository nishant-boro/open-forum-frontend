import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  table: {
    marginLeft: "200px",
    marginRight: "200px",
  },
}));

export default function LeaderTable(props) {
  const classes = useStyles();

  const columns = [
    { field: "id", headerName: "ID", width: 70, hide: true },
    {
      field: "name",
      headerName: "Username",
      width: 400,
      sortable: false,
      renderCell: (params) => (
        <strong>
          <Link to={"/user/" + params.row.id}>{params.value}</Link>
        </strong>
      ),
    },
    {
      field: "dob",
      headerName: "DOB",
      sortable: false,
      width: 400,
    },
    {
      field: "score",
      headerName: "Score",
      width: 300,
      sortable: true,
    },
    {
      field: "badge",
      headerName: "Badge",
      width: 400,
      sortable: true,
    },
  ];

  const filterRows = () => {
    props.data.forEach((item) => {
      if (!item["id"]) {
        const res = Object.getOwnPropertyDescriptors(item)._id.value;
        Object.defineProperty(item, "id", {
          value: res,
          writable: false,
        });
        delete item["_id"];
      }
    });
  };

  filterRows();

  return (
    <DataGrid
      autoHeight
      autoPageSize
      className={classes.table}
      sortModel={[
        {
          field: "score",
          sort: "desc",
        },
      ]}
      rows={props.data}
      columns={columns}
      pageSize={5}
      checkboxSelection={false}
    ></DataGrid>
  );
}
