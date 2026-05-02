# UI Rules

## Decide whether code belongs in shared

Move a component to `shared/` only if:

1. It has or will immediately have multiple consumers.
2. Its language can stay neutral and domain-free.
3. Its API is still small after extracting it.

Keep it inside the module if:

1. It depends on feature vocabulary.
2. It encodes business meaning.
3. It is only reused inside one feature.

## Review checklist

- Does the component expose only necessary props?
- Can a slot simplify the API?
- Are hover, focus, disabled, and loading states covered?
- Does the naming match the existing `Base*` convention when appropriate?
- Is the component still useful outside the original screen?
