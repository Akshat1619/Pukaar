# pylint:disable=E1101

from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TaskSerializers, SearchSerializers
from .models import Task, Search
from .scraping import Scrape
import threading


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all().order_by('-date_created')
    serializer_class = TaskSerializers


class SearchViewSet(viewsets.ModelViewSet):
    queryset = Search.objects.all().order_by('-date_created')
    serializer_class = SearchSerializers
    scrape = Scrape(str(queryset[0].search))
    print(queryset[0])
    scrape.start_scrape()


