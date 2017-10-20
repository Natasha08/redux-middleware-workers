# redux-middleware-workers development process

## Issue/Feature Development

1. Pick/Create an issue and begin work on it.

    if creating an issue, adhere to the [issue template](See [ISSUE_TEMPLATE.md](ISSUE_TEMPLATE.md)

    Example:

     `[#0001](https://github.com/Natasha08/redux-middleware-workers/issues/0001)`

2. Create a local branch in your development environment to work on the story.

    Example:

        $ git checkout master
        $ git pull
        $ git checkout -b 0001-test-issue

3. Create a test for your issue/feature.
4. Implement your feature and satisfy relevant test(s).
5. Repeat 3 and 4 as needed.

    At the end of the day, WIP commit any pending work, preferably after an iteration of step 4, so that the tests guide the developer on how to complete the WIP work.

6. Run the entire test suite. `yarn test` or `npm test`

    Make sure your changes don't break anything else.  Fix anything broken.

5. Commit branch to GitHub.

    Example:

        $ git add .     # make sure you only add what should be added
                        # add things to .gitignore if needed
        $ git diff      # sanity check changes
        $ git commit -am '#140087205: implement logo uploads'
        $ git push

6. Create a pull request using the template.

    Use `master` as the root branch

    Prefix the title of your PR with the issue number.

    See [Pull Request Template](PULL_REQUEST_TEMPLATE.md)

7. Ask one of the main contributors to review your code.

8. Make any necessary changes.

    Address PR review comments. Any ignored comments should be discussed.

9. Repeat 7 and 8 as needed.

10. Request code merge.

    When you have thoroughly addressed the main contributor(s) comments, request code merge.
