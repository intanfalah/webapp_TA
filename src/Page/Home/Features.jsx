import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import BorderedBottomBox from '../Wrapper/BorderedBottomBox'

const Title = ({ text }) => (
  <Typography
    variant="h3"
    component="h2"
    gutterBottom
    sx={{ textAlign: { xs: 'center', md: 'left' } }}
  >
    {text}
  </Typography>
)

const Description = ({ text }) => (
  <Typography
    variant="h5"
    component="h3"
    sx={{ textAlign: { xs: 'center', md: 'left' } }}
  >
    {text}
  </Typography>
)

const Features = () => {
  return (
    <Box sx={{ bgcolor: 'common.black', color: 'common.white' }}>

      <BorderedBottomBox>
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Grid container alignItems="center" justifyContent="center" spacing={4}>
            <Grid item xs={12} md={6}>
                <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                    <Title text="Monitor the traffic." />
                    <Description
                    text="This system is based on the calculation of the degree of saturation."
                    />
                </Box>
            </Grid>
          </Grid>
        </Container>
      </BorderedBottomBox>

      <BorderedBottomBox>
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Grid container alignItems="center" justifyContent="center" columnSpacing={12}>
            <Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 1 } }}>
              <Box sx={{ position: 'relative' }}>
                <Box>
                  <img
                    src="/__images/SB Junction.png"
                    width="640px"
                    height="480px"
                    layout="responsive"
                    alt="SB"
                  />
                </Box>
              </Box>

            </Grid>
            <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: 2 } }}>
              <Title text="Setiabudi Junction." />
              <Description
                text="Monitor the traffic conditions at the Setiabudi intersection to see if it's congested or flowing smoothly."
              />
            </Grid>
          </Grid>
        </Container>
      </BorderedBottomBox>

      <BorderedBottomBox>
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Grid container alignItems="center" justifyContent="center" columnSpacing={12}>
            <Grid item xs={12} md={6}>
              <Title text="Level of Service Analysis." />
              <Description
                text="LOS (Level of Service) is a measure that indicates the quality of service provided by a roadway under certain conditions."
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ position: 'relative' }}>
                <Box sx={{ position: 'relative', zIndex: 2 }}>
                  <img
                    src="/__images/Los.png"
                    width="640px"
                    height="480px"
                    layout="responsive"
                    alt="LOS"
                  />
                </Box>
                <Box
                  sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    maxWidth: '65%',
                    maxHeight: '49%',
                    top: '33%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </BorderedBottomBox>

      <BorderedBottomBox>
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Grid container alignItems="center" justifyContent="center" columnSpacing={12}>
            <Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 1 } }}>
              <Box>
                <img
                  src="/__images/ultralytics.png"
                  width="640px"
                  height="480px"
                  layout="responsive"
                  alt="ult"
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: 2 } }}>
              <Title text="Computer Vision For Object Detection" />
              <Description
                text="Computer vision is applied here using the YOLO algorithm to count incoming and outgoing vehicles, and the data is used as a variable in the calculation of LOS (Level of Service)."
              />
            </Grid>
          </Grid>
        </Container>
      </BorderedBottomBox>

    </Box>
  )
}

export default Features
