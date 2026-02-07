import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const challengeDir = path.resolve(__dirname, '../challenges')

const DATE_KEY_REGEX = /^\d{4}-\d{2}-\d{2}$/
const VALID_DIFFICULTIES = new Set(['easy', 'medium', 'hard'])
const VALID_CATEGORIES = new Set([
  'types-coercion',
  'scope-hoisting',
  'closures',
  'this',
  'async',
  'arrays-objects',
])

function assert(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

function validateChallengeShape(challenge) {
  assert(typeof challenge === 'object' && challenge !== null, 'Challenge must be an object.')
  assert(typeof challenge.id === 'string' && DATE_KEY_REGEX.test(challenge.id), 'id must match YYYY-MM-DD.')
  assert(challenge.language === 'javascript', 'language must be "javascript".')
  assert(
    typeof challenge.difficulty === 'string' && VALID_DIFFICULTIES.has(challenge.difficulty),
    'difficulty must be easy, medium, or hard.',
  )
  assert(typeof challenge.code === 'string' && challenge.code.trim().length > 0, 'code must be non-empty.')
  assert(Array.isArray(challenge.options) && challenge.options.length >= 2, 'options must have at least 2 entries.')
  for (const option of challenge.options) {
    assert(typeof option === 'string' && option.trim().length > 0, 'options entries must be non-empty strings.')
  }
  assert(Number.isInteger(challenge.correctIndex) && challenge.correctIndex >= 0, 'correctIndex must be >= 0 integer.')
  assert(challenge.correctIndex < challenge.options.length, 'correctIndex must be inside options range.')
  assert(
    typeof challenge.explanation === 'string' && challenge.explanation.trim().length > 0,
    'explanation must be non-empty.',
  )
  if (challenge.category !== undefined) {
    assert(
      typeof challenge.category === 'string' && VALID_CATEGORIES.has(challenge.category),
      'category is invalid.',
    )
  }
}

async function validateChallenges() {
  const files = (await readdir(challengeDir)).filter((file) => file.endsWith('.json')).sort()
  assert(files.length > 0, 'No challenge JSON files found in challenges/.')

  const ids = new Set()
  for (const fileName of files) {
    const content = await readFile(path.join(challengeDir, fileName), 'utf8')
    let parsed
    try {
      parsed = JSON.parse(content)
    } catch {
      throw new Error(`Invalid JSON file: ${fileName}`)
    }

    validateChallengeShape(parsed)

    const expectedFileName = `${parsed.id}.json`
    assert(fileName === expectedFileName, `${fileName} must be named ${expectedFileName}`)
    assert(!ids.has(parsed.id), `Duplicate id: ${parsed.id}`)
    ids.add(parsed.id)
  }

  console.log(`Validated ${files.length} challenge file(s).`)
}

validateChallenges().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
