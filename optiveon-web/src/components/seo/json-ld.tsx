import React from 'react';

type JsonLdProps = {
    data: Record<string, any> | Record<string, any>[];
};

/**
 * Reusable component to inject structured JSON-LD data into the HEAD.
 * This is crucial for Answer Engines (Perplexity, ChatGPT) and standard Search Engines
 * to automatically understand Optiveon's authority, services, and FAQ structure.
 */
export function JsonLd({ data }: JsonLdProps) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}
