import { Component } from 'react'
import React from "react";
import '../CSS/Calendar.css'
import { auth, db, storage } from "../Firebase/firebase"
import Calendar_new1 from "../Photos/AddGoogleCal1.png"
import Calendar_new2 from "../Photos/AddGoogleCal2.png"
import add from "../Photos/addEvent2.png"
import help from "../Photos/help2.png"



var gapi = window.gapi

window.URLcalendar = "https://calendar.google.com/calendar/u/1?cid=dGhlYXRlcmplcnVzYWxlbUBnbWFpbC5jb20"

var CLIENT_ID = "25532945063-7d85q8c7socv0ic5l8h5lhdupqkc0k3n.apps.googleusercontent.com"
var API_KEY = "AIzaSyDLfXSRbdMnZCiQLpOPQ0SdgzEMigMqFwE"


// var CLIENT_ID = "269970060271-itlf5cfr93fnu85pue6jfmjchdvt9l32.apps.googleusercontent.com"
// var API_KEY = "AIzaSyC7J7k45TnTkY8j6hGmoR7iBnYr5ovyPvc"
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
var SCOPES = [
    "https://www.googleapis.com/auth/calendar",                     //read/write access to Calendars
    "https://www.googleapis.com/auth/calendar.readonly",            //read-only access to Calendars
    "https://www.googleapis.com/auth/calendar.events",              //read/write access to Events
    "https://www.googleapis.com/auth/calendar.events.readonly",     //read-only access to Events
    "https://www.googleapis.com/auth/calendar.settings.readonly",   //read-only access to Settings
    "https://www.googleapis.com/auth/calendar.addons.execute",      //run as a Calendar add-on

]

class Calendar extends Component {


    constructor(props) {
        super(props);
        this.state = {
            help: false,
            addEvent: false,
            event: {},
            user: {},
            summery: '',
            location: '',
            description: '',
            timeZone: 'Asia/Jerusalem',
            dateTimeStart: '',
            dateTimeEnd: '',
            emails: [
                // {'email': '111@example.com'},
                // {'email': '123@example.com'}
            ],

        }

    }

    async createEvent() {

        /*get data from state*/
        let summery = this.state.summery
        let location = this.state.location
        let description = this.state.description
        let timeZone = this.state.timeZone
        let dateTimeStart = this.state.dateTimeStart
        let dateTimeEnd = this.state.dateTimeEnd
        let timeStart = this.state.timeStart
        let timeEnd = this.state.timeEnd
        let emails = this.state.emails


        var event = {
            'summary': summery,
            'location': location,
            'description': description,
            'start': {
                'dateTime': dateTimeStart + '-' + timeStart,
                'timeZone': timeZone
            },
            'end': {
                'dateTime': dateTimeEnd + '-' + timeEnd,
                'timeZone': timeZone
            },
            'recurrence': [
                'RRULE:FREQ=DAILY;COUNT=1'
            ],
            'attendees': emails,
            'reminders': {
                'useDefault': false,
                'overrides': [
                    { 'method': 'email', 'minutes': 24 * 60 },
                    { 'method': 'popup', 'minutes': 10 }
                ]
            }
        }
        console.log(event);
        this.setEvent(event)
    }

    async setEvent(event) {
        gapi = await window.gapi;
        gapi.client.setApiKey(API_KEY);
        gapi.auth.authorize(
            {
                'client_id': CLIENT_ID,
                'scope': SCOPES.join(' '),
                'immediate': true
            }, (authResult) => {
                gapi.client.load('calendar', 'v3', () => {
                    gapi.client.calendar.events.insert({
                        'calendarId': 'primary',
                        'resource': event
                    }).then((res) => {
                        console.log(event);
                        if (res) {
                            console.log(res)
                            this.setState({ newEvent: res })
                            window.location.reload();
                        }
                    }).catch((e) => {
                        alert("קלט חסר או לא תקין להוספת אירוע הכנס שוב");
                    });
                })
            })
        console.log(event);
    }

