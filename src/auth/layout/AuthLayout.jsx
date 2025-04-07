import { Grid2, Typography } from "@mui/material";

export const AuthLayout = ({children, title = ''}) => {
  return (
    <>
        <Grid2 
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{minHeight: '100vh', backgroundColor: 'primary.main', padding:4 }}>
            {/* Start of Grid2 container */}

            <Grid2 
                className='box-shadow'
                size= {{xs:3}}
                sx={{ backgroundColor: 'white', padding: 3, borderRadius:2, width:{sm:450} }}>
                {/* Start of Grid2 item */}

                <Typography variant='h5'>{title}</Typography>

                        { children }

            </Grid2>

        </Grid2>
  </>
  )
}

