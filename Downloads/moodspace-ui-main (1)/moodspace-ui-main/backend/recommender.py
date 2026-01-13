import pandas as pd

df = pd.read_csv("places.csv")

def recommend_places(mood, area, categories=None, limit=6):
    filtered = df[
        df["area"].str.contains(area, case=False) &
        df["mood_tags"].str.contains(mood, case=False)
    ]

    if categories:
        filtered = filtered[filtered["category"].isin(categories.split(","))]

    results = (
        filtered.sort_values(by="rating", ascending=False)
        .head(limit)
        .rename(columns={"avg_cost": "averageCost"})
    )

    return results.to_dict(orient="records")

