import React from 'react'
import { useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import BorderedBottomBox from '../Wrapper/BorderedBottomBox'

const Header = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/webmap');
  }

  return (
    <BorderedBottomBox>
      <AppBar
        sx={{
          backgroundColor: 'transparent',
          padding: '10px 10px',
          position: 'absolute'
        }}
        elevation={0}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs>
              <img
                src="/__images/logo.png"
                height="100"
                width="200"
                alt="Traffic logo"
                style={{ objectFit: 'contain' }}
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          position: 'relative',
          height: '745px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&::after': {
            position: 'absolute',
            content: '""',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            background: 'rgba(0, 0, 0, 0.4)',
            backgroundImage: `linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0.6) 0,
              rgba(0, 0, 0, 0) 60%,
              rgba(0, 0, 0, 0.8) 100%
            )`,
            zIndex: 1
          }
        }}
      >
        <img
          src="/__images/backdrop.png"
          alt="Backdrop"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0
          }}
        />

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography
            variant="h2"
            component="h1"
            color="common.white"
            fontWeight="600"
            textAlign="center"
          >
            Traffic Monitoring System Setia Budi Junction Semarang City
          </Typography>
          <Typography
            variant="h5"
            component="p"
            color="common.white"
            textAlign="center"
            gutterBottom
          >
            Consistently free-flowing with no disruptions
          </Typography>
          <Typography
            variant="h6"
            component="p"
            color="common.white"
            textAlign="center"
            sx={{ my: 3 }}
          >
            Click for start!
          </Typography>
          <Grid container justifyContent="center">
            <Grid item xs={12} sm="auto">
              <Button
                variant="contained"
                size="large"
                color="primary"
                sx={{ height: '100%', borderRadius: '2px' }}
                onClick={handleStart}
              >
                Get started
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </BorderedBottomBox>
  )
}

export default Header
