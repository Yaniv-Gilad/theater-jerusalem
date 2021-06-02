import './App.css';
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import HomePage from "./Components/HomePage";
import File from "./Components/File";
import Archive from "./Components/Archive";
import Production from "./Components/Production";
import React from 'react';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


var gapi = window.gapi

var CLIENT_ID = "565170161100-9hpaufl51k3mk16e1731scc90cpjbte9.apps.googleusercontent.com";
var API_KEY = "AIzaSyBFyGRoCm1qve96gOz9nJnE-pZsWX1yK2w";
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
var SCOPES = "https://www.googleapis.com/auth/calendar.events"

function App() {

  const handleClick = async () => {
    if(gapi.auth2.getAuthInstance()==null)
    {
    gapi.load('client:auth2', () => {
        console.log('loaded client')

        gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES,
        })

        gapi.client.load('calendar', 'v3', (res) => console.log(res))
    })
    }
    else
  {
    gapi.auth2.getAuthInstance().signIn()
                .then(() => {
                    console.log(gapi.auth2.getAuthInstance())
                    
        var event = {
            'summary': 'Awesome Event!',
            'location': '800 Howard St., San Francisco, CA 94103',
            'description': 'Really great refreshments',
            'start': {
                'dateTime': '2021-05-29T09:00:00-07:00',
                'timeZone': 'America/Los_Angeles'
            },
            'end': {
                'dateTime': '2021-05-30T17:00:00-07:00',
                'timeZone': 'America/Los_Angeles'
            },
            'recurrence': [
                'RRULE:FREQ=DAILY;COUNT=1'
            ],
            'attendees': [
                // {'email': 'lpage@example.com'},
                // {'email': 'sbrin@example.com'}
            ],
            'reminders': {
                'useDefault': false,
                'overrides': [
                    {'method': 'email', 'minutes': 24 * 60},
                    {'method': 'popup', 'minutes': 10}
                ]
            }
        }



        var request = gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': event,
        })

        request.execute(event => {
            console.log(event)
            // window.open(event.htmlLink)
        })
      })
  }
}





  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/Home" component={HomePage} />
            <Route exact path="/File" component={File} />
            <Route exact path="/Archive" component={Archive} />
            <Route exact path="" component={Production} />
          </Switch>
        </Router>

        
      </header>

      {/* <button style={{width: 100, height: 50}} onClick={handleClick}>Add Event</button> */}
      {/* <iframe src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=Asia%2FJerusalem&amp;src=dGhlYXRlcmplcnVzYWxlbUBnbWFpbC5jb20&amp;color=%23039BE5&amp;showTitle=0" ></iframe> */}
      <Footer className='footer'/>
    </div>
  );
}

export default App;





