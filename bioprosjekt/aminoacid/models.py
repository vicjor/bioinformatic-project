from typing import Sequence
from django.db import models

# Create your models here.


class AminoAcid(models.Model):
    EUKARYA = "EUK"
    NEGATIVE = "NEG"
    POSITIVE = "POS"
    ARCHAEA = "ARC"

    Kingdoms = [(EUKARYA, "EUKARYA"),
                (NEGATIVE, "NEGATIVE"),
                (POSITIVE, "POSITIVE"),
                (ARCHAEA, "ARCHAEA")]

    uniprot = models.CharField(
        unique=True, null=False, blank=False, max_length=6)
    kingdom = models.CharField(
        choices=Kingdoms, null=False, blank=False, max_length=10)
    type = models.CharField(null=False, blank=False, max_length=10)
    partition_number = models.IntegerField(
        null=False, blank=False)
    sequence = models.CharField(null=False, blank=False, max_length=140)

    def __str__(self) -> None:
        return "Uniprot: {} Kingdom: {} Type: {} PartitionNumber: Sequence :{}".format(self.uniprot, self.kingdom, self.type, self.partition_number, self.sequence)
