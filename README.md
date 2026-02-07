# Coddle Challenges

Official daily challenge source for Coddle.

## Structure

- `challenges/YYYY-MM-DD.json`
- One challenge per file
- Filename must match `id`

## Rules

- Language must be `javascript`
- Exactly one correct option
- Deterministic output-only questions
- No subjective answers

## Validation

```bash
npm install
npm run validate:challenges
```

## Contribution flow

1. Fork repository
2. Add a new challenge file in `challenges/`
3. Run `npm run validate:challenges`
4. Open a pull request
