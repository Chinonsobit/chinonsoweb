export default {
    name: 'skill',
    title: 'Skill',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Skill Name',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Economic & Policy Analysis', value: 'economic' },
                    { title: 'Quantitative & Research', value: 'quantitative' },
                    { title: 'Tools & Technologies', value: 'tools' }
                ]
            },
            validation: Rule => Rule.required()
        },
        {
            name: 'icon',
            title: 'Icon',
            type: 'string',
            description: 'Lucide icon name (e.g., globe, bar-chart-3, trending-up)',
            validation: Rule => Rule.required()
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            description: 'Used for linking to projects (e.g., "stata", "python")',
            options: {
                source: 'name',
                maxLength: 96
            },
            validation: Rule => Rule.required()
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            description: 'Brief description of expertise in this skill'
        },
        {
            name: 'projects',
            title: 'Associated Projects',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'name',
                            title: 'Project Name',
                            type: 'string'
                        },
                        {
                            name: 'file',
                            title: 'Project File',
                            type: 'file',
                            description: 'Upload project file (PDF, code file, etc.)'
                        }
                    ]
                }
            ]
        },
        {
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Order within category (lower numbers appear first)',
            validation: Rule => Rule.required().min(0)
        }
    ],
    orderings: [
        {
            title: 'Category, then Order',
            name: 'categoryOrder',
            by: [
                { field: 'category', direction: 'asc' },
                { field: 'order', direction: 'asc' }
            ]
        }
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'category',
            order: 'order'
        },
        prepare(selection) {
            const { title, subtitle, order } = selection
            const categoryMap = {
                economic: 'Economic & Policy',
                quantitative: 'Quantitative',
                tools: 'Tools'
            }
            return {
                title: title,
                subtitle: `${categoryMap[subtitle] || subtitle} (Order: ${order})`
            }
        }
    }
}
