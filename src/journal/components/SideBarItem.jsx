import { useMemo } from "react"
import { useDispatch } from "react-redux";
import { Grid2 as Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { TurnedInNot } from "@mui/icons-material"
import { setActiveNote } from "../../store/journal/JournalSlice";

export const SideBarItem = ({id, title, body,date, imageUrls =[]}) => {

    const newTitle = useMemo( () => {
        return title.length > 17
            ? title.substring(0,17) + '...'
            : title;
    }, [title]);

    const dispatch = useDispatch();
    
    const onButtonClick = () => {
        dispatch(setActiveNote({id, title, body, date, imageUrls}));
    }

    return (
        <ListItem key={id} disablePadding> 
            <ListItemButton onClick={onButtonClick}>
                <ListItemIcon>
                    <TurnedInNot/>
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={newTitle}/>
                    <ListItemText secondary={ body }/>
                </Grid>
            </ListItemButton>
        </ListItem>
   )
  }