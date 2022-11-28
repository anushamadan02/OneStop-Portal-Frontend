import React from 'react';
import MaterialTable from "material-table";
import {Paper} from '@material-ui/core'
import { Container } from '@material-ui/core/';
import {createTheme} from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core/styles";

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
  }
});

const Table=({data})=>{
 
    
 return(
  <div >
    <Container>
    <MuiThemeProvider theme={theme}>
    <MaterialTable 
    components={{
      Container: props => <Paper {...props} elevation={10}/>
    }}
    title="Plans"
    
    data={data}
    columns={[
      { title: "Plan (Rs)", field: "plan",  },
      { title: "Validity (days)", field: "validity", },
      { title: "Data (GB)", field: "data"},
      { title: "SMS (/Day)", field: "SMS", },
    ]}
    
    options={{
      search: true,
      actionsColumnIndex: -1,
      toolbarButtonAlignment:"right",
      toolbar: true,
      pageSizeOptions:[5,10],
      pageSize:5,
      headerStyle: {
        
        backgroundColor: '#3D59AB',
        color: '#FFF',
        paging:true,    // make initial page size
        emptyRowsWhenPaging: true,   //to make page size fix in case of less data rows
        pageSizeOptions:[10,20],
        fontSize:"13px",
        fontWeight:"600",
        padding:"10px",
        
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
export default Table