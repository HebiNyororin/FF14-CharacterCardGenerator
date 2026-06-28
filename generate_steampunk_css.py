import urllib.parse

cog = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' width='32' height='32'><path fill='#c5a059' d='M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z'/></svg>"
wrench = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' width='30' height='30'><path fill='#b87333' d='M507.73 109.1c-2.24-9.03-13.54-12.09-20.12-5.51l-74.36 74.36-67.88-11.31-11.31-67.88 74.36-74.36c6.62-6.62 3.43-17.9-5.66-20.16-47.38-11.74-99.55.91-136.58 37.93-39.64 39.64-50.55 97.1-34.05 147.2L18.74 402.76c-24.99 24.99-24.99 65.51 0 90.5 24.99 24.99 65.51 24.99 90.5 0l213.21-213.21c50.12 16.71 107.47 5.68 147.37-34.22 37.07-37.07 49.7-89.32 37.91-136.73zM64 472c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24z'/></svg>"
bolt = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512' width='20' height='30'><path fill='#b87333' d='M296 160H180.6l42.6-129.8C227.2 15 215.7 0 200 0H56C44 0 33.8 8.9 32.2 20.8l-32 240C-1.7 275.2 9.5 288 24 288h118.7L96.6 482.5c-3.6 15.2 8 29.5 23.3 29.5 8.4 0 16.4-4.4 20.8-12l176-304c9.3-15.9-2.2-36-20.7-36z'/></svg>"
clock = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' width='32' height='32'><path fill='#777777' d='M256,8C119,8,8,119,8,256S119,504,256,504,504,393,504,256,393,8,256,8Zm92.49,313h0l-20,25a16,16,0,0,1-22.49,2.5h0l-67-49.72a40,40,0,0,1-15-31.23V112a16,16,0,0,1,16-16h32a16,16,0,0,1,16,16V256l58,42.5A16,16,0,0,1,348.49,321Z'/></svg>"

def enc(svg):
    return "url(\"data:image/svg+xml," + urllib.parse.quote(svg) + "\")"

css = f"""
/* === CSS Steampunk 1: Brass Gear === */
.card.deco-css-steampunk-1 {{
  border: 4px solid #4a3b2c !important;
  box-shadow: inset 0 0 0 2px #b89947, inset 0 0 0 6px #4a3b2c, 0 8px 25px rgba(0,0,0,0.4) !important;
  position: relative;
}}
.card.deco-css-steampunk-1::before {{
  content: '';
  position: absolute;
  inset: 10px;
  border: 1px dashed #b89947;
  pointer-events: none;
  z-index: 20;
}}
.card.deco-css-steampunk-1::after {{
  content: '';
  position: absolute;
  inset: 0;
  background-image: 
    {enc(cog)}, {enc(cog)}, {enc(cog)}, {enc(cog)};
  background-position: top 4px left 4px, top 4px right 4px, bottom 4px left 4px, bottom 4px right 4px;
  background-repeat: no-repeat;
  pointer-events: none;
  z-index: 20;
}}

/* === CSS Steampunk 2: Copper Pipe === */
.card.deco-css-steampunk-2 {{
  border: 8px solid #b87333 !important;
  border-radius: 16px !important;
  box-shadow: inset 0 0 15px rgba(0,0,0,0.5), inset 0 0 0 2px rgba(255,255,255,0.2) !important;
  position: relative;
}}
.card.deco-css-steampunk-2::before {{
  content: '';
  position: absolute;
  inset: 4px;
  border: 2px solid #5c3a21;
  border-radius: 8px;
  pointer-events: none;
  z-index: 20;
}}
.card.deco-css-steampunk-2::after {{
  content: '';
  position: absolute;
  inset: 0;
  background-image: 
    {enc(wrench)}, {enc(wrench)}, {enc(bolt)}, {enc(bolt)};
  background-position: top 6px left 6px, bottom 6px right 6px, top 6px right 10px, bottom 6px left 10px;
  background-repeat: no-repeat;
  pointer-events: none;
  z-index: 20;
}}

/* === CSS Steampunk 3: Iron Clockwork === */
.card.deco-css-steampunk-3 {{
  border: 6px solid #2f353b !important;
  box-shadow: inset 0 0 25px rgba(0,0,0,0.6) !important;
  position: relative;
}}
.card.deco-css-steampunk-3::before {{
  content: '';
  position: absolute;
  inset: 8px;
  border: 1px solid #777777;
  background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(119,119,119,0.1) 10px, rgba(119,119,119,0.1) 11px);
  pointer-events: none;
  z-index: 20;
}}
.card.deco-css-steampunk-3::after {{
  content: '';
  position: absolute;
  inset: 0;
  background-image: 
    {enc(clock)}, {enc(clock)}, {enc(clock)}, {enc(clock)};
  background-position: top 4px left 4px, top 4px right 4px, bottom 4px left 4px, bottom 4px right 4px;
  background-repeat: no-repeat;
  pointer-events: none;
  z-index: 20;
}}
"""
print(css)
