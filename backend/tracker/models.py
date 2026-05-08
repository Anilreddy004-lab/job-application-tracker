from django.db import models

class Job(models.Model):
    STATUS_CHOICES = [
        ('Applied', 'Applied'),
        ('Interview', 'Interview'),
        ('Rejected', 'Rejected'),
        ('Selected', 'Selected'),
    ]

    company = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    date = models.DateField()
    notes = models.TextField(blank=True)

    def __str__(self):
        return self.company