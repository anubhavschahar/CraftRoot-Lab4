# CraftRoots Lab 4 — Support RAG Chatbot

This package contains a complete Lab 4 implementation for CraftRoots using the assignment direction:

**Lab 4: Support RAG Chatbot**
- Primary toolkit: Dify + Ollama
- Strategic focus: Internal Knowledge
- Known risks: Hallucinations and outdated documents

The product idea stays CraftRoots: a platform where travelers book verified, hands-on artisan workshops and artisans become cultural hosts.

## What is included

```text
prototype/
  index.html              Product-style chatbot demo page
  style.css               Styling for the support assistant demo
  chatbot.js              Local RAG-style retrieval demo logic

data/knowledge_base/
  craftroots_rag_kb.md    Main knowledge base for Dify upload
  craftroots_faq.md       Traveler/artisan FAQ knowledge
  policies.md             Booking, cancellation, safety, escalation policy
  personas_summary.md     User/persona knowledge summary
  customer_journey_summary.md Journey stages and support moments

prompts/
  system_prompt.txt       System prompt for Dify/Ollama chatbot
  guardrails.txt          Hallucination and escalation rules
  test_questions.md       Questions to test the chatbot

evaluation/
  rag_test_cases.csv      Test cases with expected answer behavior
  hallucination_safety_checklist.md Risk checklist

dify/
  dify_setup_guide.md     Step-by-step Dify setup guide
  dify_app_blueprint.yml  App configuration notes/blueprint

ollama/
  ollama_setup_commands.md Commands and model setup notes

docs/
  demo_script.md          What to show during submission

LAB4_SUBMISSION_NOTE.md   Short teacher-facing submission note
SUPPORT_RAG_CHATBOT_REPORT.md Main report
```

## How to use the prototype

Open this file in your browser:

```text
prototype/index.html
```

Try questions such as:

- How does CraftRoots verify artisans?
- What should I bring for a pottery workshop?
- Can I book a family-friendly session?
- What if the artisan does not show up?
- How does CraftRoots reduce hallucination risk?

The prototype is a visible demo of the support assistant. For the real Lab 4 implementation, use Dify + Ollama and upload the markdown files from `data/knowledge_base/` as the knowledge base.

## What to submit

Recommended submission set:

1. `SUPPORT_RAG_CHATBOT_REPORT.md`
2. `LAB4_SUBMISSION_NOTE.md`
3. Screenshot/video of `prototype/index.html`
4. Screenshot of Dify knowledge base after uploading the docs
5. Screenshot of chatbot test conversations
6. Screenshot of hallucination/unknown-answer test

## Demo flow

```text
CraftRoots support assistant page
↓
User asks workshop/artisan question
↓
RAG retrieves from CraftRoots knowledge base
↓
Assistant answers with source area
↓
If answer is not in docs, assistant escalates to human support
```

