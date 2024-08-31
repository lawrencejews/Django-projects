from typing import List, Any, Optional
from ninja import Schema 
from datetime import datetime
from pydantic import EmailStr

class WaitlistEntryCreateSchema(Schema):
  # Create -> Data
  # WaitlistEntryIn
  email: EmailStr
  
class ErrorWaitlistEntryCreateSchema(Schema):
  email: List[Any]
  #non_field_errors : List[dict] = []
  
class WaitlistEntryListSchema(Schema):
  # Create -> Data
  # WaitlistEntryIn
  id: int
  email: EmailStr
  updated: datetime
  timestamp: datetime
  description: Optional[str] = ""
  
class WaitlistEntryDetailsSchema(Schema):
  # Get -> Data
  # WaitlistEntryOut
  id: int
  email: EmailStr
  updated: datetime
  timestamp: datetime
  description: Optional[str] = ""
  
  
class WaitlistEntryUpdateSchema(Schema):
    # Put -> Data
    # WaitlistEntryOut
    # id: int
    description: str = ""
