from typing import List
from ninja import Router 
import helpers

from ninja_jwt.authentication import JWTAuth 
from django.shortcuts import get_object_or_404

from .models import WaitlistEntry
from .schemas import WaitlistEntryListSchema, WaitlistEntryDetailsSchema, WaitlistEntryCreateSchema

router = Router()

# /api/waitlists
@router.get("", response=List[WaitlistEntryListSchema], auth=helpers.api_auth_user_required)
def list_waitlist_entries(request):
  qs = WaitlistEntry.objects.filter(user=request.user)
  return qs

# /api/waitlists
@router.post("", response=WaitlistEntryDetailsSchema,auth=helpers.api_auth_user_or_anonymous)
def create_waitlist_entry(request, data:WaitlistEntryCreateSchema):
  obj = WaitlistEntry(**data.dict())
  
  # Prevents error for anonymous user & gives a USER
  if request.user.is_authenticated:
    obj.user = request.user
  obj.save()
  return obj

@router.get("{entry_id}/", response=WaitlistEntryDetailsSchema ,auth=helpers.api_auth_user_required)
def get_waitlist_entry(request, entry_id: int):
  obj = get_object_or_404(WaitlistEntry, id=entry_id, user=request.user)
  return obj
