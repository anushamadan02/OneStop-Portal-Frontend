
import { Radio, Button, Select, InputAdornment, Typography, Paper, TextField, FormControl } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import { addProduct, updateProduct,bulkUpload } from '../../actions/products';
import CancelPresentationRoundedIcon from '@material-ui/icons/CancelPresentationRounded';

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Snackbar from '../notifications/snackbar'
import * as xlsx from "xlsx";
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));
function ProductForm({ selected, handleClose, setselected,setexcelsubmit }) {
    const defaultData = selected ? { ...selected } : { name: '', stock: 0, description: '',summary:"", price: 0, photo: '', category: "" };
    const [dataObj, setdataObj] = useState(defaultData)
    const [excelData, setExcelData] = useState(null)
    const [openNotification, setOpenNotification] =useState(false);
    const [inputMethod,setInput]= useState(0);
    if (selected)
        console.log(selected)
    var user = JSON.parse(localStorage.getItem("profile"))?.user;
    const dispatch = useDispatch();
    const [snackBarMsg, setSnackBarMsg] = useState(null)

    const classes = useStyles();
    const handleExcelSubmit=(event)=>{
        event.preventDefault();
        const promise = new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(excelData);
        fileReader.onload = (e) => {
          const bufferArray = e.target.result;
          const wb = xlsx.read(bufferArray, { type: "buffer" });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data = xlsx.utils.sheet_to_json(ws);
          resolve(data);
        };
        fileReader.onerror = (error) => {
          console.log(error)
          reject(error);
        };
      });
      promise.then(async (data) => {
        console.log("data: ",data)
        console.log("userid: ",user._id)
        await dispatch(bulkUpload(data,user._id))
        
        setSnackBarMsg({ message: "Product added Successfully..!", severity: "success" })
        setOpenNotification(true)
        setexcelsubmit(true)
      });
    }
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
      };
    var handleSubmit = async (e) => {
        if (dataObj.name != '' && dataObj.price != 0) {
            if (!selected) {
                try {
                    
                    const formData = new FormData();
                    
                    Object.keys(dataObj).forEach(key => formData.append(key, dataObj[key]));
                    console.log("formdata: ",formData)
                    var response = await dispatch(addProduct(formData, user._id))
                    
                } catch (error) {
                    console.log("From handleClICK", error)
                    setSnackBarMsg({ message: "error occured", severity: "error" })
                    setOpenNotification(true)
                }
                console.log("product added")
                setSnackBarMsg({ message: "Product added Successfully..!", severity: "success" })
                setOpenNotification(true)
                setdataObj(defaultData)
            } else {
                try {
                    const formData = new FormData();
                    var {name, category,summary,description,photo,price}=dataObj
                    console.log("selected",dataObj)
                    var objtemp={name:name,category:category,summary:summary,description:description,photo:photo,price:price}
                    Object.keys(objtemp).forEach(key => formData.append(key, dataObj[key]));
                    
                    var response = await dispatch(updateProduct(selected._id, formData))
                    console.log("response",response)
                } catch (error) {
                    console.log("From handleClICK", error)
                    setSnackBarMsg({ message: "error occured", severity: "error" })
                    setOpenNotification(true)
                }
                console.log("Product Updated")
                setSnackBarMsg({ message: "Product Updated Successfully..!", severity: "success" })
                setOpenNotification(true)
                //     handleClose()
                setselected(null)
            }
        }
    }
    return (
        <div style={{ height: "530px", width: "420px" }}>
            <CancelPresentationRoundedIcon onClick={() => handleClose()}
                style={{ marginTop: "-3px", marginRight: "1px", float: "right", color: "red", height: "25px", }} />
            <form style={{ width: "400px", height: "500px" }}>
               {!selected&&(
                   <div style={{marginBottom:"-14px"}}> 
               <Radio
                    checked={inputMethod==0} onChange={(e)=>setInput(e.target.value)} value={0}
                    name="radio-button-demo" inputProps={{ 'aria-label': 'A' }}
                />Manually
                <Radio
                    checked={inputMethod ==1} onChange={(e)=>setInput(e.target.value)} value={1}
                    name="radio-button-demo" inputProps={{ 'aria-label': 'B' }}
                />Using Excel
                </div>
                )}
               { inputMethod==0?(
                   <>
               <Typography style={{ marginBottom: "10px" }} color="primary" variant="h6" align="center">{!selected ? "Add a Product" : "Update a Product"}</Typography>
                <TextField id="outlined-full-width" label="Product Name" style={{ margin: 8 }} placeholder="Enter product name here"
                    fullWidth margin="normal" required size="small"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined" value={dataObj.name}
                    onChange={(e) => setdataObj({ ...dataObj, name: e.target.value })}
                />
                <TextField id="outlined-full-width" label="Quantity" style={{ margin: 8 }} placeholder="Enter units of product"
                    fullWidth margin="normal" type="Number" required size="small"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined" value={dataObj.stock}
                    onChange={(e) => setdataObj({ ...dataObj, stock: e.target.value })}
                />
                <TextField id="outlined-full-width" label="Summary" style={{ margin: 8 }} placeholder="0"
                    fullWidth margin="normal" type="text" size="small"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"  onChange={(e) => setdataObj({ ...dataObj, summary: e.target.value })}
                    value={dataObj.summary}
                />
                <FormControl variant="outlined" style={{ width: "400px" }} size="small" className={classes.formControl}>
                    <InputLabel htmlFor="outlined-age-native-simple">Category</InputLabel>
                    <Select
                        native
                        value={dataObj.category}
                        onChange={(e) => setdataObj({ ...dataObj, category: e.target.value })}
                        label="Category"
                        inputProps={{
                            name: 'age',
                            id: 'outlined-age-native-simple',
                        }}
                    >
                        <option aria-label="None" value="" />
                        <option value={"612bd8d4603f214c7d9fcbd8"}>Mobile</option>
                        <option value={"612bd908603f214c7d9fcbde"}>Routers</option>
                        <option value={"612bd8fe603f214c7d9fcbdb"}>Accessories</option>
                    </Select>
                </FormControl>
                <TextField
                    label="Price" id="outlined-start-adornment" style={{ margin: 8 }} fullWidth={true} size="small"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">Rs</InputAdornment>,
                    }}
                    variant="outlined" margin="normal" type="Number" required value={dataObj.price}
                    onChange={(e) => setdataObj({ ...dataObj, price: e.target.value })}
                />
                <TextField
                    id="outlined-multiline-static" label="Description" multiline fullWidth size="small"
                    rows={4} defaultValue="" variant="outlined" style={{ marginLeft: "7px" }}
                    onChange={(e) => setdataObj({ ...dataObj, description: e.target.value })}
                    value={dataObj.description}
                />
                <div style={{ marginLeft: "6px", marginTop: "10px", float: "left" }}><input type="file" onChange={(e) => {
                    console.log("inside: ", e.target)
                    setdataObj({ ...dataObj, photo: e.target.files[0] })
                }
                } /></div>
                <div style={{marginLeft:"4px"}}>
                <Button variant="contained" color="primary" disableElevation style={{ marginTop: "10px", width: "150px" }} onClick={handleSubmit}>
                    {!selected ? "Add" : "Update"}
                </Button>
                </div>
                </>):(
                   <div>
                       <div style={{ marginLeft: "6px", marginTop: "10px", float: "left" }}><input type="file" onChange={(e) => setExcelData(e.target.files[0])} /></div>
                        <Button variant="contained" color="primary" disableElevation style={{ marginTop: "10px", width: "150px" }} onClick={handleExcelSubmit}>
                          Add
                        </Button>
                   </div>
                )}
            </form>
            {snackBarMsg ? <Snackbar open={openNotification} setOpen={setOpenNotification} snackBarMsg={snackBarMsg} setSnackBarMsg={setSnackBarMsg} /> : null}
        </div>
    );
}

export default ProductForm;