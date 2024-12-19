// 1. Import utilities from `astro:content`
import { defineCollection } from 'astro:content';

// 2. Import loader(s)
import { glob, file } from 'astro/loaders';

// 3. Define your collection(s)
const blog = defineCollection({ 
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" })
});

const wiki = defineCollection({ 
  loader: glob({ pattern: "**/*.md", base: "./src/content/wiki" })
});

const countries = defineCollection({
  loader: async () => {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    // Must return an array of entries with an id property, or an object with IDs as keys and entries as values
    return data.map((country) => ({
      id: country.cca3,
      ...country,
    }));
  }
});

// 4. Export a single `collections` object to register your collection(s)
export const collections = { blog, wiki, countries };