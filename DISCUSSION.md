# Next steps

## DB/Seeding
The [seed file](/src/db/seed/index.ts) is not set up very robustly. It deletes existing advocates, then just directly imports advocates and populates the database all within one function. This should really be handled via separate seed methods, with some CLI arguments, etc