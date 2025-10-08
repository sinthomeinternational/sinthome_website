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
    loader: glob({ pattern: ["**/*.md", "**/*.mdx"], base: "./src/content/srtp-events" }),
    schema: ({ image }) => z.object({
        title: z.string(),
        titleZh: z.string().optional(),
        type: z.enum(["Reading Seminar", "Philosophy Lecture", "Workshop", "Discussion", "lecture", "seminar", "workshop"]),
        date: z.coerce.date(),
        speaker: z.string().optional(),
        location: z.string().optional(),
        duration: z.string().optional(),
        recordingUrl: z.string().url().optional(),
        poster: image().optional(),
        eventPhoto: image().optional(),
        tags: z.array(z.string()).optional(),
        featured: z.boolean().default(false),
        synopsis: z.string().optional(),
        synopsisZh: z.string().optional(),
        quote: z.string().optional(),
        quoteTranslation: z.string().optional(),
        description: z.string().optional(),
        topics: z.array(z.object({
            title: z.string(),
            readings: z.array(z.string()).optional()
        })).optional(),
        order: z.number().default(0), // For sorting past events
    }),
});

export const collections = { articles, srtpEvents };