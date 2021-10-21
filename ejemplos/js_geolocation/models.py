from django.db import models

class Location(models.Model):
    lat = models.FloatField()
    lon = models.FloatField()
    date_obtained = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.lat) + ", " + str(self.lon)