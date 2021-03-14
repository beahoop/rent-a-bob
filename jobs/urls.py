from django.urls import path
from . import views

app_name = 'jobs'
urlpatterns = [
    path('', views.JobsListView.as_view()),

]
