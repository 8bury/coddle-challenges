# Contributing

## Daily challenge format

```json
{
  "id": "2026-02-07",
  "language": "javascript",
  "difficulty": "easy",
  "code": "console.log(typeof null);",
  "options": ["\"null\"", "\"object\"", "\"undefined\"", "ReferenceError"],
  "correctIndex": 1,
  "explanation": "typeof null returns \"object\" due to legacy behavior.",
  "category": "types-coercion"
}
```

## Accepted categories

- `types-coercion`
- `scope-hoisting`
- `closures`
- `this`
- `async`
- `arrays-objects`

## Checklist

- [ ] `id` format is `YYYY-MM-DD`
- [ ] file is named `<id>.json`
- [ ] one clear correct answer
- [ ] explanation is concise and deterministic
- [ ] validation script passes
