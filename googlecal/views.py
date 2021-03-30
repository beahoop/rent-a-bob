import os
from .Google import Create_Service, convert_to_RFC_datetime
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import Http404
from .serializers import EventsSerializer
from . import models

#
# GOOGLE_APPLICATION_CREDENTIALS = 'google-credentials.json'
# API_NAME = 'calendar'
# API_VERISON = 'v3'
# SCOPES = ['https://www.googleapis.com/auth/calendar']
#
# service = Create_Service(GOOGLE_APPLICATION_CREDENTIALS, API_NAME, API_VERISON, SCOPES)
#
# calendar_id_rentabob = os.environ.get('GOOGLE_CALENDAR_ID')


class EventsListView(generics.ListCreateAPIView):
    queryset = models.Event.objects.all().order_by('dateTime_start')
    serializer_class = EventsSerializer

class EventsDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Event.objects.all().order_by('dateTime_start')
    serializer_class = EventsSerializer


class ListEvents(APIView):
    queryset = models.Event.objects.all() #.order_by('last_name')
    serializer_class = EventsSerializer
#
#     GOOGLE_APPLICATION_CREDENTIALS = 'google-credentials.json'
#     API_NAME = 'calendar'
#     API_VERISON = 'v3'
#     SCOPES = ['https://www.googleapis.com/auth/calendar']
#
#     service = Create_Service(GOOGLE_APPLICATION_CREDENTIALS, API_NAME, API_VERISON, SCOPES)
#
#     calendar_id_rentabob = os.environ.get('GOOGLE_CALENDAR_ID')
#
#     def post(self, request, format=None):
#             event_request_body ={
#              'summary': request.data["summary"],
#               'location': request.data["location"],
#               'description': request.data["description"],
#               'start': {
#
#                 'dateTime': request.data["dateTime_start"],
#                 'timeZone': "America/New_York",
#               },
#               'end': {
#                 'dateTime': request.data["dateTime_end"],
#                 'timeZone': "America/New_York",
#               },
#               'attendees': [
#                 {
#                     'displayName' : request.data["attendee_name"],
#                     'comment': request.data["attendee_comment"],
#                     'email': request.data["attendee_email"],
#                 },
#               ],
#             }
#             # import pdb; pdb.set_trace()
#              # generate a google calendar event
#             maxAttendees = 5
#             sendNotification = True
#             sendUpdate = 'all'
#             supportsAttachments= False
#
#             response = service.events().insert(
#                 calendarId=calendar_id_rentabob,
#                 maxAttendees=maxAttendees,
#                 sendNotifications=sendNotification,
#                 sendUpdates=sendUpdate,
#                 supportsAttachments=supportsAttachments,
#                 body=event_request_body
#             ).execute()
#
#             print(response)
#             eventId =(response['id'])
#
#
#             return Response(response)
            # print(event_request_body)
            # serializer = EventsSerializer(data=request.data)
            # serializer.is_valid()
            # serializer.save()
            # return Response(serializer.data, status=status.HTTP_201_CREATED)

         # generate a google calendar event
            # maxAttendees = 5
            # sendNotification = True
            # sendUpdate = 'all'
            # supportsAttachments= False
            #
            # response = service.events().insert(
            #     calendarId=calendar_id_rentabob,
            #     maxAttendees=maxAttendees,
            #     sendNotifications=sendNotification,
            #     sendUpdates=sendUpdate,
            #     supportsAttachments=supportsAttachments,
            #     body=event_request_body
            # ).execute()
            #
            # print(response)
            # eventId =(response['id'])
            #
            # return Response(response)

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
        'dateTime': '2021-04-03T07:00:00',
        'timeZone': 'America/Los_Angeles',
      },
      'end': {
        'dateTime': '2021-04-03T09:00:00',
        'timeZone': 'America/Los_Angeles',
      },
      'attendees': [
        # {
        #     'displayName' : 'Bob',
        #     'comment': 'testing this event sender',
        #     'email': 'rentabob@live.com'
        # },
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
