import React from 'react';
import MaterialTable from "material-table";
import {Paper} from '@material-ui/core'
import { Container } from '@material-ui/core/';
import {createTheme} from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PaymentModal from './pages/paymentmodal';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const theme = createTheme({
  overrides: {
    MuiTableCell: {
      root: {
        padding: 2,
        paddingLeft: 5
      },
      head: {
        lineHeight:"1rem",
        paddingLeft:10,
      }, 
    },
  },
  palette: {
    primary: {
      main: '#8cd2e8',
    },
    secondary: {
      main: '#203354',
    },
  },
})


const Table_broadband_Upgrade=({data, setRows})=>{
 return(
  <div >
    <Container>
    <MuiThemeProvider theme={theme}>
    <MaterialTable 
    components={{
      Container: props => <Paper {...props} elevation={10}/>,

      Action: props => (
          <>
        <Button
          onClick={(event, rowData) => {props.action.onClick(event, props.data)}}
          // onClick={(event, rowData)=>{
          //   setOpen_Pay(true);
          // }}
          color="primary"
          variant="contained"
          style={{textTransform: 'none'}}
          size="large"
          startIcon={<ShoppingCartIcon style={{justifyContent:"center"}} />}
        >
        </Button>
      </>
      ),
    }}
    
    data={data}
    columns={[
      { title: "Broadband Plan", field: "name",  },
      { title: "Monthly Price", field: "monthlyprice", },
      { title: "Plan Type", field: "plantype"},
      { title: "Validity (/Day)", field: "validity", },
      { title: "Data (/GB)", field: "data", },
      { title: "Upload Speed (Mbps)", field: "uploadspeed", },
      { title: "Speed", field: "speed", },
      { title: "Installation Charges", field: "installationcharges", },
    ]}
    actions={[
        {
          icon: 'save',
          tooltip: 'Save User',
          onClick: (event, rowData) => {setRows(rowData)
          alert("Plan added, move to payment page")}
        
        }
      ]}

    
    options={{
      search: true,
      actionsColumnIndex: -1,
      toolbarButtonAlignment:"right",
      toolbar: true,
      pageSizeOptions:[5,10],
      pageSize:5,
      detailPanelType: "single" ,
      headerStyle: {
        backgroundColor: '#3D59AB',
        color: '#FFF',
        paging:true,    // make initial page size
        emptyRowsWhenPaging: true,   //to make page size fix in case of less data rows
        pageSizeOptions:[5,10],
        fontSize:"13px",
        fontWeight:"600",    
},
    rowStyle: rowData => ({
      backgroundColor: (rowData.tableData.id %2 === 0) ? '#EEE' : '#FFF',
      fontWeight: "initial" ,
      fontSize:"13px",
      padding:"0px",
      textAlign:"center",
    
}), 

}}

   />
   </MuiThemeProvider>
   </Container>

   </div>)   
}
export default Table_broadband_Upgrade