from django.urls import path
from sonicspeed_app.views import transcribe_audio 


urlpatterns=[
  # path('',home,name='home'),
  path('',transcribe_audio,name='translation')
]