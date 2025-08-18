# Next steps

## DB/Seeding
The [seed file](/src/db/seed/index.ts) is not set up very robustly. It deletes existing advocates, then just directly imports advocates and populates the database all within one function. This should really be handled via separate seed methods, with some CLI arguments, etc

## Search Functionality
The current search implementation uses simple string matching per field. Potential improvements:
- Multi-term search (e.g., "john doe" finds advocates with both terms)
- Better handling of edge cases and data types
- More sophisticated text matching algorithms
- Could be abstracted into a reusable utility function for scalability

## Table Functionality
The current implementation fetches all advocates in the database which, if there are hundreds of thousands of instances in the database as the [problem description](https://findsolace.notion.site/Solace-Engineering-Assignment-bbf3ebf1fa274d0e92d9cde773a0a671) indicates, could become problematic. Potential improvements:
- Handle logic server-side so only a portion of the advocates will be returned at any one time
- Implement pagination
- Implement sort
- Use URL query parameters so the search/sort/pagination results are repeatable

Possibly consider implementing something more robust like [TanStack Table](https://tanstack.com/table/latest)

## Tailwind/CSS/Etc
Tailwind is in version 4 and focuses more on utilizing CSS variables instead of a tailwind.config.ts file, which provides better flexibility.
