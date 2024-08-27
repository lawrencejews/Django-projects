from ninja_jwt.authentication import JWTAuth 

def allow_anonymous_user(request):
  if not request.user.is_authenticated:
    return True

api_auth_user_required = [JWTAuth()]
api_auth_user_or_anonymous = [JWTAuth(), allow_anonymous_user]