# Renovate Setup

This repository uses [Renovate](https://github.com/renovatebot/renovate) for automated dependency management.

## Configuration

The Renovate configuration is defined in `renovate.json` and includes:

- **Schedule**: Runs weekly on Fridays at 5:00 AM UTC
- **Auto-merge**: Automatically merges minor and patch updates
- **Grouping**: Groups related dependencies together
- **Lock file maintenance**: Updates package-lock.json weekly

## Initial Setup

1. Create a Personal Access Token (PAT) with `repo` and `workflow` permissions:
   - Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Generate new token with `repo`, `workflow`, and `read:org` scopes

2. Add the PAT as a repository secret:
   - Go to your repository → Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `RENOVATE_TOKEN`
   - Value: Your personal access token

3. Test the workflow:
   ```bash
   # Manually trigger the workflow
   gh workflow run renovate.yaml
   ```

## Features

### Weekly Dependency Updates
- Runs automatically every Friday at 5:00 AM UTC
- Creates pull requests for available updates
- Groups related packages together

### Auto-merge Rules
- **Minor & Patch updates**: Auto-merged for non-zero major versions
- **Dev dependencies**: Auto-merged regardless of version
- **Security updates**: Auto-merged immediately

### Package Grouping
- **React ecosystem**: next, react, react-dom
- **Testing**: @testing-library/*, vitest, @vitest/*
- **Prisma**: @prisma/client, prisma

### Lock File Maintenance
- Weekly package-lock.json updates (Fridays 5AM UTC)
- Ensures lock file is in sync with dependencies

## Manual Override

To manually trigger dependency updates:

1. **Via GitHub UI**:
   - Go to Actions tab
   - Select "Renovate" workflow
   - Click "Run workflow"

2. **Via CLI**:
   ```bash
   gh workflow run renovate.yaml
   ```

## Configuration Options

Key configuration options in `renovate.json`:

- `prConcurrentLimit`: Maximum 3 concurrent PRs
- `prHourlyLimit`: Maximum 2 PRs per hour
- `schedule[:weekly]`: Weekly schedule (Fridays 5AM UTC)
- `automerge`: Enabled for safe updates
- `lockFileMaintenance`: Weekly lock file updates

## Monitoring

- Check the "Dependency Dashboard" issue for overview
- Monitor Actions tab for workflow runs
- Review auto-merged PRs in pull requests tab

## Troubleshooting

### Workflow Fails
1. Check if `RENOVATE_TOKEN` has correct permissions
2. Verify PAT hasn't expired
3. Check workflow logs for specific errors

### No PRs Created
1. Check if dependencies are already up-to-date
2. Verify schedule timing (runs Friday 5AM UTC)
3. Check if Renovate is disabled for any packages

### Auto-merge Not Working
1. Verify branch protection rules allow auto-merge
2. Check if PR has required reviews
3. Ensure CI/CD passes for auto-merge conditions