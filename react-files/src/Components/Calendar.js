import react,{Component} from 'react'
import React from "react";
var gapi = window.gapi

var CLIENT_ID = "565170161100-9hpaufl51k3mk16e1731scc90cpjbte9.apps.googleusercontent.com";
var API_KEY = "AIzaSyBFyGRoCm1qve96gOz9nJnE-pZsWX1yK2w";
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly"
//another scop
// https://www.googleapis.com/auth/calendar	                    read/write access to Calendars
// https://www.googleapis.com/auth/calendar.readonly	        read-only access to Calendars
// https://www.googleapis.com/auth/calendar.events	            read/write access to Events
// https://www.googleapis.com/auth/calendar.events.readonly	    read-only access to Events
// https://www.googleapis.com/auth/calendar.settings.readonly	read-only access to Settings
// https://www.googleapis.com/auth/calendar.addons.execute      run as a Calendar add-on


class Calendar extends Component{

    constructor(props) {
        super(props);


    }
    async componentDidMount()
    {

        gapi.load('client:auth2', () => {
            console.log('loaded client')

            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES,
            })
            gapi.client.load('calendar', 'v3', () => console.log("in"))


            gapi.auth2.getAuthInstance().signIn().then(()=>{
                console.log("login")
            })

        })
    }




//     createEvent()
//   {

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

//     }


    // getEvents()
    // {
    //     // get events
    //     // console.log(  gapi.client.calendar)
    //     gapi.client.calendar.events.list({
    //       'calendarId': 'primary',
    //       'timeMin': (new Date()).toISOString(),
    //       'showDeleted': false,
    //       'singleEvents': true,
    //       'maxResults': 10,
    //       'orderBy': 'startTime'
    //     }).then(response => {
    //       const events = response.result.items
    //       console.log('EVENTS: ', events)
    //     })
    // }




    render() {
        return(
            <div>
                <div>
                <button style={{width: 100, height: 50}} onClick={()=>this.createEvent()}>Add Event</button>
                </div>
            <div>
                <iframe src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=Asia%2FJerusalem&amp;src=dGhlYXRlcmplcnVzYWxlbUBnbWFpbC5jb20&amp;color=%23039BE5&amp;showTitle=0" ></iframe>
            </div>
            </div>
        )

    }


}



export default Calendar;
