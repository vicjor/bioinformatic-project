from django.http.response import HttpResponse
from django.shortcuts import render
from rest_framework import viewsets
import os
from .models import AminoAcid
from .serializers import AminoAcidSerializer
# Create your views here.


class AminoAcidViewSet(viewsets.ModelViewSet):
    queryset = AminoAcid.objects.all()
    serializer_class = AminoAcidSerializer


# def index(request):
#     queryset = AminoAcid.object.all()
#     with open(os.getenv("PWD")+"/data/train_set.fasta") as f:
#         a = f.readlines()

#         lst = []
#         for line in a:
#             lst.append(line)

#     return HttpResponse(lst)
