// guard را در یک پردازهٔ جدا اجرا می‌کند: node run-guard.mjs <مسیر guard.mjs>  (ورودی‌ها به‌صورت JSON از stdin)
// خروجی روی خطی که با @@RESULT@@ شروع می‌شود؛ هر چه guard خودش چاپ کند نادیده گرفته می‌شود.
import { readFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'

const inputs = JSON.parse(readFileSync(0, 'utf8'))
let results
try {
  const mod = await import(pathToFileURL(process.argv[2]).href)
  if (typeof mod.guard !== 'function') throw new Error('تابع guard از guard.mjs صادر (export) نشده است')
  results = inputs.map((input) => {
    try { const r = mod.guard(input); return { ok: r?.ok === true, url: typeof r?.url === 'string' ? r.url : null } }
    catch (e) { return { threw: String(e?.message || e) } }
  })
}
catch (e) { results = { error: String(e?.message || e) } }
process.stdout.write(`\n@@RESULT@@${JSON.stringify(results)}\n`)
process.exit(0)
