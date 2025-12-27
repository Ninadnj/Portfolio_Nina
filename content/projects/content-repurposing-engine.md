# Project: Content Repurposing Engine

**Role:** An automated pipeline for digital publishing.

**Problem:**
Creators often need to publish the same core idea across multiple platforms (newsletter, LinkedIn, Twitter/X), requiring significant manual rewriting and formatting.

**Solution:**
A "write once, publish everywhere" engine. The user inputs a single core draft, audio note, or link. The system processes this input and automatically generates tailored drafts for every target platform.

**Technical Implementation:**
1.  **Input:** A simple form or webhook receives the raw content.
2.  **Processing:** An n8n workflow sends the content to an LLM (GPT-4) with specific style guides for each platform.
3.  **Output:**
    *   *Newsletter:* Long-form, educational tone.
    *   *LinkedIn:* Professional, insight-driven, spaced formatting.
    *   *Twitter:* Thread format, punchy, hook-driven.
4.  **Delivery:** Drafts are delivered to a review dashboard (e.g., Notion or Airtable) for final approval before scheduling.

**Outcome:**
Reduces the time from idea to multi-channel distribution by 90%, ensuring consistency in voice and messaging.
