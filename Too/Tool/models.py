
from django.db import models

class Name(models.Model):
    name = models.CharField(max_length=255)   # models are like classes where we create object which have
       # data as in a table which we store in a data base


class TestingAccount(models.Model):
    user_type = models.CharField(max_length=100)
    user_id = models.CharField(max_length=100)
    password_sso = models.CharField(max_length=100)

    def __str__(self):
        return self.user_type
    
class Vanribality(models.Model):
    Vanribality = models.CharField(max_length=100)
    Risk = models.CharField(max_length=50)
    Discription = models.CharField(max_length=10000)
    Impace = models.CharField(max_length=10000)
    Recommendation = models.CharField(max_length=10000)

    # def __str__(self):
    #     return self.vanribality
