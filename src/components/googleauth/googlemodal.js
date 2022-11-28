import React from 'react';

import Modal from '@material-ui/core/Modal';
import Googlesignin from './googlesignin'



export default function Googlemodal({open,setOpen}) {
  //console.log("modal: ",open);
  return (
    <div>
      <Modal
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Googlesignin open={open} setOpen={setOpen} />
      </Modal>
    </div>
  );
}
