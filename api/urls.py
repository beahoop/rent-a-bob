from django.urls import path, include

app_name = "api_v1"

urlpatterns = [
    path('', include('jobs.urls', namespace='jobs')),
    path('clients/', include('clients.urls', namespace='clients')),
]
