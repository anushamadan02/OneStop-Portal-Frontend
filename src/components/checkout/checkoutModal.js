import React from 'react';

import Modal from '@material-ui/core/Modal';
import Checkout from './Checkout'

export default function Checkoutmodal({open,setOpen,order,setProdtoRemove,isCart}) {
    return (
      <div>
        <Modal
          open={open}
          onClose={()=>setOpen(false)}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          style={{maxHeight:"100%",overflowY: "auto"}}
        >
          <Checkout open={open} setOpen={setOpen} order={order} isCart={isCart}  setProdtoRemove={setProdtoRemove}/>
        </Modal>
      </div>
    );
  }
  