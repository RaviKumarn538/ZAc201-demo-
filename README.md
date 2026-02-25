# Class 9-10 Academic Tutor Web Starter

This project provides a fresh chatbot web starter configured for a strict academic tutor behavior.

## What it does

- Restricts responses to Class 9-10 syllabus-oriented queries.
- Uses structured response formats for:
  - Theory questions
  - Numerical/math problems
- Supports:
  - `Start Test` flow (subject -> chapter -> difficulty -> 10 questions scaffold)
  - `Revise Chapter` flow (summary/template starter)
- Blocks cheating-style prompts with the required safety response.

## Files

- `index.html` - UI layout
- `styles.css` - chatbot styling
- `app.js` - tutor logic and structured response templates

## Run locally

```bash
python3 -m http.server 8000
```

Open:

`http://localhost:8000`

## Notes

- Current implementation is frontend-only template logic.
- You can connect `app.js` to a backend LLM while preserving the same policy rules.
