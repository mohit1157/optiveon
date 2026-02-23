FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt \
    && pip install --no-cache-dir fastapi uvicorn

COPY tradebot /app/tradebot
COPY api_server.py /app/api_server.py
COPY .env.example /app/.env.example

ENV PYTHONPATH=/app

# Expose the API port
EXPOSE 8001

# Run the FastAPI wrapper (which manages the bot subprocess)
CMD ["python", "-m", "uvicorn", "api_server:app", "--host", "0.0.0.0", "--port", "8001"]
