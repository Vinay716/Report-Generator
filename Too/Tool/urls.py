from django.urls import path
from .views import *

urlpatterns = [
    path('', home_view, name='home'),
   # path('',index, name='index'),
    path('form1/', form1_view, name='form1'),
    path('form2/', form2_view, name='form2'),
    path('form3/', form3_view, name='form3'),
    path('vanribality/', vanribality_list, name='vanribality_list'),
    path('summary/', summary_view, name='summary'),
]

# 7249912241  ID