import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
    name: 'default',
    title: 'Chinonso Portfolio',

    projectId: 'ss11hqc9',
    dataset: 'production',

    plugins: [structureTool(), visionTool()],

    schema: {
        types: schemaTypes,
    },

    // Custom document actions
    document: {
        // Only allow one profile document
        actions: (prev, context) => {
            if (context.schemaType === 'profile') {
                return prev.filter(
                    (action) => !['unpublish', 'delete', 'duplicate'].includes(action.action)
                )
            }
            return prev
        },
    },
})
