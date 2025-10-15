FROM python:3.12-slim

WORKDIR /app

# Скопируем зависимости и установим их
COPY requirements.txt /app/req.txt
RUN pip install --no-cache-dir -r /app/req.txt

# Скопируем весь код backend
COPY . /app

ENV MEDIA_ROOT=/app/media
EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
