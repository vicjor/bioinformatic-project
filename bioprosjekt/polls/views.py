from django.http.response import HttpResponse
from django.shortcuts import render
import os
# Create your views here.


def index(request):
    with open(os.getenv("PWD")+"/../data/train_set.fasta") as f:
        a = f.readlines()

        lst = []
        for line in a:
            lst.append(line)

    return HttpResponse(lst)
