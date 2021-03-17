from django.urls import path
from . import views

app_name = 'clients'
urlpatterns = [
    path('', views.ClientsListView.as_view()),
    path('match/', views.ListClients.as_view()),
    path('<int:pk>/', views.ClientsDetailView.as_view()),
    ]
