from django.conf.urls import url
from . import views
from django.urls import path

urlpatterns = [
    # path('cal/', views.build_service),
    # path('cal/', quickstart.main),
    path('create/',  views.create_event),
    path('', views.ListEvents.as_view())
]
