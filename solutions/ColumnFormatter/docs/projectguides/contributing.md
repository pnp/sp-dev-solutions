# Contribution guidelines

We appreciate that you're interested in helping with moving the project forward. Before you submit your first Pull Request (PR), please read the following guide. We'd hate to see you work on something that someone else is already working on, something that we agreed not to do or something that doesn't match the project.

Sharing is caring!

## You have an idea for a new feature

Aw yeah! Good ideas are invaluable for every product. Before you get too far, however, please check if there are any similar ideas already listed in the [issue list](https://github.com/SharePoint/sp-dev-solutions/issues). If not, please create a new issue describing your idea. Once we agree on the feature scope and architecture, the feature will be ready for building. Don't hesitate to mention in the issue if you'd like to build the feature yourself. This is not a strict requirement, just a good idea.

Avoid sumbitmitting multiple feature/bug fixes in a single PR, those are hard to sort through and discuss. Just submit multiple PRs.

Once you've built the feature, please provide any [documentation](../documentation/docs/index.md) updates/additions as make sense to ensure your feature is easy to use.

## You have a suggestion for improving an existing "feature"

If you have an idea how to improve the project or you've found a bug, let us know by submitting an issue in the [issue list](https://github.com/SharePoint/sp-dev-solutions/issues). Some things are done for a reason, but some are not. Let's discuss what you think and see how the project could be improved for everyone.

If you want to tackle the bug or improvement, be sure to note that as well so we don't overlap efforts. You can always decide to do that later by adding a comment (the important thing is to get the bug identified).

Be sure to provide as much detail as possible so that we can reproduce the issue or understand the problem. If a similar issue already exists but doesn't have enough detail or doesn't cover your specific situation, feel free to add a comment or a +1.

**This isn't a super formal process (so don't worry about getting it all right), we're just trying to make sure this stuff works!**

## Fixing typos

Found a typo in the documents? LIES! Just kidding, it totally hapens.

Typos are easy to make and easy to fix and we'd love for you to do that. The good news is you don't even have to fork/clone the project to do it! Just hit the edit button on the document you want to correct, make the changes, and submit a pull request (targeting the Dev branch). Updates to documentation should generally be a single pull request per document. This makes it easier to merge.

## Tips

Before contributing:

- ensure that the **dev** branch on your fork is in sync with the original **sp-dev-solutions** repository
    ```sh
    # assuming you are in the folder of your locally cloned fork....
    git checkout dev

    # assuming you have a remote named `upstream` pointing to the official **sp-dev-solutions** repo
    git fetch upstream

    # update your local dev to be a mirror of what's in the main repo
    git pull --rebase upstream dev
    ```

- create a feature branch for your change. If you get stuck on an issue or merging your PR will take a while, this will allow you to have a clean dev branch that you can use for contributing other changes
    ```sh
    git checkout -b my-contribution
    ```

## DO's & DON'Ts

- **DO** follow the same project and structure as the existing project.
- **DO** keep discussions focused. When a new or related topic comes up it's often better to create new issue than to side track the conversation.
- **DO** feel free to ask questions if you're not sure where something fits or how to do it
- **DO** add comments that make it easy to understand your code
- **DO NOT** feel intimidated if you're new to github or contributing, we've all submitted pull requests targeting master at some point. If you make a mistake, we'll help you (you won't break the project). We'd rather have your contribution (code, issue, or otherwise) than excessivly worry about formalities. Of course, try to follow them when you can since they make things much easier in the long run.
- **DO NOT** submit PR's for coding style changes.
- **DO NOT** surprise us with big PR's. Instead file an issue & start a discussion so we can agree on a direction before you invest a large amount of time.
- **DO NOT** commit code you didn't write.
- **DO NOT** submit PR's that refactor existing code without a discussion first.

<img src="https://telemetry.sharepointpnp.com/sp-dev-solutions/solutions/ColumnFormatter/guides/Contributing" />