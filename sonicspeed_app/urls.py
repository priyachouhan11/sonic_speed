from django.urls import path
from sonicspeed_app.views import home


urlpatterns=[
  path('',home),
]