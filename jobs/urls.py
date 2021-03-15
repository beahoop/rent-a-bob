from django.urls import path
from . import views

app_name = 'jobs'
urlpatterns = [
    path('', views.JobsListView.as_view()),
    path('note/', views.NotesListView.as_view()),
    path('note/edit/<int:pk>', views.NotesDetailView.as_view()),
]
