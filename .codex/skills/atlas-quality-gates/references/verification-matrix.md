# Verification Matrix

## Minimum checks by change type

### Feature logic

- `npm run typecheck`
- relevant tests if they exist

### Shared component or styling primitive

- `npm run lint`
- `npm run typecheck`
- relevant tests

### Tooling or config

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`

### CI or package scripts

- inspect `package.json`
- inspect `.github/workflows/ci.yml`
- keep local scripts and CI steps aligned

## Delivery checklist

1. Confirm changed scripts still exist.
2. Confirm docs do not mention outdated commands.
3. Confirm new dependencies are justified by actual use.
4. Confirm validation scope matches the real risk of the change.
