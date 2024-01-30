import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const MuiDialog = ({ isOpen, onClose, contentComponent, }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="700" fullWidth>
      <DialogContent className="p-6 relative">
        <div className="absolute top-2 right-2">
          <IconButton color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </div>
        {contentComponent}
      </DialogContent>
    </Dialog>
  );
};

export default MuiDialog;
