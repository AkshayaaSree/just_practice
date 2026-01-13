from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from recommender import recommend_places

app = FastAPI(title="MoodSpace API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/recommend")
def get_recommendations(
    mood: str,
    area: str,
    categories: str | None = None
):
    return recommend_places(mood, area, categories)

