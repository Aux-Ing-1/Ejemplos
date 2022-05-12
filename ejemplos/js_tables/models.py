from django.db import models

# Create your models here.
class Movie(models.Model):
    name = models.CharField(max_length=128)
    year = models.IntegerField()
    rating = models.FloatField()

    def __str__(self):
        return self.name + ' (' + self.year + ')'
