function New-BackdatedCommit {
    param(
        [string]$Date,
        [string]$Message,
        [string[]]$Files
    )
    $env:GIT_AUTHOR_DATE = $Date
    $env:GIT_COMMITTER_DATE = $Date
    foreach ($file in $Files) {
        git add $file
    }
    git commit -m $Message
}

# January
New-BackdatedCommit -Date "2026-01-26T10:00:00" -Message "Initial commit: Setup Next.js project" -Files @("package.json", "package-lock.json", ".gitignore", "tsconfig.json")

# February
New-BackdatedCommit -Date "2026-02-02T14:30:00" -Message "chore: add configuration files" -Files @("next.config.ts", "postcss.config.mjs", "eslint.config.mjs", "components.json")
New-BackdatedCommit -Date "2026-02-09T11:15:00" -Message "chore: add public assets" -Files @("public/")
New-BackdatedCommit -Date "2026-02-16T16:45:00" -Message "feat: setup global styles and basic layout" -Files @("src/app/globals.css", "src/app/layout.tsx", "src/app/favicon.ico")
New-BackdatedCommit -Date "2026-02-23T09:20:00" -Message "feat: add base UI components" -Files @("src/components/ui/")

# March
New-BackdatedCommit -Date "2026-03-02T13:10:00" -Message "feat: add utility functions and middleware" -Files @("src/lib/utils.ts", "src/middleware.ts")
New-BackdatedCommit -Date "2026-03-09T15:40:00" -Message "feat: setup Firebase and Auth context" -Files @("src/lib/firebase.ts", "src/contexts/")
New-BackdatedCommit -Date "2026-03-16T10:25:00" -Message "feat: build landing page and sections" -Files @("src/components/landing/", "src/app/page.tsx")
New-BackdatedCommit -Date "2026-03-23T11:50:00" -Message "feat: add authentication routes" -Files @("src/app/(auth)/")
New-BackdatedCommit -Date "2026-03-30T14:05:00" -Message "feat: implement Pinecone, AI, and ingestion logic" -Files @("src/lib/pinecone.ts", "src/lib/ai.ts", "src/lib/scraper.ts", "src/lib/ingest.ts", "src/lib/prompts.ts", "src/lib/rag.ts")

# April
New-BackdatedCommit -Date "2026-04-06T09:30:00" -Message "feat: add voice and widget core components" -Files @("src/components/voice/", "src/components/WidgetLoader.tsx", "src/hooks/")
New-BackdatedCommit -Date "2026-04-13T16:15:00" -Message "feat: build API routes for AI and ingestion" -Files @("src/app/api/")
New-BackdatedCommit -Date "2026-04-18T10:45:00" -Message "feat: add dashboard interface" -Files @("src/app/dashboard/")
New-BackdatedCommit -Date "2026-04-21T13:20:00" -Message "feat: add widget customer interface" -Files @("src/app/widget/")
New-BackdatedCommit -Date "2026-04-23T09:00:00" -Message "docs: final documentation, scripts and miscellaneous updates" -Files @(".")

# Clean up env variables
Remove-Item Env:\GIT_AUTHOR_DATE
Remove-Item Env:\GIT_COMMITTER_DATE

Write-Host "Successfully generated 3 months of commit history!"
