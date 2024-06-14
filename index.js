class Commit {
	constructor(id, parent, message) {
		this.id = id;
		this.parent = parent;
		this.message = message;
	}
}

class Branch {
	constructor(name, commit) {
		this.name = name;
		this.commit = commit;
	}
}

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

// Usage
const repo = new Git('myrepo');
repo.commit('Initial commit');
repo.checkout('newFeature');
repo.commit('Added new feature');
const history = repo.log();
console.log(history);