    // async getEvents() {
    //     // get events
    //     // console.log(  gapi.client.calendar)
    //     gapi = await window.gapi;
    //     gapi.client.setApiKey(API_KEY);
    //     console.log(gapi.client);
    //     gapi.auth.authorize(
    //         {
    //             'client_id': CLIENT_ID,
    //             'scope': SCOPES.join(' '),
    //             'immediate': true
    //         }, (authResult) => {
    //             gapi.client.load('calendar', 'v3', () => {
    //                 gapi.client.calendar.events.list({
    //                     'calendarId': 'primary',
    //                     'timeMin': (new Date()).toISOString(),
    //                     'showDeleted': false,
    //                     'singleEvents': true,
    //                     'maxResults': 10,
    //                     'orderBy': 'startTime'
    //                 }).then(response => {
    //                     const events = response.result.items;
    //                     console.log('EVENTS: ', events);
    //                     this.setState({ ...this, event: events }).then(()=>{return events;});
    //                     // return events;
    //                 })
    //             })
    //         })
    // }

    // deleteEvent(eventId) {
    //     console.log("delete");
    //     gapi.client.setApiKey(API_KEY);
    //     gapi.auth.authorize(
    //         {
    //             'client_id': CLIENT_ID,
    //             'scope': SCOPES.join(' '),
    //             'immediate': true
    //         }, (authResult) => {
    //             gapi.client.load('calendar', 'v3', () => {
    //                 gapi.client.calendar.events.delete({
    //                     'auth': auth,
    //                     'calendarId': 'primary',
    //                     'eventId': eventId
    //                 }).then((res) => {
    //                     console.log(res);
    //                     if (res) {
    //                         console.log(res);
    //                         this.setState({ newEvent: res })
    //                         window.location.reload();
    //                     }
    //                 })
    //             })
    //         })
    // }

    //copy the url
    copyToClipboard = (URLcalendar) => {
        const el = document.createElement('textarea');
        el.value = URLcalendar;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        console.log("copy");
    };

    createTime(e) {//Format change
        var t = e.target.value.split('-')
        var d = new Date(t[0], t[1] - 1, t[2], 0, 0, 0)
        d = d.toISOString();
        d = d.substring(0, d.length - 5)
        return d;
    }

    // openWinEvents() {
    //     let myWindow = window.open("", "myWindow", "width=200, height=100");
    //     this.getEvents();
    //     let events = this.state.event;
    //     console.log(events);
    //     let StringEvents = "<table className = \"listEvent\">";
    //     events.forEach(e => {
    //         StringEvents += "<tr>";
    //         StringEvents += "<td> " + e.summary + "</td>";
    //         StringEvents += "</tr>";
    //     });

    //     StringEvents += "</table>";
    //     // let v = <button>yaniv</button>;
    //     myWindow.document.write(StringEvents);
    // }

