from django.contrib import admin

# Register your models here.  here the model data objects are stored in admin pannel , so no need of SQL

from .models import *   # imported name file

admin.site.register(Name)     # registring all the objected which will be created by the Name model to admin pannel

admin.site.register(TestingAccount)

admin.site.register(Vanribality)