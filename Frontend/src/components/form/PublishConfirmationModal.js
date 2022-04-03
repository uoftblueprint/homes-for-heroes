import { useState }from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PublishIcon from '@mui/icons-material/Publish';

export default function PublishFormConfirmation(props) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handlePublish = () => {
        props.publishFunc();
        setOpen(false);
    };

    return (
        <div>
            <Button onClick={handleClickOpen} variant="outlined" size="small" startIcon={<PublishIcon />}>
                PUBLISH
            </Button>
            <Dialog
                open={open}
                keepMounted
                onClose={handleCancel}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{`Publish '${props.form.title}'?`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Once you do this, you will be unable to edit the form.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel}>CANCEL</Button>
                    <Button onClick={handlePublish}>PUBLISH</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}