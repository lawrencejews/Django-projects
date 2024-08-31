from typing import List, Any
from ninja import Router 
import helpers
import json

from  .forms import WaitlistEntryCreateForm
from ninja_jwt.authentication import JWTAuth 
from django.shortcuts import get_object_or_404

from .models import WaitlistEntry
from .schemas import (WaitlistEntryListSchema, 
                      WaitlistEntryDetailsSchema, 
                      WaitlistEntryCreateSchema,
                      ErrorWaitlistEntryCreateSchema,
                      WaitlistEntryUpdateSchema
                      )

router = Router()

# /api/waitlists
@router.get("", response=List[WaitlistEntryListSchema], auth=helpers.api_auth_user_required)
def list_waitlist_entries(request):
  qs = WaitlistEntry.objects.filter(user=request.user)
  return qs

# /api/waitlists
@router.post("", response={
  201: WaitlistEntryDetailsSchema,
  400: ErrorWaitlistEntryCreateSchema
},
  auth=helpers.api_auth_user_or_anonymous
)
def create_waitlist_entry(request, data:WaitlistEntryCreateSchema):
  form = WaitlistEntryCreateForm(data.dict())
  if not form.is_valid():
    #clean_data = form.cleaned_data
    #obj = WaitlistEntry(**cleaned_data.dict())
    
    form_errors = json.loads (form.errors.as_json())
    return 400, form_errors
  obj = form.save(commit=False)
    
    # Prevents error for anonymous user & gives a USER
  if request.user.is_authenticated:
    obj.user = request.user
  obj.save()
      
  return 201, obj

@router.get("{entry_id}/", response=WaitlistEntryDetailsSchema, auth=helpers.api_auth_user_required)
def get_waitlist_entry(request, entry_id: int):
  obj = get_object_or_404(
    WaitlistEntry, 
    id=entry_id, 
    user=request.user)
  return obj

@router.put("{entry_id}/", response=WaitlistEntryDetailsSchema, auth=helpers.api_auth_user_required)
def update_wailist_entry(request, 
    entry_id:int, 
    payload:WaitlistEntryUpdateSchema
    ):
    obj = get_object_or_404(
        WaitlistEntry, 
        id=entry_id,
        user=request.user)
    payload_dict = payload.dict()
    for k,v in payload_dict.items():
        setattr(obj, k, v)
    obj.save()
    return obj

# http DELETE
@router.delete("{entry_id}/delete/", response=WaitlistEntryDetailsSchema, auth=helpers.api_auth_user_required)
def delete_wailist_entry(request, entry_id:int):
    obj = get_object_or_404(
        WaitlistEntry, 
        id=entry_id,
        user=request.user)
    obj.delete()
    return obj
