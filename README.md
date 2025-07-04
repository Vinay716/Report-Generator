# Cybersecurity Report Generator
This is a Django-based web tool designed to streamline the process of creating cybersecurity assessment reports. Instead of manually building Word documents, this tool automates report generation using user inputs collected via dynamic web forms.

✅ Key Features:
📝 Multi-step Forms: Collects detailed data including vulnerabilities found, fixed, and tested.

📄 Word Report Generation: Automatically creates a .docx file with styled content, tables, and inserted images.

🔍 Smart Autofill: Dropdown search to auto-fill vulnerability details (e.g., name, severity, description).

📊 Charts & Tables: Visual representation of vulnerability trends (if applicable).

💡 Minimal Manual Editing: Just add screenshots and specific observations—everything else is generated!

🛠️ Tech Stack:
Backend: Django, Python, python-docx, pandas

Frontend: HTML, CSS, JavaScript

Editor Integration: CKEditor (or Summernote)

Extras: Dynamic JS forms, image upload & preview, responsive layout

📌 Use Case:
Perfect for security analysts or interns to generate professional reports after testing web applications or systems for vulnerabilities.
