import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link as LinkRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { Box } from '@material-ui/core'
import { useQuery } from '@apollo/react-hooks'
import { useTranslation } from 'react-i18next'
import CircularProgress from '@material-ui/core/CircularProgress'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import CardContent from '@material-ui/core/CardContent'
import LocalHospitalIcon from '@material-ui/icons/LocalHospital'
import Button from '@material-ui/core/Button'

import { GET_NEARBY_LOCATIONS_QUERY } from '../../gql'
import styles from './styles'

const useStyles = makeStyles(styles)

const Nearby = ({ location, searchDistance, account }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [loadingLocations, setLoadingLocations] = useState(true)
  const [nearbyLocations, setNearbyLocations] = useState([])
  const { refetch: getNearbyLocations } = useQuery(GET_NEARBY_LOCATIONS_QUERY, {
    variables: {},
    skip: true
  })

  const getNerbyLocations = async () => {
    setLoadingLocations(true)

    const { data } = await getNearbyLocations({
      distance: searchDistance,
      point: {
        type: 'Point',
        coordinates: [location.longitude, location.latitude]
      }
    })

    let dataOffers = data.locations
    dataOffers = dataOffers.filter((item) => item.account !== account)

    setNearbyLocations(dataOffers)
    setLoadingLocations(false)
  }

  useEffect(() => {
    getNerbyLocations()
  }, [searchDistance])

  const ItemCard = (props) => (
    <Card className={classes.cardRoot}>
      <Box className={classes.cardHeader}>
        <Avatar
          className={classes.cardAvatar}
          src={
            props.item.info.logo_url !== ''
              ? `//images.weserv.nl?url=${props.item.info.logo_url}&h=60&dpr=1`
              : ''
          }
        >
          <LocalHospitalIcon />
        </Avatar>
        <Box className={classes.cardTitleContainer}>
          <Typography className={classes.cardTitle} noWrap>
            {props.item.info.name}
          </Typography>
        </Box>
      </Box>
      <CardContent className={classes.cardContent}>
        <Typography className={classes.cardContentText}>
          {truncateString(props.item.info.about)}
        </Typography>
      </CardContent>
      <LinkRouter
        style={{ textDecoration: 'none' }}
        to={`/info/${props.item.user.username.replaceAll(' ', '-')}`}
      >
        <Button color="primary" className={classes.cardActionButton}>
          {t('cardsSection.moreInfo')}
        </Button>
      </LinkRouter>
    </Card>
  )

  ItemCard.propTypes = {
    item: PropTypes.object
  }

  return (
    <>
      {loadingLocations && (
        <Box className={classes.wrapper}>
          <CircularProgress />
        </Box>
      )}
      {!loadingLocations && nearbyLocations.length <= 0 && (
        <Typography
          className={classes.title}
          color="textSecondary"
        >
          {t('miscellaneous.noNear')}
          <LinkRouter to="/" target="_blank">https://lifebank.io/</LinkRouter>
        </Typography>
      )}
      {!loadingLocations &&
        nearbyLocations &&
        nearbyLocations.length > 0 &&
        nearbyLocations.map((item) => <ItemCard key={item.id} item={item} />)}
    </>
  )
}

const truncateString = (str) => {
  const num = 55

  if (str.length <= num) return str

  return str.slice(0, num) + '...'
}

Nearby.propTypes = {
  location: PropTypes.object,
  searchDistance: PropTypes.number,
  account: PropTypes.string
}

export default Nearby
