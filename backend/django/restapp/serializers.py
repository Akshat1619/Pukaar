from .models import Task, Search
from rest_framework import serializers


class TaskSerializers(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('id', 'task_name', 'task_desc')


class SearchSerializers(serializers.ModelSerializer):
    class Meta:
        model = Search
        fields = ('id', 'search')
