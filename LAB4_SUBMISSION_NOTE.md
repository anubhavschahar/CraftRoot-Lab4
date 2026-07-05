# Lab 4 Submission Note — CraftRoots Support RAG Chatbot

## Lab Component
Lab 4: Support RAG Chatbot

## Product Used
CraftRoots — an artisan experience booking platform where travelers become makers and artisans become hosts.

## Toolkit
Dify + Ollama

## Strategic Focus
Internal Knowledge

## What I Built
I built a CraftRoots Support RAG Chatbot concept. The chatbot is designed to answer traveler and artisan questions using CraftRoots internal knowledge such as the product concept, personas, customer journey, booking flow, safety rules, cancellation policy, artisan verification, and escalation rules.

## Why RAG is Needed
CraftRoots has many repeated support questions:

- How do I book a workshop?
- Is the artisan verified?
- Is the workshop safe for families?
- What should I bring?
- What if I need to cancel?
- How does an artisan manage bookings?

Instead of relying only on a general AI model, RAG allows the chatbot to retrieve answers from CraftRoots-specific documents before responding.

## Risk Handling
The assignment mentions hallucinations and outdated documents as the key risks. This solution handles those risks by:

1. Uploading controlled CraftRoots knowledge documents.
2. Instructing the chatbot to answer only from available knowledge.
3. Asking the chatbot to say when it does not know.
4. Routing uncertain or high-risk cases to human support.
5. Keeping a source/knowledge reference in the response.
6. Maintaining document versioning and review dates.

## Submission Proof
For demo, I can show:

1. CraftRoots support assistant prototype.
2. Dify knowledge base with CraftRoots documents uploaded.
3. Ollama local model connection.
4. Test questions and chatbot responses.
5. Hallucination test where chatbot refuses to invent unsupported answers.
