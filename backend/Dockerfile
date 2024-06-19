# Dockerfile

FROM python:3.8-slim

WORKDIR /app

COPY requirements.txt /app/

COPY . /app/

RUN pip install -r requirements.txt && \
    mkdir -p /app/media/

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