    render() {
        return (
            <div className="Calendar">
                <h1><b>יומן</b></h1>
                {/* <h2 className="line"></h2>
                <h2 className="line"></h2> */}
                {/* <button onClick={() => this.openWinEvents()}>delete Event</button>
                <button onClick={() => this.getEvents()}>getEvent</button>
                <button onClick={() => this.deleteEvent("notqbcjfuv0be19kvhkdkp1ifc_20210609T092600Z")}>deleteEvent</button> */}
                <table id="icons">
                    <tbody>
                    <tr>
                        <td><button className="addEvent" onClick={() => {
                    this.setState({ addEvent: !this.state.addEvent })
                }}><img id="add" alt="" src={add}></img></button></td>

                <td><button id="help_but"  onClick={() => {
                    this.setState({ help: !this.state.help })
                }}><img id="help" alt="" src={help}></img></button></td>
                    </tr>
                    </tbody>
                </table>
                
                {!this.state.addEvent ? <div></div> :
                    <div id="formAddEvent">
                        <form className="modal-body" id="addEvent" role="dialog" aria-hidden="true">
                            <p>
                                <label className="events">הכנס שם אירוע</label>
                                <input type="text" name="name" onBlur={(e) => {
                                    this.setState({ summery: e.target.value })
                                }} placeholder="הכנס שם אירוע"></input>
                            </p>
                            <p>
                                <label className="events">הכנס תאריך התחלת אירוע</label>
                                <input type="date" name="dateTimeStart"
                                    onChange={
                                        (e) => {
                                            var d = this.createTime(e)
                                            this.setState({ dateTimeStart: d })
                                        }
                                    }></input>
                            </p>
                            <p>
                                <label className="events">הכנס זמן התחלת האירוע</label>
                                <input type="Time" name="dateTimeEnd"
                                    onChange={(e) => {
                                        this.setState({ timeStart: e.target.value })
                                    }}></input>
                            </p>
                            <p>
                                <label className="events">הכנס תאריך סיום האירוע</label>
                                <input type="date" name="dateTimeEnd"  /*value={this.state.dateTimeEnd}*/
                                    onChange={
                                        (e) => {
                                            var d = this.createTime(e)
                                            this.setState({ dateTimeEnd: d })
                                        }}></input>
                            </p>
                            <p>
                                <label className="events">הכנס זמן סיום האירוע</label>
                                <input type="Time" name="dateTimeEnd"
                                    onChange={(e) => {
                                        this.setState({ timeEnd: e.target.value })
                                    }}></input>
                            </p>
                        </form>
                        <button style={{ width: 100, height: 50 }} onClick={() => this.createEvent()}>הוספת אירוע</button>
                    </div>}

                
                {!this.state.help ? <div></div> :
                    <div id="addCalendar">
                        <h2 className="line"><span className="fas fa-plus"></span>הנחיות לביצוע סינכרון ליומן של גוגל</h2>
                        <h3>שלב א'</h3> יש להעתיק את הכתובת הבאה:<br></br>{window.URLcalendar}<br></br>
                        <button onClick={() => this.copyToClipboard(window.URLcalendar)}>העתק</button>
                        <h3>שלב ב'</h3> הכנס ליומן של גוגל בכתובת<br></br>
                        <a href="https://calendar.google.com/" target="_blank">https://calendar.google.com</a>
                        <h3>שלב ג'</h3><br></br> Add a Friend's Calendar -&gt; ושם לבחור From URL <br></br>
                        <img src={Calendar_new1} className="img-fluid" alt="תמונה שמציגה היכן ביומן של גוגל יש להוסיף את הקישור"></img>
                        <h3>שלב ד'</h3>הדבק את הכתובת משלב א' והוסף יומן <br></br>
                        <img src={Calendar_new2} className="img-fluid" alt="תמונה שמציגה היכן ביומן של גוגל יש להוסיף את הקישור"></img>
                        <br></br>
                    </div>}
                <iframe src="https://calendar.google.com/calendar/embed?height=400&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=Asia%2FJerusalem&amp;src=dGhlYXRlcmplcnVzYWxlbUBnbWFpbC5jb20&amp;color=%23039BE5&amp;showTitle=0&amp;showNav=1&amp;showDate=1&amp;showPrint=1&amp;showTabs=0&amp;showCalendars=1&amp;showTz=0"></iframe>
                {/* <iframe src="https://calendar.google.com/calendar/embed?src=theaterjerusalem%40gmail.com&ctz=Asia%2FJerusalem"></iframe> */}
                {/* <iframe src="https://calendar.google.com/calendar/embed?src=roipk123%40gmail.com&ctz=Asia%2FJerusalem"></iframe> */}
                <button id="go_home_fromcalendar" onClick={() => {
                        this.props.history.push(
                            {
                                pathname: "/home"
                            })
                    }}>למסך הבית</button>
            </div>

        )

    }


}

export default Calendar;
