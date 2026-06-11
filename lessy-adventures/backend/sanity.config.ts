import { defineProject } from 'sanity'

// https://www.sanity.io/docs/plugins/sanity-cli
export default defineProject({
  name: 'lessy-adventures-backend',
  studio: {
    name: 'lessy-adventures-studio',
    title: 'Lessy Adventures Studio',
    apiVersion: '2024-01-01',
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
  },
})
