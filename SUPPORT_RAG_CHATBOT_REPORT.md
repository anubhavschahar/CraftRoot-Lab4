# CraftRoots Lab 4 — Support RAG Chatbot Report

## 1. Overview

CraftRoots is a marketplace that connects travelers with verified artisan hosts for hands-on craft workshops. Travelers can discover and book experiences such as pottery, block printing, weaving, painting, and embroidery. Artisans can earn income by hosting structured sessions rather than relying only on product sales through middlemen.

Lab 4 focuses on building a Support RAG Chatbot using Dify and Ollama. The goal is to help travelers and artisans get accurate answers from CraftRoots internal knowledge.

## 2. Problem

A platform like CraftRoots will receive repeated support questions at multiple journey stages:

- Awareness: What is CraftRoots?
- Consideration: Are these workshops verified and safe?
- Booking: How do I choose date, group size, and craft type?
- Pre-session: What should I wear or bring?
- Workshop: What happens during the session?
- Post-session: How do I review or share the experience?
- Artisan side: How do artisans manage bookings, earnings, reviews, and availability?

If handled manually, support load can become high. If handled by a normal chatbot without product knowledge, the chatbot may hallucinate, make false promises, or provide outdated information.

## 3. Solution

The solution is a Retrieval-Augmented Generation chatbot.

The chatbot first retrieves information from CraftRoots knowledge documents, then generates an answer using that retrieved context. This makes the assistant more grounded than a generic chatbot.

## 4. Toolkit

### Dify
Dify is used to create the chatbot app, manage knowledge base documents, configure prompts, test conversations, and expose the chatbot as a demo interface or API.

### Ollama
Ollama is used to run a local LLM. This supports a local, low-cost prototype and keeps internal CraftRoots knowledge closer to the team during feasibility testing.

## 5. Knowledge Base Documents

The chatbot uses the following documents:

1. `craftroots_rag_kb.md` — product overview, problem, solution, features, users, metrics.
2. `craftroots_faq.md` — traveler and artisan frequently asked questions.
3. `policies.md` — safety, cancellation, no-show, escalation, trust policy.
4. `personas_summary.md` — Priya, Mark, Ramesh, Ananya, Sofia personas.
5. `customer_journey_summary.md` — awareness to advocacy journey stages.

## 6. Supported Questions

The chatbot can answer:

- What is CraftRoots?
- How does CraftRoots verify artisans?
- How do I book a workshop?
- Can families book private craft sessions?
- What should I bring to a pottery or block printing workshop?
- How does cancellation work?
- What happens if an artisan does not show up?
- How are artisans paid?
- What should artisans do if they have low digital literacy?
- Which team should handle a safety/accessibility concern?

## 7. RAG Flow

```text
User asks a question
↓
Dify retrieves matching chunks from CraftRoots knowledge base
↓
Ollama generates answer using retrieved context
↓
Assistant answers with practical guidance
↓
If answer is not available or risky, assistant escalates to human support
```

## 8. Guardrails

The chatbot must:

- Not invent workshop availability.
- Not confirm a booking unless booking data exists.
- Not make medical, legal, or safety guarantees.
- Not claim an artisan is verified unless the knowledge says so.
- Not provide unsupported pricing for a specific workshop.
- Say “I do not have enough information” when the answer is not in the knowledge base.
- Escalate sensitive cases to human support.

## 9. Risk Analysis

| Risk | Why it matters | Control |
|---|---|---|
| Hallucination | Chatbot may invent workshop details | Answer only from knowledge base and escalate unknowns |
| Outdated documents | Policy or pricing may change | Add review date and document owner |
| False booking confirmation | User may believe a slot is reserved | Never confirm without booking system data |
| Safety overclaiming | Family/solo travelers may rely on incorrect safety claims | Use cautious language and route to human support |
| Poor retrieval | Wrong document chunk may be retrieved | Use focused FAQs and clean document structure |

## 10. Evaluation

The chatbot is tested using `evaluation/rag_test_cases.csv`.

The main evaluation criteria are:

1. Correctness: Does the answer match CraftRoots documents?
2. Grounding: Does it avoid unsupported claims?
3. Completeness: Does it answer the user clearly?
4. Escalation: Does it route risky/unknown cases to human support?
5. Tone: Is it warm, helpful, and product-appropriate?

## 11. Success Metrics

- 80%+ correct answers on known support questions.
- 90%+ refusal/escalation accuracy on unknown or risky questions.
- Reduced repeated support queries for traveler FAQs.
- Faster pre-session guidance.
- Improved trust during booking consideration.

## 12. Conclusion

This Lab 4 implementation turns CraftRoots internal product knowledge into a practical support assistant. It supports travelers, artisans, and the operations team while reducing the risk of generic AI hallucination through RAG, prompt guardrails, and human escalation.
