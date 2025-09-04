# Try saving DOCX again but resize images more efficiently to avoid timeout
from docx import Document
from docx.shared import Inches

img1_path = "1.jpg"
img2_path = "2.jpg"
output_docx = "Resume.docx"

doc = Document()

# Insert images at smaller width to reduce processing time
for img_path in [img1_path, img2_path]:
    doc.add_picture(img_path, width=Inches(5))
    doc.add_page_break()

doc.save(output_docx)
output_docx