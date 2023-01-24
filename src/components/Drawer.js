import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Newnft from './Newnft';
import { Grid } from '@mui/material';

export default function ImageDrawer({ collect, setCollect, flag, addFlag }) {
    const [state, setState] = React.useState(flag);

    return (
        <Grid container spacing={3}>
            <Grid xs={2}></Grid>
            <Grid>
                <React.Fragment>
                    <Button onClick={()=>(setState(true))}>Add a New Nft</Button>
                    <Drawer
                        anchor={"bottom"}
                        open={state}
                        onClose={()=>(setState(false))}
                    >
                        <Newnft collect={collect} setOpenModal={setState} setCollect={setCollect} flag={flag} setFlag={addFlag} />
                    </Drawer>
                </React.Fragment>
            </Grid>

        </Grid>
    );
}