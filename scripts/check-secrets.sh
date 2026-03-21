#!/usr/bin/env sh

set -eu

tracked_files=$(git ls-files)

if [ -z "${tracked_files}" ]; then
  exit 0
fi

echo "$tracked_files" | grep -E '(^|/)\.env($|\.[^/]+$)' | grep -Ev '(^|/)\.env\.example$' >/dev/null 2>&1 && {
  echo "Error: .env files must not be committed."
  exit 1
}

patterns='(BEGIN [A-Z ]*PRIVATE KEY|ghp_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|sk-[A-Za-z0-9]{20,}|AIza[0-9A-Za-z\-_]{20,}|AKIA[0-9A-Z]{16})'

git grep -n -I -E "$patterns" -- . ':(exclude).env.example' >/dev/null 2>&1 && {
  echo "Error: potential secret detected in repository files."
  echo "Remove secrets before pushing."
  exit 1
}

exit 0
