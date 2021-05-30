// import './App.css';
// import Footer from "./Components/Footer";
// import Login from "./Components/Login";
// import HomePage from "./Components/HomePage";
// import File from "./Components/File";
// import Archive from "./Components/Archive";
// import Production from "./Components/Production";
// import React from 'react';

// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


// var gapi = window.gapi

// var CLIENT_ID = "565170161100-9hpaufl51k3mk16e1731scc90cpjbte9.apps.googleusercontent.com";
// var API_KEY = "AIzaSyBFyGRoCm1qve96gOz9nJnE-pZsWX1yK2w";
// var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
// var SCOPES = "https://www.googleapis.com/auth/calendar.events"

// function App() {

//   const handleClick = async () => {
//     if(gapi.auth2.getAuthInstance()==null)
//     {
//     gapi.load('client:auth2', () => {
//         console.log('loaded client')

//         gapi.client.init({
//             apiKey: API_KEY,
//             clientId: CLIENT_ID,
//             discoveryDocs: DISCOVERY_DOCS,
//             scope: SCOPES,
//         })

//         gapi.client.load('calendar', 'v3', (res) => console.log(res))
//     })
//     }
//     else
//   {
//     gapi.auth2.getAuthInstance().signIn()
//                 .then(() => {
//                     console.log(gapi.auth2.getAuthInstance())
                    
//         var event = {
//             'summary': 'Awesome Event!',
//             'location': '800 Howard St., San Francisco, CA 94103',
//             'description': 'Really great refreshments',
//             'start': {
//                 'dateTime': '2021-05-29T09:00:00-07:00',
//                 'timeZone': 'America/Los_Angeles'
//             },
//             'end': {
//                 'dateTime': '2021-05-30T17:00:00-07:00',
//                 'timeZone': 'America/Los_Angeles'
//             },
//             'recurrence': [
//                 'RRULE:FREQ=DAILY;COUNT=1'
//             ],
//             'attendees': [
//                 // {'email': 'lpage@example.com'},
//                 // {'email': 'sbrin@example.com'}
//             ],
//             'reminders': {
//                 'useDefault': false,
//                 'overrides': [
//                     {'method': 'email', 'minutes': 24 * 60},
//                     {'method': 'popup', 'minutes': 10}
//                 ]
//             }
//         }



//         var request = gapi.client.calendar.events.insert({
//             'calendarId': 'primary',
//             'resource': event,
//         })

//         request.execute(event => {
//             console.log(event)
//             // window.open(event.htmlLink)
//         })
//       })
//   }
// }





//   return (
//     <div className="App">
//       <header className="App-header">
//         <Router>
//           <Switch>
//             <Route exact path="/" component={Login} />
//             <Route exact path="/Home" component={HomePage} />
//             <Route exact path="/File" component={File} />
//             <Route exact path="/Archive" component={Archive} />
//             <Route exact path="" component={Production} />
//           </Switch>
//         </Router>

        
//       </header>

//       <button style={{width: 100, height: 50}} onClick={handleClick}>Add Event</button>
//       <iframe src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=Asia%2FJerusalem&amp;src=dGhlYXRlcmplcnVzYWxlbUBnbWFpbC5jb20&amp;color=%23039BE5&amp;showTitle=0" ></iframe>
//       <Footer className='footer'/>
//     </div>
//   );
// }

// export default App;







import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Calendar from "./Components/Calendar";

function App() {

    var gapi = window.gapi
// var CLIENT_ID = "565170161100-k65g7i1trf892ctumgd74dqv755mclj2.apps.googleusercontent.com";
// var API_KEY = "AIzaSyBFyGRoCm1qve96gOz9nJnE-pZsWX1yK2w";


    var CLIENT_ID = "269970060271-itlf5cfr93fnu85pue6jfmjchdvt9l32.apps.googleusercontent.com"
    var API_KEY = "AIzaSyC7J7k45TnTkY8j6hGmoR7iBnYr5ovyPvc"
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
    var SCOPES = "https://www.googleapis.com/auth/calendar.readonly"
    // var SCOPES = "https://www.googleapis.com/auth/calendar.events"

    //another scop
    // https://www.googleapis.com/auth/calendar	                    read/write access to Calendars
    // https://www.googleapis.com/auth/calendar.readonly	        read-only access to Calendars
    // https://www.googleapis.com/auth/calendar.events	            read/write access to Events
    // https://www.googleapis.com/auth/calendar.events.readonly	    read-only access to Events
    // https://www.googleapis.com/auth/calendar.settings.readonly	read-only access to Settings
    // https://www.googleapis.com/auth/calendar.addons.execute      run as a Calendar add-on

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
                    // console.log(gapi.auth2.getAuthInstance())
                    // var event = {
                    //     'summary': 'Awesome Event!',
                    //     'location': '800 Howard St., San Francisco, CA 94103',
                    //     'description': 'Really great refreshments',
                    //     'start': {
                    //         'dateTime': '2021-05-29T09:00:00-07:00',
                    //         'timeZone': 'America/Los_Angeles'
                    //     },
                    //     'end': {
                    //         'dateTime': '2021-05-30T17:00:00-07:00',
                    //         'timeZone': 'America/Los_Angeles'
                    //     },
                    //     'recurrence': [
                    //         'RRULE:FREQ=DAILY;COUNT=1'
                    //     ],
                    //     'attendees': [
                    //         // {'email': 'lpage@example.com'},
                    //         // {'email': 'sbrin@example.com'}
                    //     ],
                    //     'reminders': {
                    //         'useDefault': false,
                    //         'overrides': [
                    //             {'method': 'email', 'minutes': 24 * 60},
                    //             {'method': 'popup', 'minutes': 10}
                    //         ]
                    //     }
                    // }



                    // var request = gapi.client.calendar.events.insert({
                    //     'calendarId': 'primary',
                    //     'resource': event,
                    // })

                    // request.execute(event => {
                    //     console.log(event)
                    //     window.open(event.htmlLink)
                    // })


                    /*
                        Uncomment the following block to get events
                    */

                    // get events
                    console.log(  gapi.client.calendar)
                    gapi.client.calendar.events.list({
                      'calendarId': 'primary',
                      'timeMin': (new Date()).toISOString(),
                      'showDeleted': false,
                      'singleEvents': true,
                      'maxResults': 10,
                      'orderBy': 'startTime'
                    }).then(response => {
                      const events = response.result.items
                      console.log('EVENTS: ', events)
                    })



                }).catch(err=>{
                console.log(err)
            })
        }

    }


    return (
        <div className="App">
            <header className="App-header">
                {/* <img src={logo} className="App-logo" alt="logo" /> */}
                <p>Click to add event to Google Calendar</p>
                <p style={{fontSize: 18}}>Uncomment the get events code to get events</p>
                <p style={{fontSize: 18}}>Don't forget to add your Client Id and Api key</p>
                {/* <button style={{width: 100, height: 50}} onClick={handleClick}>Add Event</button> */}
                {/* <iframe src="https://calendar.google.com/calendar/embed?src=roipk123%40gmail.com&ctz=Asia%2FJerusalem"></iframe> */}
               {/* <iframe src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=Asia%2FJerusalem&amp;src=dGhlYXRlcmplcnVzYWxlbUBnbWFpbC5jb20&amp;color=%23039BE5&amp;showTitle=0" ></iframe> */}

            </header>
            <Calendar/>
        </div>
    );
}

export default App;


