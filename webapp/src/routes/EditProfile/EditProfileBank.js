import React, { useState, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import Slider from '@material-ui/core/Slider'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import CarouselComponent from '../../components/Carousel'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import AddIcon from '@material-ui/icons/Add'

import Schedule from '../../components/Schedule'
import MapEditLocation from '../../components/MapEditLocation'
import { constants } from '../../config'

const {
  LOCATION_TYPES: { LIFE_BANK }
} = constants

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    padding: theme.spacing(0, 2)
  },
  textFieldWrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    '& .MuiTextField-root': {
      marginBottom: theme.spacing(2)
    }
  },
  btnWrapper: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(2, 0)
  },
  boxBtn: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
    '& a': {
      textDecoration: 'none'
    }
  },
  labelBtn: {
    color: theme.palette.white
  },
  bloodDemand: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  levelReward: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
    '& .MuiTextField-root': {
      width: 65,
      margin: '0px !important',
      '& input': {
        textAlign: 'center'
      }
    },
    '& h4': {
      letterSpacing: '0.25px',
      width: '65%'
    }
  },
  text: {
    color: theme.palette.secondary.onSecondaryMediumEmphasizedText,
    margin: theme.spacing(2, 0)
  },
  markLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    '& h4': {
      fontSize: 18
    }
  },
  carouselComponent: {
    justifyContent: 'center',
    justifySelf: 'center'
  },
  slider: {
    padding: theme.spacing(0, 2)
  },
  midLabel: {
    marginLeft: theme.spacing(3)
  },
  addButtonContainer: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'space-between'
  },
  marginTitule:
  {
    marginTop: '3%'
  },
  carouselDiv: {
    width: '100%',
    objectFit: 'cover'
  },
  img: {
    maxWidth: '100%',
    objectFit: 'cover',
    marginBottom: '6%',
  }
}))

