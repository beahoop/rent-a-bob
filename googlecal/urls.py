from django.conf.urls import url
from . import views
from django.urls import path

app_name = "event"
urlpatterns = [
    # path('cal/', views.build_service),
    # path('redirect/', views.RedirectOauthView),
    # path('callback/', views.CallbackView),
    path('list/', views.EventsListView.as_view()),
    path('edit/<int:pk>/', views.EventsDetailView.as_view()),
    path('',  views.create_event),
    path('create/', views.ListEvents.as_view()),
]
