#!/usr/bin/env python3
"""Convert a Playwright WebM recording to a high-quality GIF.

Usage:
    python3 screenshots/gifs/convert_video_to_gif.py INPUT.webm OUTPUT.gif [--fps 10] [--width 1233]

Requires ffmpeg and gifski (brew install ffmpeg gifski).
"""

import argparse
import glob
import os
import subprocess
import sys
import tempfile


def convert(input_path, output_path, fps=10, width=1233):
    if not os.path.exists(input_path):
        print(f"Error: {input_path} not found")
        sys.exit(1)

    with tempfile.TemporaryDirectory() as tmp_dir:
        frame_pattern = os.path.join(tmp_dir, "frame%04d.png")

        # Extract frames
        print(f"Extracting frames at {fps} fps...")
        subprocess.run(
            ["ffmpeg", "-y", "-i", input_path, "-vf", f"fps={fps}", frame_pattern],
            check=True,
            capture_output=True,
        )

        frames = sorted(glob.glob(os.path.join(tmp_dir, "frame*.png")))
        print(f"Extracted {len(frames)} frames")

        # Encode GIF
        print(f"Encoding GIF at {width}px wide...")
        subprocess.run(
            [
                "gifski",
                "--fps", str(fps),
                "--width", str(width),
                "-o", output_path,
                *frames,
            ],
            check=True,
            capture_output=True,
        )

    size_mb = os.path.getsize(output_path) / (1024 * 1024)
    print(f"Saved {output_path} ({size_mb:.1f} MB)")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Convert WebM to GIF")
    parser.add_argument("input", help="Input WebM file")
    parser.add_argument("output", help="Output GIF file")
    parser.add_argument("--fps", type=int, default=10, help="Frames per second (default: 10)")
    parser.add_argument("--width", type=int, default=1233, help="Output width in pixels (default: 1233)")
    args = parser.parse_args()
    convert(args.input, args.output, args.fps, args.width)
