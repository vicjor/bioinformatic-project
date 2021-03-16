from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ViewSet
import requests
from math import log2
from rest_framework.decorators import api_view

# Create your views here.


@api_view(http_method_names=["GET"])
def matrices(request):
    response = requests.get(
        'http://jaspar.genereg.net/api/v1/matrix?page_size=3141')
    matrices_data = response.json()['results']
    matrices_ids = [matrix['matrix_id'] for matrix in matrices_data]
    return Response({
        'matrices_ids': matrices_ids
    })


test_pfm = {
    "A": [3, 6, 1, 0, 0, 6, 7, 2, 1],
    "C": [2, 2, 1, 0, 0, 2, 1, 1, 2],
    "G": [1, 1, 7, 10, 0, 1, 1, 5, 1],
    "T": [4, 1, 1, 0, 10, 1, 1, 2, 6]
}


@api_view(http_method_names=["GET"])
def get_pwm(request, matrix_id="PF0144.1"):
    """
    param: matrix_id as input to API at /get_pwm/<matrix_id>
    returns a PWM (Position Weight matrix)

    First fetches the PFM (Position Frequency Matrix) from Jaspar.
    Then calculates PPM (Position Probability Matrix) based on PFM
    Finally, use the PPM to calculate the PWM
    """

    response = requests.get(
        'http://jaspar.genereg.net/api/v1/matrix/{}'.format(matrix_id))

    matrix = response.json()

    # Get PFM from Jaspar response
    pfm = matrix["pfm"]

    # pfm = test_pfm

    # Turn PFM into PPM
    ppm = pfm_to_ppm(pfm)
    pwm = ppm_to_pwm(ppm)

    return Response({"pwm": pwm})


def pfm_to_ppm(pfm):
    """
    param pfm: Position Frequency Matrix
    returns: PPM (Position Probability Matrix)
    """

    A = pfm["A"]
    C = pfm["C"]
    G = pfm["G"]
    T = pfm["T"]

    cols = [[] for col in A]

    for i in range(len(A)):
        cols[i] = sum([A[i], C[i], T[i], G[i]])

    A_pwm = []
    C_pwm = []
    G_pwm = []
    T_pwm = []
    ppm = [A_pwm, C_pwm, G_pwm, T_pwm]

    for i in range(len(A)):
        ppm[0].append(A[i]/cols[i])
        ppm[1].append(C[i]/cols[i])
        ppm[2].append(G[i]/cols[i])
        ppm[3].append(T[i]/cols[i])

    return ppm


def ppm_to_pwm(ppm, bm=0.25):
    """
    param ppm: Position Probability Matrix
    param bm: Background model. Simplest model assumes each letter appears equally frequent in alphabet. 0.25 for nucleotides and 0.05 for amino acids.
    returns: PWM (Position Weight Matrix)
    """
    pwm = {"A": [], "C": [], "G": [], "T": []}

    A_ppm = ppm[0]
    C_ppm = ppm[1]
    G_ppm = ppm[2]
    T_ppm = ppm[3]

    for i in range(len(A_ppm)):
        if A_ppm[i] == 0:
            A_pwm = '-inf'
        else:
            A_pwm = log2(A_ppm[i]/bm)
        if C_ppm[i] == 0:
            C_pwm = '-inf'
        else:
            C_pwm = log2(C_ppm[i]/bm)
        if G_ppm[i] == 0:
            G_pwm = '-inf'
        else:
            G_pwm = log2(G_ppm[i]/bm)
        if T_ppm[i] == 0:
            T_pwm = '-inf'
        else:
            T_pwm = log2(T_ppm[i]/bm)

        pwm["A"].append(A_pwm)
        pwm["C"].append(C_pwm)
        pwm["G"].append(G_pwm)
        pwm["T"].append(T_pwm)

    return pwm
