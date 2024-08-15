# NextJS-Django-Backend

## Project Dependencies
- Create a virtual-env `python3 -m venv venv`
- Activate your environment `source ./venv/bin/activate`
- Check the project working Environment `env | grep ENV`
- Install package `pip3 install django` and `pip3 install django-ninja`
- Create a requirements.txt `pip3 freeze > requirements.txt`
- Django Admin used to automatically build a site area for the records ` django-admin startproject nexthome . ` i.e. `CREATE,VIEW, UPDATE, & DELETE`
- Create a project-model `python manage.py startapp waitlists`
- Set up project's run scripts with a rav file in the root folder `rav.yaml`
- `NOTE`: Django provides the various commands that are used to perform migration related tasks. 
- `makemigrations` : It is used to create a migration file that contains code for the tabled schema of a model.
- `migrate` : It creates table according to the schema defined in the migration file.
- `sqlmigrate` : It is used to show a raw SQL query of the applied migration.
- `showmigrations` : It lists out all the migrations and their status.
- Install Django JWT package `pip install django-ninja-jwt[crypto]` URL: `https://eadwincode.github.io/django-ninja-jwt/getting_started/`
- CORS handler for Django`python3 -m pip install django-cors-headers` and add it to app installed section plus it middleware in settings.py
- Add the CORS allowed origins 
```
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
```