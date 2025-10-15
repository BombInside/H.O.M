from fastapi import FastAPI
app=FastAPI(title='HOM API')
@app.get('/api/health')
def health(): return {'ok':True}

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="H.O.M — History Of Machines API",
    description="Backend service for managing machine maintenance records.",
    version="0.4"
)

# Разрешаем запросы с фронтенда
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    return {"ok": True, "status": "Backend API is running!"}

@app.get("/")
def root():
    return {"message": "Welcome to H.O.M backend"}
