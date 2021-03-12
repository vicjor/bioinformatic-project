from django.http import JsonResponse
from rest_framework.relations import HyperlinkedIdentityField
from .models import *
from rest_framework import serializers


class AminoAcidSerializer(serializers.ModelSerializer):

    class Meta:
        model = AminoAcid
        fields = '__all__'

    # def get_maintenance_strategy_name(self, instance):
    #     return instance.maintenance_strategy.name
