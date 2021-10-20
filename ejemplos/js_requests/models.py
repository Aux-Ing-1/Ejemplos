from django.db import models

class TextData(models.Model):
    text = models.CharField(max_length=128)

    def __str__(self):
        return str(self.text)