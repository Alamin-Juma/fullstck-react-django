from django.db import models

class MyuSers(models.Model):
    firstname = models.CharField(max_length=255)
    secondname = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    phone = models.CharField(max_length=255)
    age = models.CharField(max_length=255)

    def __str__(self):
        return self.firstname + ' ' + self.secondname + ' ' + ' ' + self.email + ' ' + self.phone
