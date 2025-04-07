import { useEffect, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { DeleteOutlined, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid2 as Grid, TextField, Typography, IconButton} from "@mui/material"
import Swal from "sweetalert2";
import {  } from "sweetalert2/dist/sweetalert2.css";

import { ImageGallery } from "../components"
import { useForm } from "../../hooks/useForm";
import { setActiveNote, startDeletingNote, startSavingNote, startUploadingFiles } from "../../store/journal/";

export const NoteView = () => {

    const dispatch = useDispatch();
    const {active:note, messageSaved, isSaving} = useSelector(state => state.journal);

    const {body, title, onInputChange, formState, date} = useForm(note);

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date]);

    const fileInputRef = useRef();

    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState]);

    useEffect(() => {
        if(messageSaved.length > 0){
            Swal.fire('Nota actualizada', messageSaved, 'success');
        }
    }, [messageSaved]);

    const onSaveNote = () =>{
        dispatch(startSavingNote());
    }

    const onFIleInputChange = ({target}) => {
        if(target.files === 0 ) return

        console.log('Subiendo archivos');
        
        dispatch(startUploadingFiles(target.files));
        
    }

    const onDelete = () => {
        dispatch(startDeletingNote());
    }
    
    
  return (
    <Grid className='animate__animated animate__fadeIn animate__faster' container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb:1}}>
        <Grid>
            <Typography fontSize={39} fontWeight='light'> {dateString}</Typography>
        </Grid>

        <Grid>
            <input type="file" multiple onChange={onFIleInputChange} ref={fileInputRef} style={{display:'none'}}/>
            <IconButton color="primary" disabled={isSaving} onClick={()=> fileInputRef.current.click()}>
                <UploadOutlined/>
            </IconButton>

            <Button color="primary" onClick={onSaveNote} disabled={isSaving}>
                <SaveOutlined sx={{fontSize:30, mr:1}}/>
                Guardar
            </Button>
        </Grid>

        <Grid container width='100%'>
            <TextField
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un titulo"
                label="titulo"
                name="title"
                value={title}
                onChange={onInputChange}
                sx={{border:'none', mb:1}}
            />

            <TextField
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="Que sucedió hoy?"
                minRows={5}
                name="body"
                onChange={onInputChange}
                value={body}
            />
            <Grid container justifyContent='end'>
                <Button onClick={onDelete} sx={{mt:2}} color='error'>
                    <DeleteOutlined/>
                    Borrar
                </Button>

            </Grid>
            <ImageGallery images = { note.imageUrls }></ImageGallery>

        </Grid>

    </Grid>
  )
}