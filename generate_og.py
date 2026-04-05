import sys
from PIL import Image, ImageFilter, ImageDraw

def create_og_image(input_path, output_path):
    try:
        # Load original image
        img = Image.open(input_path).convert("RGB")
        
        # Target OG image size
        bg_w, bg_h = 1200, 630
        
        # Create background
        # Let's crop/resize original image to fill 1200x630 and blur it a lot
        bg = img.copy()
        
        # calculate ratio to fill
        ratio_w = bg_w / bg.width
        ratio_h = bg_h / bg.height
        fill_ratio = max(ratio_w, ratio_h)
        
        new_w = int(bg.width * fill_ratio)
        new_h = int(bg.height * fill_ratio)
        
        bg = bg.resize((new_w, new_h), Image.Resampling.LANCZOS)
        
        # crop to exactly 1200x630
        left = (bg.width - bg_w) / 2
        top = (bg.height - bg_h) / 2
        right = left + bg_w
        bottom = top + bg_h
        bg = bg.crop((left, top, right, bottom))
        
        # Heavy blur, and darken it a bit
        bg = bg.filter(ImageFilter.GaussianBlur(radius=30))
        darkness = Image.new("RGB", (bg_w, bg_h), (5, 6, 10))
        # blend 60% darkness over the blur
        bg = Image.blend(bg, darkness, 0.70)
        
        # Now fit the actual image in the center so it doesn't crop
        img_ratio = min(bg_w / img.width, bg_h / img.height)
        # multiply by 0.95 to give a little padding top/bottom
        img_ratio *= 0.95 
        
        fit_w = int(img.width * img_ratio)
        fit_h = int(img.height * img_ratio)
        
        foreground = img.resize((fit_w, fit_h), Image.Resampling.LANCZOS)
        
        # Paste foreground into the exact center of background
        offset_x = (bg_w - fit_w) // 2
        offset_y = (bg_h - fit_h) // 2
        
        bg.paste(foreground, (offset_x, offset_y))
        
        # Save output
        bg.save(output_path, "JPEG", quality=85)
        print("Success!")
        
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    create_og_image('public/images/media-buyer-hero.png', 'public/images/og-image.jpg')
