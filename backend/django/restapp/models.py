from django.db import models


class Task(models.Model):
    task_name = models.CharField(max_length=200)
    task_desc = models.CharField(max_length=200)
    date_created = models.DateTimeField(auto_now=True)


class Search(models.Model):
    search = models.CharField(max_length=200)
    date_created = models.DateTimeField(auto_now=True)
