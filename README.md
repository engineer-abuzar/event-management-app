# event-management
The Event Management API is a RESTful backend service built with Node.js, Express, and PostgreSQL. It allows clients to create, manage, and register users for events while enforcing strict business rules such as capacity limits, duplicate prevention, and date-based validations.

1.create Tables
Postgres Tables:
1.Users
column_name	data_type          	is_nullable	  column_default
id	        integer	            NO	          nextval('users_id_seq'::regclass)
event_id   	smallint  	        NO	          NULL
name	      character varying  	YES	          NULL
email      	character varying	  YES	          NULL

2.Events
"column_name"   	"data_type"	                  "is_nullable"	"column_default"
"id"	           "integer"	                    "NO"	        "nextval('events_id_seq'::regclass)"
"date_time"	     "timestamp without time zone"	"YES"	        null
"capacity"	      "smallint"	                  "YES"	        null
"registrations"  	"integer"	                    "YES"	        null
"title"	          "character varying"          	"YES"	        null
"location"	      "character varying"          	"YES"	        null


note:-event_id is set to a foriegn key from reference table events and column is id.

2.Set your Db Configuration in .env file


3.Run command npm install

4.Run the backend using node server.js


Routes (Requests/Responses):
1.api/event for Events
2.api/user for users

EVENT Routes
POST api/event/creatEvent
Content-Type: application/x-www-form-urlencoded

{
  "title": "AI Bootcamp",
  "date_time": "2025-08-01T10:00:00Z",
  "location": "Delhi",
  "capacity": 200
}

201 Created

{
  "message": "Event created successfully with Id 1",
  
}

GET api/event/eventDetails
Content-Type: application/x-www-form-urlencoded


201 Created
{
    "totalEvents": [
        {
            "id": 4,
            "title": "Spoken English",
            "date_time": "2025-07-25T04:30:00.000Z",
            "location": "Bangalore",
            "capacity": 100,
            "registrations": 86
        },
        {
            "id": 5,
            "title": "Coding Bootcamp",
            "date_time": "2025-07-02T09:30:00.000Z",
            "location": "Lucknow",
            "capacity": 240,
            "registrations": 162
        },
       ]
       }
       
POST api/event/eventStats
Content-Type: application/x-www-form-urlencoded

{
event_id:1
}

200 OK

{
    "totalRegistration": 9,
    "remainingCapacity": 191,
    "totalCapacityUsed": 4.5
}

GET api/event/upcomingEvents

200 OK
{
    "sortedEvents": [
        {
            "id": 11,
            "title": "Robotics Expo",
            "date_time": "2025-07-23T03:30:00.000Z",
            "location": "Hyderabad",
            "capacity": 200,
            "registrations": 120
        },
        {
            "id": 4,
            "title": "Spoken English",
            "date_time": "2025-07-25T04:30:00.000Z",
            "location": "Bangalore",
            "capacity": 100,
            "registrations": 86
        },
        {
            "id": 8,
            "title": "Art & Craft",
            "date_time": "2025-07-25T09:30:00.000Z",
            "location": "Kolkata",
            "capacity": 750,
            "registrations": 96
        }
        ]
        }

USER Routes:


POST api/user/registerEvent
Content-Type: application/x-www-form-urlencoded

{
name:"Faiz"
email:"faiz@gmail.com",
event_id:1
}

203
{
message:"User created successfully"
}


DELETE api/user/cancelRegistration
Content-Type: application/x-www-form-urlencoded

{
email:"faiz@gmail.com",
}

200 OK
{
message:"Registration cancelled"
}
