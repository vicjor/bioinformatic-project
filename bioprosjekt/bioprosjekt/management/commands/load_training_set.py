from os import EX_OSFILE
import os
from typing import Sequence
from django.core.management.base import BaseCommand
import csv
from collections import Counter

from aminoacid.models import AminoAcid


class Command(BaseCommand):
    help = "Import training data from file"

    def add_arguments(self, parser):
        parser.add_argument("--input_path", type=open)

    def handle(self, *args, **options):
        try:
            object_list = []
            training_set = options.pop("input_path")
            lines = training_set.readlines()
            count = 0
            for line in lines:
                if count == 0:
                    headers = line.split("|")

                    count += 1
                elif count == 1:
                    sequence_1 = line

                    count += 1
                elif count == 2:
                    sequence_2 = line

                    ac = AminoAcid.objects.create(
                        uniprot=headers[0], kingdom=headers[1], type=headers[2], partition_number=headers[3], sequence_1=sequence_1, sequence_2=sequence_2)
                    ac.save()
                    count = 0
                    object_list.append(ac)
            print(len(object_list))
        except Exception as e:
            print(e)
        return
