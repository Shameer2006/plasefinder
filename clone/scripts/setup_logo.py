import os
import shutil

src_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../public/WhatsApp Image 2026-07-12 at 10.55.37 PM.jpeg"))
dest_logo = os.path.abspath(os.path.join(os.path.dirname(__file__), "../public/logo.png"))
dest_icon = os.path.abspath(os.path.join(os.path.dirname(__file__), "../src/app/icon.png"))

if not os.path.exists(src_path):
    print(f"Error: Source image not found at {src_path}")
    exit(1)

# Try to use Pillow for conversion to actual PNG format
try:
    from PIL import Image
    print("Pillow is installed. Converting and copying using PIL...")
    with Image.open(src_path) as img:
        img.save(dest_logo, "PNG")
        img.save(dest_icon, "PNG")
    print("Successfully converted and saved as PNG!")
except Exception as e:
    print(f"Pillow conversion failed or not installed ({e}). Falling back to simple file copy...")
    shutil.copy(src_path, dest_logo)
    shutil.copy(src_path, dest_icon)
    print("Successfully copied logo files directly!")
