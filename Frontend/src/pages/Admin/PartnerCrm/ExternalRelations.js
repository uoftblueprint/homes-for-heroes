import * as React from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PartnerCrm from './PartnerCRM.js';
import SupporterCrm from './SupporterCRM.js';
import VolunteerCrm from './VolunteerCRM.js';


export default function ExternalRelations(){
  const [value, setValue] = React.useState(0)

  const handleChange = (e, v) => {
    setValue(v);
  }

  const handleChangeIndex = (index) => {
    setValue(index);
  }


return(
  <Card
    display="flex"
    direction="column"
    sx={{ mt: '15px', boxShadow: 'None', minHeight: 1000, minWidth: 375, width: "100%", maxWidth: 1200 }}
  >
    <Grid
      display="flex"
      direction="row"
    >
    </Grid>
      <Tabs
        value={value}
        onChange={handleChange} 
        variant='fullWidth'
      >
        <Tab value={0} label="Partners" />
        <Tab value={1} label="Volunteers" />
        <Tab value={2} label="Supporters" />
      </Tabs>
      <SwipeableViews
        index={value}
        onChangeIndex={handleChangeIndex}
        enableMouseEvents
        overScanSlideAfter={1}
        overScanSlideBefore={1}
      >

          <PartnerCrm /> 
          <VolunteerCrm />
          <SupporterCrm />


      </SwipeableViews>
    </Card>
  )
}