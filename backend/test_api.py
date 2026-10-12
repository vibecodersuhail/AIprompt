"""
Test script for AI Prompt Generator FastAPI Backend.
Uses TestClient to verify all API endpoints.
"""

import sys
sys.path.insert(0, "backend")

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_api():
    print("=" * 80)
    print("TESTING FASTAPI BACKEND ENDPOINTS")
    print("=" * 80)

    # 1. Health check
    res_health = client.get("/api/health")
    assert res_health.status_code == 200, f"Health check failed: {res_health.text}"
    health_data = res_health.json()
    print("[TEST 1] /api/health -> SUCCESS:", health_data)
    assert health_data["model_loaded"] is True

    # 2. Categories
    res_cats = client.get("/api/categories")
    assert res_cats.status_code == 200
    cats_data = res_cats.json()
    print(f"[TEST 2] /api/categories -> SUCCESS: Retrieved {len(cats_data)} categories:")
    for c in cats_data:
        print(f"  * {c['name']}")
    assert len(cats_data) == 5

    # 3. Model Info
    res_info = client.get("/api/model-info")
    assert res_info.status_code == 200
    info_data = res_info.json()
    print(f"[TEST 3] /api/model-info -> SUCCESS:")
    print(f"  - Model Name: {info_data['model_name']}")
    print(f"  - Accuracy  : {info_data['test_accuracy'] * 100:.2f}%")
    print(f"  - Macro F1  : {info_data['test_macro_f1'] * 100:.2f}%")
    print(f"  - Classes   : {info_data['classes']}")

    # 4. Predict Intent & Generate Prompt for each of the 5 intents
    test_cases = [
        ("Write a Python script to implement an LRU Cache with O(1) operations", "Coding"),
        ("Write an inspirational speech about overcoming failure for graduating seniors", "Writing"),
        ("Explain quantum superposition and Schrödinger's cat in simple terms", "Education"),
        ("A photorealistic portrait of an old astronaut on Mars, volumetric sunset light, 85mm lens --ar 16:9", "Image Generation"),
        ("Perform exploratory data analysis on a customer churn dataset in pandas and plot correlation matrix", "Data Analysis"),
    ]

    print("\n[TEST 4] Testing /api/generate-prompt across all 5 categories:")
    for prompt, expected_intent in test_cases:
        payload = {"prompt": prompt}
        res_gen = client.post("/api/generate-prompt", json=payload)
        assert res_gen.status_code == 200, f"Generate failed for {prompt}: {res_gen.text}"
        data = res_gen.json()
        print(f"\n  Query: {prompt[:60]}...")
        print(f"  -> Detected Intent : {data['detected_intent']}")
        print(f"  -> Confidence Score: {data['confidence'] * 100:.2f}%")
        print(f"  -> Refined Prompt  : {data['refined_prompt'][:100]}...")
        print(f"  -> Latency         : {data['processing_time_ms']} ms")
        assert len(data["refined_prompt"]) > 50
        assert data["structured_breakdown"]["persona"] != ""

    # 5. Test Intent Override
    print("\n[TEST 5] Testing Intent Override feature:")
    payload_override = {
        "prompt": "write a python function to scrape a website",
        "override_intent": "Writing"
    }
    res_ov = client.post("/api/generate-prompt", json=payload_override)
    assert res_ov.status_code == 200
    ov_data = res_ov.json()
    print(f"  Detected Intent : {ov_data['detected_intent']}")
    print(f"  Applied Intent  : {ov_data['applied_intent']}")
    print(f"  Is Overridden   : {ov_data['is_overridden']}")
    assert ov_data["is_overridden"] is True
    assert ov_data["applied_intent"] == "Writing"

    print("\n" + "=" * 80)
    print("ALL BACKEND ENDPOINTS PASSED SUCCESSFULLY!")
    print("=" * 80)


if __name__ == "__main__":
    test_api()
