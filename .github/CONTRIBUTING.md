# Contribution Guidance

If you'd like to contribute to this repository, please read the following guidelines. Contributors are more than welcome to share your learnings with others from centralized location.

## Code of Conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information, see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/)
or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Question or Problem?

Please do not open GitHub issues for general support questions as the GitHub list should be used for feature requests and bug reports. This way we can more easily track actual issues or bugs from the code and keep the general discussion separate from the actual code.  

## Community calls and demos

Join the [weekly community calls](https://aka.ms/community/calls) for Copilot, Microsoft 365, and Power Platform updates. Everyone is welcome.

You can also [sign up for a community demo](https://aka.ms/community/request/demo) to share your learnings and input.

## Typos, Issues, Bugs and contributions

Whenever you are submitting any changes to the SharePoint repositories, please follow these recommendations.

* Always fork repository to your own account for applying modifications
* Do not combine multiple changes to one pull request, please submit for example any samples and documentation updates using separate PRs
* If you are submitting multiple sample solutions, please create specific PR for each of them
* If you are submitting typo or documentation fix, you can combine modifications to single PR where suitable

## Submitting changes as pull requests

Here's a high level process for submitting new samples or updates to existing ones.

1. Sign the Contributor License Agreement when prompted by the pull request checks
2. Fork the main repository to your GitHub account
3. Create a new branch in your fork based on the repository's default `master` branch
4. Include your changes to your branch
5. Commit your changes using a descriptive commit message
6. Create a pull request from your contribution branch to the `master` branch in this repository
7. Fill out the provided PR template with the requested details

> note. Delete the feature specific branch only AFTER your pull request has been processed.

## Sample naming and structure guidelines

When you are submitting a new sample, it has to follow up below guidelines

- Each sample must include a `README.md` file in its solution folder, based on the [provided template](../solutions/README-template.md). Complete the solution folder and author details in the **Solution** table and replace the remaining template content.
    - Include a picture of the sample in use ("pics or it didn't happen"). Store preview images in the `assets` folder at the root of your solution.
- The README must include the visitor tracking image as its final entry: `<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-solutions/{solution-path}" />`. This transparent image is used to track the popularity of individual samples in GitHub.
    - Replace `{solution-path}` with the repository-relative path to the solution folder, including `solutions/` and any nested folders. For example, the `solutions/ChangeRequests` sample uses `https://m365-visitor-stats.azurewebsites.net/sp-dev-solutions/solutions/ChangeRequests`.
- If you find already similar kind of sample from the existing samples, we would appreciate you to rather extend existing one, than submitting a new similar sample
    - When you update existing samples, please update also README accordingly with information on provided changes and with your author details
- Place each new sample in its own folder under `solutions/` and name the folder according to the primary functionality
    - Name your folder based on the primary functionality of the component - for example, "ContactManagement"
    - Do not use words "sample", "solution", "extension", "webpart" or "wb" in the folder or sample name
- Do not use period/dot in the folder name of the provided sample

## Step-by-step on submitting a pull request to this repository

See GitHub's guide to [creating a pull request from a fork](https://docs.github.com/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork).

## Merging your existing github projects with this repository

If the sample you wish to contribute is stored in your own Github repository, you can use the following steps to merge it with the sp-dev-solutions repository:

* Fork the sp-dev-solutions repository from GitHub
* Create a local git repository 

```
md sp-dev-solutions
cd sp-dev-solutions
git init
```

* Pull your forked copy of sp-dev-solutions into your local repository

```
git remote add origin https://github.com/yourgitaccount/sp-dev-solutions.git
git pull origin master
```

* Pull your other project from github into the `solutions` folder of your local copy of sp-dev-solutions

```  
git subtree add --prefix=solutions/projectname https://github.com/yourgitaccount/projectname.git project-default-branch
```

* Push the changes up to your forked repository

```
git push origin your-feature-branch
```

Thank you for your contribution.  

> Sharing is caring. 