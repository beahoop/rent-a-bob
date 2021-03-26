import os
from .Google import Create_Service, convert_to_RFC_datetime
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view

CLIENT_SECRET_FILE = 'google-credentails.json'
API_NAME = 'calendar'
API_VERISON = 'v3'
SCOPES = ['https://www.googleapis.com/auth/calendar']

service = Create_Service(API_NAME, API_VERISON, SCOPES)

calendar_id_rentabob = os.environ.get('GOOGLE_CALENDAR_ID')

# # request_body = {
# #     'summary': 'Rent A Bob Appointments'
# # }
# # """
# # To create a calendar
# # """
# # response = service.calendars().insert(body=request_body).execute()
# # print(response)
# #
# # """
# # To delete a calendar
# # """
# # service.calendars().delete(calendarId='9n1i4arg6dl9avaaoob9pfb268@group.calendar.google.com').execute()
"""
Create an event
"""
@api_view()
def create_event(request):

    # now create the event in the database
    # serializer = EventSerializer(data=request.data)
    # if serializer.is_valid():
        # create the object in the database and generate a google calendar event
        # return that object with the correct status code
    # return serializer errors with correct status code





    # if request.method == "POST"
    event_request_body ={
    # request.body
    # phone = request.data["phone_number"]
     # 'summary': request.summary,
     'summary': "Testing Run",
      'location': '411 University Ridge, Greenville, SC 29601',
      'description': 'thru django SENDING AN EVENT',
      'start': {
        'dateTime': '2021-04-05T07:00:00',
        'timeZone': 'America/Los_Angeles',
      },
      'end': {
        'dateTime': '2021-04-05T09:00:00',
        'timeZone': 'America/Los_Angeles',
      },
      'attendees': [
        {
            'displayName' : 'Bob',
            'comment': 'testing this event sender',
            'email': 'rentabob@live.com'
        },
        {
            'displayName' : 'Sarah',
            'comment': 'testing this event sender',
            'email': 'scbhooper@gmail.com'
        },
      ],
    }

 # generate a google calendar event
    maxAttendees = 5
    sendNotification = True
    sendUpdate = 'all'
    supportsAttachments= False

    response = service.events().insert(
        calendarId=calendar_id_rentabob,
        maxAttendees=maxAttendees,
        sendNotifications=sendNotification,
        sendUpdates=sendUpdate,
        supportsAttachments=supportsAttachments,
        body=event_request_body
    ).execute()

    print(response)
    eventId =(response['id'])





    return Response(response)

# Event.model.create()
# """
# Update an event
# """
#
# start_datetime = convert_to_RFC_datetime(2021, 4, 1, 14, 30)
# end_datetime = convert_to_RFC_datetime(2021, 4, 1, 18, 30)
# response['start']['dateTime'] = start_datetime
# response['end']['dateTime'] = end_datetime
# respone['summary'] = 'Family Dinner'
# respone['Description'] = 'Having Family Dinner'
# service.events().update(
#     ccalendarId=calendar_id_rentabob,
#     eventId=eventId,
#     body=response).execute()
#
# """
# Delete an event
# """
#
# service.events.().delete(ccalendarId=calendar_id_rentabob,
# eventId=eventId).execute()
