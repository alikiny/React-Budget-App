import React from 'react'
import { connect } from 'react-redux'
import { addIncomeAction, editIncomeAction, removeIncomeAction } from '../redux/income'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';

import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import WorkIcon from '@material-ui/icons/Work';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';

import moment from 'moment';


export const IncomeList = ({ incomes, editIncome, removeIncome }) => {

    const DynamicIcon = ({ source }) => {
        switch (source) {
            case "Job":
                return <WorkIcon style={{ color: 'red' }} />

            case "Business":
                return <BusinessCenterIcon style={{ color: 'blue' }} />

            case "Freelance":
                return <FolderIcon style={{ color: 'green' }} />

            case "Interest":
                return <AccountBalanceIcon style={{ color: 'purple' }} />

            case "Rent":
                return <EmojiTransportationIcon style={{ color: 'indigo' }}/>

            default:
                return <FolderIcon style={{ color: 'black' }} />
        }

    }

    return (
        <Grid item xs={12} className="bg-light">
            <h3 className="text-center bg-dark text-light p-2">Income List</h3>
            <div>
                <List>
                    {incomes.map((income, index) => {
                        const date = new Date(income.date)
                        const newdate = moment(date).format("Do MMMM, YYYY")
                        return (<div key={index}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <DynamicIcon source={income.source} />

                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={income.description}
                                    secondary={income.source}
                                />
                                <ListItemText primary={income.amount} />
                                <ListItemText primary={newdate} />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete" onClick={
                                        (e) => {
                                            e.preventDefault()
                                            removeIncome(income.id)
                                        }
                                    }>
                                        <DeleteIcon style={{ color: '#82120a' }}/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </div>)
                    }
                    )}
                </List>
            </div>
        </Grid>

    )
}

const mapDispatchToProps = dispatch => ({
    editIncome: (id, update) => dispatch(editIncomeAction(id, update)),
    removeIncome: (id) => dispatch(removeIncomeAction(id))
})

export default connect(undefined, mapDispatchToProps)(IncomeList)