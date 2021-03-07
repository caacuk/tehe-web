import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, IconButton, Button, Box, Divider } from "@material-ui/core";
import { Edit, Visibility } from "@material-ui/icons";

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
    width: 800,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #c2c2a3",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export const CustomModalDetail = ({ handleInitialData, children }) => {
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
      <h2>Detil</h2>
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
        <Button
          onClick={() => {
            handleClose();
          }}
          variant="contained"
          color="secondary"
          style={{ backgroundColor: "#e63900" }}
        >
          Keluar
        </Button>
      </Box>
    </div>
  );

  return (
    <div>
      <IconButton
        onClick={() => {
          handleInitialData();
          handleOpen();
        }}
        size="small"
      >
        <Visibility style={{ color: "#206040" }} />
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

export default CustomModalDetail;
