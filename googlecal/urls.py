from django.conf.urls import url
from . import views
from django.urls import path

app_name = "event"
urlpatterns = [
    # path('cal/', views.build_service),
    path('list/', views.EventsListView.as_view()),
    path('edit/<int:pk>/', views.EventsDetailView.as_view()),
    path('create/',  views.create_event),
    path('', views.ListEvents.as_view())
]
