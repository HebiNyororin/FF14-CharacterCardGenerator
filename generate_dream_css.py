import urllib.parse

star = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512' width='24' height='24'><path fill='rgba(255, 215, 0, 0.9)' d='M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z'/></svg>"
magic = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' width='24' height='24'><path fill='rgba(255, 215, 0, 0.9)' d='M224 96l16-32 32-16-32-16-16-32-16 32-32 16 32 16 16 32zM80 160l26.66-53.33L160 80l-53.34-26.67L80 0 53.34 53.33 0 80l53.34 26.67L80 160zm352 128l-26.66 53.33L352 368l53.34 26.67L432 448l26.66-53.33L512 368l-53.34-26.67L432 288zm70.62-193.77L417.77 9.38C411.53 3.12 403.34 0 395.15 0c-8.19 0-16.38 3.12-22.63 9.38L9.38 372.52c-12.5 12.5-12.5 32.76 0 45.25l84.85 84.85c6.25 6.25 14.44 9.37 22.62 9.37 8.19 0 16.38-3.12 22.63-9.37l363.14-363.15c12.5-12.48 12.5-32.75 0-45.24zM359.45 203.46l-50.91-50.91 86.6-86.6 50.91 50.91-86.6 86.6z'/></svg>"

heart = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' width='24' height='24'><path fill='rgba(255, 105, 180, 0.8)' d='M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z'/></svg>"
feather = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' width='24' height='24'><path fill='rgba(255, 105, 180, 0.8)' d='M467.14 44.84c-62.55-62.48-161.67-64.78-252.28 25.73-78.61 78.52-60.98 60.92-85.75 85.66-60.46 60.39-70.39 150.83-63.64 211.17l178.44-178.25c6.26-6.25 16.4-6.25 22.65 0s6.25 16.38 0 22.63L7.04 471.03c-9.38 9.37-9.38 24.57 0 33.94 9.38 9.37 24.6 9.37 33.98 0l66.1-66.03C159.42 454.65 279 457.11 353.95 384h-98.19l147.57-49.14c49.99-49.93 36.38-36.18 46.31-46.86h-97.78l131.54-43.8c45.44-74.46 34.31-148.84-16.26-199.36z'/></svg>"

moon = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' width='26' height='26'><path fill='rgba(173, 216, 230, 0.9)' d='M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z'/></svg>"
cloud = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 512' width='30' height='24'><path fill='rgba(173, 216, 230, 0.9)' d='M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4z'/></svg>"

def enc(svg):
    return "url(\"data:image/svg+xml," + urllib.parse.quote(svg) + "\")"

css = f"""
/* === CSS Dream 1: Stardust Memory === */
.card.deco-css-dream-1 {{
  border: 1px solid rgba(255, 215, 0, 0.6) !important;
  border-radius: 8px !important;
  box-shadow: 
    0 0 15px rgba(255, 215, 0, 0.3), 
    inset 0 0 25px rgba(255, 215, 0, 0.2), 
    inset 0 0 5px rgba(255, 255, 255, 0.5) !important;
  position: relative;
}}
.card.deco-css-dream-1::before {{
  content: '';
  position: absolute;
  inset: 6px;
  border: 1px dotted rgba(255, 215, 0, 0.8);
  border-radius: 4px;
  pointer-events: none;
  z-index: 20;
}}
.card.deco-css-dream-1::after {{
  content: '';
  position: absolute;
  inset: 0;
  background-image: 
    {enc(star)}, {enc(star)}, {enc(magic)}, {enc(magic)};
  background-position: top 2px left 2px, bottom 2px right 2px, top 2px right 2px, bottom 2px left 2px;
  background-repeat: no-repeat;
  pointer-events: none;
  z-index: 20;
}}

/* === CSS Dream 2: Fairy Blossom === */
.card.deco-css-dream-2 {{
  border: 4px solid rgba(255, 182, 193, 0.4) !important;
  border-radius: 20px !important;
  box-shadow: 
    0 0 20px rgba(255, 105, 180, 0.3), 
    inset 0 0 30px rgba(255, 182, 193, 0.4) !important;
  position: relative;
}}
.card.deco-css-dream-2::before {{
  content: '';
  position: absolute;
  inset: 0;
  border: 2px dashed rgba(255, 105, 180, 0.5);
  border-radius: 18px;
  pointer-events: none;
  z-index: 20;
}}
.card.deco-css-dream-2::after {{
  content: '';
  position: absolute;
  inset: 0;
  background-image: 
    {enc(heart)}, {enc(heart)}, {enc(feather)}, {enc(feather)};
  background-position: top 4px left 4px, bottom 4px right 4px, top 4px right 4px, bottom 4px left 4px;
  background-repeat: no-repeat;
  pointer-events: none;
  z-index: 20;
}}

/* === CSS Dream 3: Moonlight Cloud === */
.card.deco-css-dream-3 {{
  border: none !important;
  border-radius: 12px !important;
  box-shadow: 
    0 0 10px rgba(173, 216, 230, 0.5), 
    inset 0 0 40px rgba(135, 206, 250, 0.4), 
    inset 0 0 0 3px rgba(255, 255, 255, 0.6) !important;
  position: relative;
}}
.card.deco-css-dream-3::before {{
  content: '';
  position: absolute;
  inset: 5px;
  border: 1px solid rgba(173, 216, 230, 0.8);
  border-radius: 8px;
  pointer-events: none;
  z-index: 20;
}}
.card.deco-css-dream-3::after {{
  content: '';
  position: absolute;
  inset: 0;
  background-image: 
    {enc(moon)}, {enc(moon)}, {enc(cloud)}, {enc(cloud)};
  background-position: top 4px left 4px, bottom 4px right 4px, top 4px right 4px, bottom 6px left 4px;
  background-repeat: no-repeat;
  pointer-events: none;
  z-index: 20;
}}
"""
print(css)
