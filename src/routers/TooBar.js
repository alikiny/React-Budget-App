import React, { useState } from 'react'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import ExpenseModal from './ExpenseForm'


export const CustomToolbar = (props) => {
  const classes = props.classes
  const [openModal, setOpen] = useState(false)
  const closeModal = () => {
    setOpen(false)
  }
  return (
    <div>
      <Toolbar>
        {props.numSelected > 0 ? (
          <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            {props.numSelected} selected
          </Typography>
        ) : (
            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
              Expenses List
            </Typography>
          )}

        {props.numSelected > 0 ? (
          
          <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={props.onDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
            <Tooltip title="Add Expense">
              <IconButton aria-label="add new" onClick={() => setOpen(true)}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          )}

      </Toolbar>
      <ExpenseModal openModal={openModal} closeModal={closeModal} expense={undefined} edit={false}/>
    </div>
  );
}