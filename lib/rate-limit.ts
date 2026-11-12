/**
 * Fixed-window, in-memory rate limit. Best effort: each serverless instance keeps
 * its own counts, so the real ceiling is `limit` x warm instances. Good enough to stop
 * a single script hammering the form; swap for a shared store if abuse gets serious.
 */
type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
const MAX_KEYS = 10_000;

export function rateLimit(key: string, limit: number, windowMs: number, now = Date.now()): boolean {
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    if (buckets.size >= MAX_KEYS) prune(now);
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (bucket.count >= limit) return false;
  bucket.count += 1;
  return true;
}

function prune(now: number) {
  for (const [key, bucket] of buckets) if (bucket.resetAt <= now) buckets.delete(key);
  // Still full (a flood of distinct IPs): drop the oldest entries.
  if (buckets.size >= MAX_KEYS) {
    const excess = buckets.size - MAX_KEYS + 1;
    let i = 0;
    for (const key of buckets.keys()) {
      if (i++ >= excess) break;
      buckets.delete(key);
    }
  }
}
