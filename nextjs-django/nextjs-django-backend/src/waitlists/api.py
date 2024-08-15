from typing import List
from ninja import Router 

from ninja_jwt.authentication import JWTAuth 
from django.shortcuts import get_object_or_404

from .models import WaitlistEntry
from .schemas import WaitlistEntryListSchema, WaitlistEntryDetailsSchema

router = Router()

@router.get("", response=List[WaitlistEntryListSchema], auth=JWTAuth())
def list_waitlist_entries(request):
  qs = WaitlistEntry.objects.all()
  return qs

@router.get("{entry_id}/", response=WaitlistEntryDetailsSchema ,auth=JWTAuth())
def get_waitlist_entry(request, entry_id: int):
  obj = get_object_or_404(WaitlistEntry, id=entry_id)
  return obj
