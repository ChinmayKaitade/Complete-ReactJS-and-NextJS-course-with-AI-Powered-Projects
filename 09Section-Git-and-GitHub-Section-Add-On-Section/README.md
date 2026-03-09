## 🧑‍💻 Git and GitHub Section – Add On

This section introduces **version control using Git** and collaboration using **GitHub**.
These tools are essential for **professional development and team collaboration**. 🚀

---

## 📚 Introduction to Git Series

**Git** is a distributed version control system used to:

- Track code changes 📝
- Collaborate with teams 👥
- Maintain project history 📜

Developers use **GitHub** to store and share Git repositories online.

Basic workflow:

```
Code → Git → GitHub → Collaboration
```

---

## 📁 Git Init and Hidden Folder

To start tracking a project with Git:

```bash
git init
```

This command creates a hidden folder:

```
.git
```

The `.git` folder contains:

- Commit history 📜
- Branch information 🌿
- Repository configuration ⚙️

This folder is the **brain of your Git repository**. 🧠

---

## 📝 Git Commits and Logs

A **commit** saves a snapshot of your project.

Basic workflow:

```bash
git add .
git commit -m "Initial commit"
```

View commit history:

```bash
git log
```

This shows:

- Commit ID 🔑
- Author 👤
- Date 📅
- Message 📝

---

## ⚙️ Git Internal Working and Configs

Git works using three main stages:

```
Working Directory → Staging Area → Repository
```

Commands involved:

| Stage                | Command      |
| -------------------- | ------------ |
| Working → Staging    | `git add`    |
| Staging → Repository | `git commit` |

Configure Git identity:

```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

---

## 🔀 Git Merge and Git Conflicts

When combining branches:

```bash
git merge feature-branch
```

Sometimes **merge conflicts** happen when two developers change the same code.

Example conflict markers:

```
<<<<<<< HEAD
Your code
=======
Other branch code
>>>>>>> feature
```

You must manually resolve the conflict and commit again.

---

## 🔍 Git Diff and Stashing

### Git Diff

Shows changes between files:

```bash
git diff
```

Useful for reviewing code changes. 🔎

---

### Git Stash

Temporarily saves unfinished work.

```bash
git stash
```

Restore later:

```bash
git stash pop
```

Useful when switching branches quickly. ⚡

---

## 🔁 Git Rebase (Not That Scary)

**Rebase** rewrites commit history to make it cleaner.

Example:

```bash
git rebase main
```

Benefits:

- Cleaner commit history 🧹
- Linear project timeline 📈
- Better collaboration in teams 👥

---

## ☁️ Pushing Code to GitHub

Typical workflow:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin repo-url
git push -u origin main
```

Now your project is stored on **GitHub** and accessible online. 🌍

---

## 🤝 Pull Requests and Open Source Contribution

A **Pull Request (PR)** is used to propose changes to a repository.

Steps:

1. Fork repository 🍴
2. Clone it locally 💻
3. Create a new branch 🌿
4. Make changes ✏️
5. Push code to GitHub ☁️
6. Open a **Pull Request** 🔁

Maintainers will:

- Review your code 👀
- Suggest changes 💬
- Merge it into the main project ✅

---

## 🚀 What You’ll Learn in This Section

By the end, you’ll know how to:

- Use Git for version control 🧠
- Track commits and history 📜
- Handle merge conflicts 🔀
- Use advanced tools like stash and rebase 🔁
- Collaborate using GitHub pull requests 🤝
