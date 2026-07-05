# CraftRoots Lab 4 GitHub Upload Steps

## What to upload
Upload all files inside this folder directly to the root of your GitHub repository.

The repository root must contain:

- `index.html`
- `style.css`
- `chatbot.js`
- `.nojekyll`
- `README.md`
- `SUPPORT_RAG_CHATBOT_REPORT.md`
- `LAB4_SUBMISSION_NOTE.md`
- `data/`
- `dify/`
- `ollama/`
- `prompts/`
- `evaluation/`
- `docs/`

Do not upload the outer folder as a folder. GitHub Pages must see `index.html` at the main/root level.

## GitHub Pages settings

1. Open your repository on GitHub.
2. Go to **Settings**.
3. Go to **Pages**.
4. Under **Build and deployment**, choose:
   - Source: Deploy from a branch
   - Branch: main
   - Folder: /root
5. Click **Save**.

Your live site will look like:

`https://your-username.github.io/your-repo-name/`

## What this live page shows

The live page is a visible CraftRoots Support Assistant demo. It can answer predefined RAG-style support questions from the included knowledge base files and demonstrates hallucination control by refusing to confirm live slots or unsupported availability.

## Dify + Ollama proof

For actual Lab 4 proof, upload the files from `data/knowledge_base/` into Dify as knowledge documents, use `prompts/system_prompt.txt` as the chatbot instruction, and use `prompts/test_questions.md` for demo questions.
