# Pull repo from git

1. cd into local directory
2. initialize new repo `$ git init`
3. clone repository `git clone <url>`
4.

# git-workflow

work-flow learning for using github

Before creating a new branch, pull the changes from upstream. Your master needs to be up to date.

Create git

```
$ git checkout -b [name_of_your_new_branch]
```

Change working branch :

```
$ git checkout [name_of_your_new_branch]
```

Push the branch on github :

```
$ git push origin [name_of_your_new_branch]
```

You can see all branches created by using :

```
git branch
```

# Merging Branches

You can run your tests, make sure the hotfix is what you want, and finally merge the hotfix branch back into your master branch to deploy to production. You do this with the git merge command:

```
$ git checkout [default branch]
$ git merge hotfix
```

# delete local branch after use

```
$ git branch -d [hotfix]
```

# delete remote branch after use

```
$git git push origin --delete [branch_name]
```
