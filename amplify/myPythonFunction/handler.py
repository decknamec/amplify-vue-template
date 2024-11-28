from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum

app = FastAPI()

# CORS aktivieren (wichtig für die Kommunikation mit Nuxt)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://main.d3sa6211036fsg.amplifyapp.com"],  # URL des Nuxt-Projekts
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI!"}

handler = Mangum(app)
