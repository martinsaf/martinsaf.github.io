 // Fetch repo stats from GitHub API
async function fetchReposStats(repo){
    const response = await fetch(`https://api.github.com/repos/martinsaf/${repo}`)
    const data = await response.json();
    return {
        stars: data.stargazers_count,
        forks: data.forks_count,
        issues: data.open_issues_count
    }
}