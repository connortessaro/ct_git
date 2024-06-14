# Git Class Simulation

This repository contains a simple simulation of a Git version control system implemented in JavaScript. It provides basic functionalities such as committing changes, creating and checking out branches, and viewing commit history.

## Classes

### Commit
Represents a single commit in the repository.
- **Properties:**
  - `id` (Number): The unique identifier for the commit.
  - `parent` (Commit | null): The parent commit.
  - `message` (String): The commit message.

```javascript
class Commit {
	constructor(id, parent, message) {
		this.id = id;
		this.parent = parent;
		this.message = message;
	}
}
```

### Branch
Represents a branch in the repository.
- **Properties:**
  - `name` (String): The name of the branch.
  - `commit` (Commit | null): The latest commit on the branch.

```javascript
class Branch {
	constructor(name, commit) {
		this.name = name;
		this.commit = commit;
	}
}
```

### Git
Represents the Git repository itself.
- **Properties:**
  - `name` (String): The name of the repository.
  - `lastCommitId` (Number): The ID of the last commit made.
  - `branches` (Array): A list of branches in the repository.
  - `HEAD` (Branch): The currently active branch.
  
- **Methods:**
  - `commit(message)`: Creates a new commit with the given message.
  - `checkout(branchName)`: Switches to the specified branch or creates a new one if it doesn't exist.
  - `log()`: Returns the commit history of the current branch.

```javascript
class Git {
	constructor(name) {
		this.name = name;
		this.lastCommitId = -1;
		this.branches = [];
		const master = new Branch('master', null);
		this.branches.push(master);
		this.HEAD = master;
	}

	commit(message) {
		const commit = new Commit(++this.lastCommitId, this.HEAD.commit, message);
		this.HEAD.commit = commit;
		return commit;
	}

	checkout(branchName) {
		for (let i = this.branches.length - 1; i >= 0; i--) {
			if (this.branches[i].name === branchName) {
				this.HEAD = this.branches[i];
				return this;
			}
		}
		const newBranch = new Branch(branchName, this.HEAD.commit);
		this.branches.push(newBranch);
		this.HEAD = newBranch;
		return this;
	}

	log() {
		let commit = this.HEAD.commit;
		const history = [];
		while (commit) {
			history.push(commit);
			commit = commit.parent;
		}
		return history;
	}
}
```

## Usage Example

```javascript
// Create a new Git repository
const repo = new Git('myrepo');

// Make an initial commit
repo.commit('Initial commit');

// Create and switch to a new branch 'newFeature'
repo.checkout('newFeature');

// Make a commit on the 'newFeature' branch
repo.commit('Added new feature');

// Retrieve and log the commit history
const history = repo.log();
console.log(history);
```

## License

This project is licensed under the MIT License.
