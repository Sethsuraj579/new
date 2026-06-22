from django.db import models

class Enquiry(models.Model):
    COURSE_CHOICES = [
        ('dhtm', 'Diploma in Hospitality and Tourism Management'),
        ('dbm', 'Diploma in Business Management'),
        ('dcsm', 'Diploma in Chain and Supply Management'),
        ('adhtm', 'Advanced Diploma in Hospitality and Tourism Management'),
        ('adbm', 'Advanced Diploma in Business Management'),
        ('adcsm', 'Advanced Diploma in Chain and Supply Management'),
    ]

    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    course = models.CharField(max_length=10, choices=COURSE_CHOICES)
    message = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.course}"