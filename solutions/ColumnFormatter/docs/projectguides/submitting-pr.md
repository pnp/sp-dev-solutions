# Submitting a PR

We appreciate your initiative and would love to integrate your work with the rest of the project! Here is how you can help us do it as quickly as possible.

- check, that your feature branch is up-to-date. If it's not, there is a risk of merge conflicts or other issues that will complicate merging your changes into the main repository. Refer to these resources for more information on syncing your repo:
  - [GitHub Docs: Syncing a fork](https://docs.github.com/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork)
  - Looking for a quick cheat sheet? Look no further:

    ```sh
    # assuming you are in the folder of your locally cloned fork....
    git checkout master

    # assuming you have a remote named `upstream` pointing to the official **sp-dev-solutions** repo
    git fetch upstream

    # update your local master branch to be a mirror of what's in the main repo
    git pull --rebase upstream master

    # switch to your branch where you are working, say "issue-xyz"
    git checkout issue-xyz

    # update your branch to the current tip of master and put your changes on top of it
    git rebase master
    ```
- submit the PR to the **master** branch of the main repo
- let us know what's in the PR: is it a new command, bug fix or a minor update in the docs? The clearer the information you provide, the quicker your PR can be verified and merged
- ideally 1 PR = 1 commit - this makes it easier to keep the log clear for everyone and track what's changed. If you're new to working with git, we'll squash your commits for you when merging your changes into the main repo
- don't worry about changing the version or adding yourself to the list of contributors in `package.json`. We'll do that for you when merging your changes.

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-solutions/solutions/ColumnFormatter/guides/PRs" />