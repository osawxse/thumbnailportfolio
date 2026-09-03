import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',

  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },

  fields: [
    {
      name: 'siteName',
      type: 'text',
      defaultValue: '[YOUR NAME] — Thumbnail Designer',
    },

    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },

    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'The 1920×1080 collage displayed in the homepage hero.',
      },
    },

    {
      name: 'heroHeading',
      type: 'text',
      defaultValue:
        'I turn strong YouTube ideas into thumbnails people need to click.',
    },

    {
      name: 'heroDescription',
      type: 'textarea',
      defaultValue:
        'Strategic thumbnail design for creators and brands who want their videos packaged with more clarity, curiosity and intent.',
    },

    {
      name: 'availabilityLabel',
      type: 'text',
      defaultValue: 'Available for selected projects',
    },

    {
      name: 'primaryCtaText',
      type: 'text',
      defaultValue: 'Work With Me',
    },

    {
      name: 'secondaryCtaText',
      type: 'text',
      defaultValue: 'View My Work',
    },

    {
      name: 'emailAddress',
      type: 'email',
      defaultValue: 'hello@example.com',
    },

    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
        },
        {
          name: 'url',
          type: 'text',
        },
      ],
    },

    {
      name: 'footerText',
      type: 'text',
      defaultValue:
        'Independent thumbnail designer · Available worldwide',
    },
  ],
}