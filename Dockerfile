FROM python:3.11-slim AS builder
WORKDIR /app

RUN python -m venv .venv
# Use the backend requirements specifically
COPY backend/requirements.txt ./
RUN .venv/bin/pip install --no-cache-dir -r requirements.txt

FROM python:3.11-slim
# Set WORKDIR to backend to match local working env
WORKDIR /app/backend

COPY --from=builder /app/.venv /app/.venv/
# Copy everything to /app first, then we are already in /app/backend
COPY . /app/

CMD ["/app/.venv/bin/uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]
