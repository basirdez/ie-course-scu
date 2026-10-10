// خودآزمایی تمرین ۱:  node check.mjs <پوشهٔ ex01 شما>
// قالب فایل‌ها و عملکرد guard روی هشت URL تمرین را بررسی می‌کند. درستی answers.json و URLهای پنهان اینجا بررسی نمی‌شود.
import { answersEmpty, answersProblems, cases, judge, observedProblems, readJson, runGuard } from './lib.mjs'

const dir = process.argv[2] || '.'
let bad = 0
const report = (title, problems) => {
  console.log(`${problems.length ? '✗' : '✓'} ${title}`)
  for (const p of problems) { console.log(`    ${p}`); bad++ }
}

report('observed.json: خروجی observe.mjs', observedProblems(readJson(dir, 'observed.json')))
const answers = readJson(dir, 'answers.json')
report('answers.json: سه پاسخ (درستی پاسخ‌ها در ارزیابی نهایی بررسی می‌شود)', [...answersProblems(answers), ...answersEmpty(answers)])

const run = runGuard(dir, cases.map(c => c[0]))
if (run.error) report('guard.mjs', [run.error])
else {
  const { failed } = judge(cases, run.results)
  report(`guard.mjs: ${cases.length - failed.length} از ${cases.length} URL تمرین`, failed.map(f => `${f.input}  ←  ${f.why}`))
}

console.log(bad ? `\n${bad} ایراد مانده است.` : '\nهمه‌چیز آمادهٔ تحویل است. ارزیابی نهایی درستی پاسخ‌ها و عملکرد guard روی URLهای پنهان را هم بررسی می‌کند.')
process.exit(bad ? 1 : 0)
