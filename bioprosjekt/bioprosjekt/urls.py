"""bioprosjekt URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from rest_framework.response import Response
from django.urls import include, path
from rest_framework import routers
from rest_framework.decorators import api_view
from bioprosjekt.jaspar import views as jaspar_views

router = routers.DefaultRouter()


@api_view(http_method_names=["GET"])
def root_view(request):
    return Response("Try /matrices or /score/<matrix_id>?sequence=<DNA-sequence>")


urlpatterns = [
    path("", root_view, name="root"),
    path('admin/', admin.site.urls),
    path("matrices", jaspar_views.matrices, name="matrices"),
    path("score/<matrix_id>", jaspar_views.get_score, name="score")
]
