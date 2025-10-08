import { glob } from "astro/loaders";
import { z, reference, defineCollection } from "astro:content";

const articles = defineCollection({
    loader: glob({ pattern: ["**/*.md", "**/*.mdx"], base: "./src/content/articles" }),
    schema: ({ image }) => z.object({
        cover: image(),
        coverAlt: z.string(),
        title: z.string(),
        slug: z.string(),
        snippet: z.string(),
        category: z.string(),
        pubDate: z.coerce.date(),
        readingDuration: z.number(),
        originalLink: z.string().url(),
        isDraft: z.boolean().default(false),
        updatedDate: z.coerce.date().optional(),
        author: z.string().default('Retro Rocket Team'),
        relatedArticles: z.array(reference('articles')).optional(),
    }),
});

const srtpEvents = defineCollection({
    loader: glob({ pattern: ["**/*.md", "**/*.mdx"], base: "./src/content/events/srtp" }),
    schema: ({ image }) => z.object({
        title: z.string(),
        type: z.enum(['lecture', 'seminar', 'workshop']),
        date: z.coerce.date(),
        poster: image().optional(),
        eventPhoto: image().optional(),
        recordingUrl: z.string().url().optional(),
        quote: z.string().optional(),
        quoteTranslation: z.string().optional(),
        description: z.string(),
        topics: z.array(z.object({
            title: z.string(),
            readings: z.array(z.string()).optional()
        })).optional(),
        order: z.number().default(0), // For sorting past events
    }),
});

export const collections = { articles, srtpEvents };