export default {
    name: 'profile',
    title: 'Profile Settings',
    type: 'document',
    fields: [
        {
            name: 'fullName',
            title: 'Full Name',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'title',
            title: 'Professional Title',
            type: 'string',
            description: 'e.g., Economist | Policy Researcher | Data Analyst',
            validation: Rule => Rule.required()
        },
        {
            name: 'tagline',
            title: 'Tagline/Bio',
            type: 'text',
            description: 'Brief introduction shown in hero section',
            validation: Rule => Rule.required()
        },
        {
            name: 'profileImage',
            title: 'Profile Image',
            type: 'image',
            options: {
                hotspot: true
            },
            validation: Rule => Rule.required()
        },
        {
            name: 'cvFile',
            title: 'CV/Resume File',
            type: 'file',
            description: 'Upload your CV as PDF',
            options: {
                accept: '.pdf'
            }
        },
        {
            name: 'email',
            title: 'Email Address',
            type: 'string',
            validation: Rule => Rule.required().email()
        },
        {
            name: 'linkedinUrl',
            title: 'LinkedIn URL',
            type: 'url'
        },
        {
            name: 'googleScholarUrl',
            title: 'Google Scholar URL',
            type: 'url'
        },
        {
            name: 'twitterUrl',
            title: 'Twitter/X URL',
            type: 'url'
        },
        {
            name: 'githubUrl',
            title: 'GitHub URL',
            type: 'url'
        },
        {
            name: 'additionalServices',
            title: 'Additional Services',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'List of additional services offered'
        }
    ],
    preview: {
        select: {
            title: 'fullName',
            subtitle: 'title',
            media: 'profileImage'
        }
    }
}