const EditProfileBank = ({ profile, onSubmit, setField, loading }) => {
  const classes = useStyles()
  const [disableUrlInput, setDisableUrlInput] = useState(true)
  const imgUrlValueRef = useRef(undefined)
  const [disableUrlLogoInput, setDisableUrlLogoInput] = useState(true)
  const imgUrlLogoValueRef = useRef(undefined)
  let logo = "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
  const arrayImage = ["https://www.fodors.com/wp-content/uploads/2019/03/UltimateCostaRica__HERO_shutterstock_1245999643.jpg", "https://www.guanacastealaaltura.com/media/k2/items/cache/0a7d97071828da65151775fc572477c0_XL.jpg?t=20200524_175218"]
  const [user, setUser] = useState({
    description: profile.description,
    address: profile.address,
    phone_number: profile.phone_number,
    email: profile.email,
    geolocation: JSON.parse(profile.location),
    name: profile.name,
    schedule: profile.schedule,
    blood_urgency_level: profile.blood_urgency_level,
    has_immunity_test: Boolean(profile.has_immunity_test)
  })

  const handleOnGeolocationChange = useCallback(
    (geolocation) => handleSetField('geolocation', geolocation),
    [setField]
  )
  const marks = [
    {
      value: 1
    },
    {
      value: 2
    },
    {
      value: 3
    }
  ]
  const valueLabelFormat = (value) => {
    switch (value) {
      case 1:
        return 'Low'
      case 2:
        return 'Medium'
      case 3:
        return 'High'
      default:
        return 'N/A'
    }
  }

  const handleOnAddSchedule = useCallback(
    (data) => handleSetField('schedule', JSON.stringify(data)),
    [setField]
  )

  const handleSetField = (field, value) => {
    setUser({ ...user, [field]: value })
  }

  return (
    <form autoComplete="off" className={classes.form}>
      <Box className={classes.textFieldWrapper}>
        <Box className={classes.marginTitule}>
          <Typography variant="h4">Logo</Typography>
          <Typography variant="body1" />
        </Box>
        <div className={classes.carouselDiv}>
          {arrayImage.length > 0 && (
            <>{arrayImage && <Grid container justify="center">{console.log("logo:", logo)}
              <img className={classes.img} src={logo} alt={'logo image'} />
            </Grid>} </>
          )}
        </div>
        <TextField
          id="image-url"
          label="Logo url"
          variant="outlined"
          placeholder="logo url here"
          fullWidth
          inputRef={imgUrlLogoValueRef}
          InputLabelProps={{
            shrink: true
          }}
          onChange={(e) => setDisableUrlLogoInput(e.target.value.length < 1)}
          className={classes.textField}
        />
        <Box className={classes.addButtonContainer}>
          <Button
            onClick={() => {
              logo = imgUrlLogoValueRef.current.value
              imgUrlLogoValueRef.current.value = ''
              console.log("logo:", logo.length)
            }}
            disabled={disableUrlLogoInput}
            size="small"
            color="secondary"
            startIcon={<AddIcon />}
          >
            Add url
          </Button>
        </Box>
        <TextField
          id="fullname"
          label="Organization"
          fullWidth
          variant="outlined"
          placeholder="Your Organization Name"
          defaultValue={user.name}
          InputLabelProps={{
            shrink: true
          }}
          onChange={(event) => handleSetField('name', event.target.value)}
        />
        <TextField
          id="phone-number"
          label="Phone number"
          fullWidth
          variant="outlined"
          placeholder="Add Phone Number LifeBank"
          defaultValue={user.phone_number}
          InputLabelProps={{
            shrink: true
          }}
          onChange={(event) =>
            handleSetField('phone_number', event.target.value)
          }
        />
        <TextField
          id="address"
          label="Address"
          fullWidth
          variant="outlined"
          placeholder="Add Address Your LifeBank"
          defaultValue={user.address}
          InputLabelProps={{
            shrink: true
          }}
          onChange={(event) => handleSetField('address', event.target.value)}
        />
        <TextField
          id="description"
          label="About"
          fullWidth
          variant="outlined"
          placeholder="About Your LifeBank"
          defaultValue={user.description}
          InputLabelProps={{
            shrink: true
          }}
          onChange={(event) =>
            handleSetField('description', event.target.value)
          }
        />

        <Box width="100%" className={classes.textField}>
          <Schedule
            buttonText="Edit Schedule"
            scheduleLoad={user.schedule}
            loading
            handleOnAddSchedule={handleOnAddSchedule}
          />
        </Box>

        <Box className={classes.marginTitule}>
          <Typography variant="h4">Images</Typography>
          <Typography variant="body1" />
        </Box>
        <TextField
          id="image-url"
          label="Image url"
          variant="outlined"
          placeholder="Image url here"
          fullWidth
          inputRef={imgUrlValueRef}
          InputLabelProps={{
            shrink: true
          }}
          onChange={(e) => setDisableUrlInput(e.target.value.length < 1)}
          className={classes.textField}
        />
        <Box className={classes.addButtonContainer}>
          <div>
            {arrayImage.length < 1 ? (
              <Typography variant="caption">
                You need to add least one image url
              </Typography>
            ) : null}
          </div>
          <Button
            onClick={() => {
              arrayImage.push(imgUrlValueRef.current.value)
              imgUrlValueRef.current.value = ''
              console.log("arrayImage:", arrayImage)
            }}
            disabled={disableUrlInput}
            size="small"
            color="secondary"
            startIcon={<AddIcon />}
          >
            Add url
          </Button>
        </Box>
        <div className={classes.carouselDiv}>
          {arrayImage.length > 0 && (
            <>{arrayImage && <Grid container justify="center">
              <Grid
                item
                xs={12}
                sm={8}
                md={6}
                lg={4}
                className={classes.carouselComponent}
              >
                <CarouselComponent images={arrayImage} />
              </Grid>
            </Grid>} </>
          )}
        </div>


        <Box className={classes.marginTitule}>
          <Typography variant="h4">Location</Typography>
          <Typography variant="body1" />
        </Box>

        <MapEditLocation
          onGeolocationChange={handleOnGeolocationChange}
          markerLocation={user.geolocation}
          markerType={LIFE_BANK}
          width="100%"
          height={400}
          mb={1}
        />

        <Typography variant="h4">Blood Demand Level</Typography>
        <Typography variant="body1" className={classes.text}>
          Drag or tap to the demand level that represent your Lifebank actual
          necesities. You can set the token rewards depending on this levels.
        </Typography>

        <Box className={classes.bloodDemand}>
          <Box className={classes.markLabel}>
            <Typography variant="h4">Low</Typography>
            <Typography variant="h4" className={classes.midLabel}>
              Medium
            </Typography>
            <Typography variant="h4">Urgent</Typography>
          </Box>
          <Box className={classes.slider}>
            <Slider
              valueLabelDisplay="off"
              color="secondary"
              defaultValue={user.blood_urgency_level}
              valueLabelFormat={valueLabelFormat}
              onChange={(event, value) =>
                handleSetField('blood_urgency_level', value)
              }
              marks={marks}
              step={null}
              min={1}
              max={3}
            />
          </Box>
        </Box>

        <Box className={classes.levelReward}>
          <Typography variant="h4">Low Level Reward</Typography>
          <TextField
            id="lowLevelReward"
            type="number"
            disabled
            variant="outlined"
            defaultValue={1}
            InputLabelProps={{
              shrink: true
            }}
          />
        </Box>
        <Box className={classes.levelReward}>
          <Typography variant="h4">Medium Level Reward</Typography>
          <TextField
            id="mediumLevelReward"
            type="number"
            disabled
            variant="outlined"
            defaultValue={2}
            InputLabelProps={{
              shrink: true
            }}
          />
        </Box>
        <Box className={classes.levelReward}>
          <Typography variant="h4">Urgent Level Reward</Typography>
          <TextField
            id="urgentLevelReward"
            type="number"
            disabled
            variant="outlined"
            defaultValue={3}
            InputLabelProps={{
              shrink: true
            }}
          />
        </Box>
      </Box>
      <Box className={classes.btnWrapper}>
        <Box className={classes.boxBtn}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onSubmit(user)}
          >
            Save
          </Button>
          <Link to="/profile" className={classes.labelBtn}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.labelBtn}
            >
              cancel
            </Button>
          </Link>
        </Box>
        {loading && <CircularProgress />}
      </Box>
    </form>
  )
}

EditProfileBank.propTypes = {
  profile: PropTypes.object,
  onSubmit: PropTypes.func,
  setField: PropTypes.func,
  loading: PropTypes.bool
}

export default EditProfileBank
