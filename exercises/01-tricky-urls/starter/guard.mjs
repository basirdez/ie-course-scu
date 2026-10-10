// این بررسی همکارتان است. درستش کنید.
// قبول: { ok: true, url }   رد: { ok: false }
export function guard(input) {
  if (!input.includes('scu.test')) return { ok: false }
  return { ok: true, url: input }
}
