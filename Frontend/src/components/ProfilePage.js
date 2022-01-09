import { TextField, Typography } from '@mui/material';
import * as React from 'react';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';

export default () => {
   const [value, setValue] = React.useState(0);
   const handleTabs = (event, val) => {
      setValue = val
   }

   return (
      <div>
         <Tabs value={value} onChange={handleTabs}>
            <Tab icon={<InfoIcon />} iconPosition="start" label="User Information" />
            <Tab icon={<SettingsIcon />} iconPosition="start" label="Manage Password" />
         </Tabs>
         <TabPanel value={value} index={0}>
            Tab 1
         </TabPanel>
         <TabPanel value={value} index={1}>
            Tab 2
         </TabPanel>
      </div>
   );
}

function TabPanel(props) {
   const {children, value, index} = props;
   return (
      <div>
         {
            value===index && (
               <Typography>
                  Cheese
               </Typography>
            )
         }
      </div>
   );
}