import {Component} from 'react'
import React from "react";


var gapi = window.gapi


// var CLIENT_ID = "25532945063-7d85q8c7socv0ic5l8h5lhdupqkc0k3n.apps.googleusercontent.com"
// var API_KEY = "AIzaSyDLfXSRbdMnZCiQLpOPQ0SdgzEMigMqFwE"

var CLIENT_ID = "269970060271-itlf5cfr93fnu85pue6jfmjchdvt9l32.apps.googleusercontent.com"
var API_KEY = "AIzaSyC7J7k45TnTkY8j6hGmoR7iBnYr5ovyPvc"
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
var SCOPES = [
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/calendar.readonly",
    "https://www.googleapis.com/auth/calendar.events",
    "https://www.googleapis.com/auth/calendar.events.readonly",
    "https://www.googleapis.com/auth/calendar.settings.readonly",
    "https://www.googleapis.com/auth/calendar.addons.execute",

]
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
        this.state={
            event:{},
            user:{},
         summery:'Awesome Event!',
         location:'800 Howard St., San Francisco, CA 94103',
         description: 'Really great refreshments',
         timeZone:'America/Los_Angeles',
         dateTimeStart:'2021-05-29T09:00:00-07:00',
         dateTimeEnd:'2021-05-30T17:00:00-07:00',
         emails:[
            // {'email': 'lpage@example.com'},
            // {'email': 'sbrin@example.com'}
        ],

        }

    }



    async createEvent() {
        /*get data from function*/
        // async createEvent(summery,location,description,timeZone,dateTimeStart,dateTimeEnd,emails) {


        /*manual init*/
        // let summery='Awesome Event!'
        // let location='800 Howard St., San Francisco, CA 94103'
        // let description= 'Really great refreshments'
        // let timeZone='America/Los_Angeles'
        // let dateTimeStart='2021-05-29T09:00:00-07:00'
        // let dateTimeEnd='2021-05-30T17:00:00-07:00'
        // let emails=[
        //     // {'email': 'lpage@example.com'},
        //     // {'email': 'sbrin@example.com'}
        // ]


        /*get data from state*/
        let summery=this.state.summery
        let location=this.state.location
        let description= this.state.description
        let timeZone=this.state.timeZone
        let dateTimeStart=this.state.dateTimeStart
        let dateTimeEnd=this.state.dateTimeEnd
        let emails=this.state.emails


          var event = {
              'summary': summery,
              'location': location,
              'description': description,
              'start': {
                  'dateTime': dateTimeStart,
                  'timeZone': timeZone
              },
              'end': {
                  'dateTime': dateTimeEnd,
                  'timeZone': timeZone
              },
              'recurrence': [
                  'RRULE:FREQ=DAILY;COUNT=1'
              ],
              'attendees':emails,
              'reminders': {
                  'useDefault': false,
                  'overrides': [
                      {'method': 'email', 'minutes': 24 * 60},
                      {'method': 'popup', 'minutes': 10}
                  ]
              }
          }
    console.log(event);

    this.setEvent(event)

    }

    async setEvent(event) {
    gapi = await window.gapi
    gapi.client.setApiKey(API_KEY);
    gapi.auth.authorize(
        {
            'client_id': CLIENT_ID,
            'scope': SCOPES.join(' '),
            'immediate': true
        },(authResult)=>{
            gapi.client.load('calendar', 'v3', async ()=>{
                var res =await gapi.client.calendar.events.insert({
                    'calendarId': 'primary',
                    'resource': event
                });
                if(res)
                {
                    console.log(res)
                    this.setState({newEvent:res})
                    window.location.reload();
                }
            });
        });
        console.log(event);
}

    async getEvents() {
        // get events
        // console.log(  gapi.client.calendar)
        gapi = await window.gapi
        gapi.client.setApiKey(API_KEY);
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
    }



    render() {
        return(
            <div>
                <div>
                <button style={{width: 100, height: 50}} onClick={()=>this.createEvent()}>Add Event</button>
                </div>
            <div>
                <iframe src="https://calendar.google.com/calendar/embed?src=roipk123%40gmail.com&ctz=Asia%2FJerusalem"></iframe>
            </div>
            </div>
        )

    }


}




export default Calendar;
