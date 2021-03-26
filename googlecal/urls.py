from django.conf.urls import url
from . import second
from django.urls import path

urlpatterns = [
    # path('cal/', views.build_service),
    # path('cal/', quickstart.main),
    path('create/',  second.create_event),
]
