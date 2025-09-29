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
    loader: glob({ pattern: "**/*.md", base: "./src/content/srtp-events" }),
    schema: ({ image }) => z.object({
        title: z.string(),
        titleZh: z.string(),
        type: z.enum(["Reading Seminar", "Philosophy Lecture", "Workshop", "Discussion"]),
        date: z.coerce.date(),
        speaker: z.string(),
        location: z.string(),
        duration: z.string(),
        recordingUrl: z.string().url().optional(),
        poster: image().optional(),
        eventPhoto: image().optional(),
        tags: z.array(z.string()),
        featured: z.boolean().default(false),
        synopsis: z.string(),
        synopsisZh: z.string(),
        quote: z.string().optional(),
    }),
});

export const collections = { articles, srtpEvents };