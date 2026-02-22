#!/usr/bin/env python3
"""Record: enabling GitHub Pages with GitHub Actions source.

This demonstrates the Playwright GIF recording pattern. Adapt for other
multi-step interactions by changing the interaction section.

Prerequisites:
    - GitHub auth: shot-scraper auth https://github.com screenshots/github-auth.json
    - ffmpeg and gifski installed

Usage:
    cd telar-docs
    python3 screenshots/gifs/record_github_pages_setup.py

Output:
    images/github-actions.gif
"""

from playwright.sync_api import sync_playwright
import subprocess
import sys
import time

# --- Configuration ---
OUTPUT_GIF = "images/github-actions.gif"
VIEWPORT = {"width": 1233, "height": 713}
SCALE = 2
FPS = 10
AUTH_FILE = "screenshots/github-auth.json"
# Replace with actual repo URL when recording
REPO_URL = "https://github.com/UCSB-AMPLab/telar"


def record():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)  # visible for auth

        # Load auth if available
        context_args = {
            "viewport": VIEWPORT,
            "device_scale_factor": SCALE,
            "record_video_dir": "screenshots/gifs/_tmp_video/",
            "record_video_size": VIEWPORT,
        }

        import os
        if os.path.exists(AUTH_FILE):
            context_args["storage_state"] = AUTH_FILE

        context = browser.new_context(**context_args)
        page = context.new_page()

        # --- Interaction starts ---
        # Navigate to repo Settings > Pages
        page.goto(f"{REPO_URL}/settings/pages")
        time.sleep(2)

        # Click the Source dropdown
        # (Adapt selectors to match current GitHub UI)
        source_dropdown = page.locator("text=Deploy from a branch").first
        if source_dropdown.is_visible():
            source_dropdown.click()
            time.sleep(1)

        # Select GitHub Actions
        actions_option = page.locator("text=GitHub Actions").first
        if actions_option.is_visible():
            actions_option.click()
            time.sleep(2)

        # Pause to show the result
        time.sleep(2)
        # --- Interaction ends ---

        context.close()
        video_path = page.video.path()
        browser.close()
        return video_path


def convert_to_gif(video_path):
    subprocess.run(
        [
            sys.executable,
            "screenshots/gifs/convert_video_to_gif.py",
            video_path,
            OUTPUT_GIF,
            "--fps", str(FPS),
            "--width", str(VIEWPORT["width"]),
        ],
        check=True,
    )


if __name__ == "__main__":
    print("Recording interaction...")
    video = record()
    print(f"Video saved to {video}")
    print("Converting to GIF...")
    convert_to_gif(video)
    print(f"Done: {OUTPUT_GIF}")
