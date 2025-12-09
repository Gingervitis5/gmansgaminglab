import { defineType, defineField } from "sanity";
import { TagIcon } from "@sanity/icons"

export const themeType = defineType({
    name: "theme",
    title: "Theme",
    type: "document",
    icon: TagIcon,
    fields: [
        defineField({
            name: "title",
            type: "string"
        }),
        defineField({
            name: "slug",
            type:"slug",
            options:{
                source: "title",
                maxLength: 96
            },
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: "image",
            title: "Category Image",
            type: "image",
            options: {
                hotspot: true
            }
        })
    ],
    preview: {
        select: {
            title: "title",
            subtitle: "description",
            media: "image"
        }
    }
});