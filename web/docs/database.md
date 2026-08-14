# MongoDB data model

## `books`

```json
{
  "slug": "the-rise-of-kyoshi-he",
  "title": "עלייתה של קיושי",
  "originalTitle": "The Rise of Kyoshi",
  "language": "he",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## `chapters`

```json
{
  "bookSlug": "the-rise-of-kyoshi-he",
  "number": 1,
  "title": "פרק 1 - המבחן",
  "slug": "01-the-test",
  "body": "Full chapter text",
  "published": true,
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

The importer creates these unique compound indexes:

- `{ bookSlug: 1, slug: 1 }`
- `{ bookSlug: 1, number: 1 }`

This supports multiple books in the same database while keeping chapter URLs and ordering unique within each book.
