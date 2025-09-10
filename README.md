# NEWTUBE

A consumer-only, highly customizable streaming aggregator that discovers and displays videos from external platforms through official APIs and embeds.

## Project Structure

This repository uses git worktrees for agent-based development. Each agent works in their own worktree branch.

## Development

See `/home/codingbutter/com/newtube/www/CLAUDE.md` for detailed development instructions.

## Agent Task Assignment

Tasks in GitHub Projects are tagged with:
- `#frontend` - Frontend Developer tasks
- `#backend` - Backend Developer tasks  
- `#ai` - AI/ML Specialist tasks
- `#devops` - DevOps Engineer tasks
- `#pm` - Project Manager tasks

## Quick Start

```bash
# Create a worktree for your agent role
git worktree add ../worktrees/[agent-name] -b [branch-name]

# Navigate to your worktree
cd ../worktrees/[agent-name]

# Install dependencies
npm install

# Start development
npm run dev
```