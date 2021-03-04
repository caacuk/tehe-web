import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, IconButton, Button, Box, Divider } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export const CustomModalEdit = ({
  handleEdit,
  handleInitialData,
  children,
}) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2>Edit</h2>
      <Divider />
      <br />
      {children}
      <Divider />
      <Box
        mt={4}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Button onClick={handleClose} variant="contained" color="default">
          Batal
        </Button>
        <Button
          onClick={() => {
            handleEdit();
            handleClose();
          }}
          variant="contained"
          color="secondary"
        >
          Edit
        </Button>
      </Box>
    </div>
  );

  return (
    <div>
      <IconButton
        color="primary"
        aria-label="upload picture"
        onClick={() => {
          handleInitialData();
          handleOpen();
        }}
        component="span"
        size="small"
      >
        <Edit />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default CustomModalEdit;
