import * as React from 'react';
import { Tabs, Tab, AppBar } from "@mui/material";
import {BrowserRouter} from "react-router-dom";

export default function NavBar() {
   const routes = ["/components/CaseDetails", "/components/UserList", "/components/Login"]

   return (
      <div className="NavBar">
         <BrowserRouter>
            <Route 
               path="/" 
               render={(history) => (
                  <AppBar>
                     <Tabs 
                        value={
                           history.location.pathname !== '/'
                              ? history.location.pathname 
                              : false
                        }
                     >
                        <Tab 
                           label="Case Details" 
                           value={routes[0]} 
                           component={Link}
                           to={routes[0]}
                           />
                        <Tab 
                           label="User List" 
                           value={routes[1]} 
                           component={Link}
                           to={routes[1]}
                           />
                        <Tab 
                           label="Login"
                           value={routes[2]}
                           component={Link}
                           to={routes[2]} 
                           />
                     </Tabs>
                  </AppBar>
               )}
            />
            
            <Switch>
               <Route path="/components/CaseDetails" component={CaseDetails} />
               <Route path="/components/UserList" component={UserList} />
               <Route path="/components/Login" component={Login} />
            </Switch>
         </BrowserRouter>
      </div>
   );
}