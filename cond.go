package main

import "fmt"

// https://zsh.sourceforge.io/Doc/Release/Prompt-Expansion.html#Conditional-Substrings-in-Prompts
const (
	// CondPrivileges True if the shell is running with privileges.
	CondPrivileges CondOp = "!"

	// CondEffectiveUid	True if the effective uid of the current process is n.
	CondEffectiveUid CondOp = "#"

	CondExitStatus CondOp = "?"
	// CondExitStatus True if the exit status of the last command was n.

	CondShellConstructs CondOp = "_"
	// True if at least n shell constructs were started.

	// CondAbsRootDirOffset True if the current absolute path has at
	// least n elements relative to the root directory, hence / is counted as 0 elements.
	CondAbsRootDirOffset CondOp = "/"

	// CondRootDirOffset True if the current path, with prefix replacement,
	// has at least n elements relative to the root directory, hence / is counted as 0 elements.
	CondRootDirOffset CondOp = "."

	// CondMonth True if the month is equal to n (January = 0).
	CondMonth CondOp = "D"

	// CondDay True if the day of the month is equal to n.
	CondDay CondOp = "d"

	// CondEvalDepth True if the evaluation depth is at least n.
	CondEvalDepth CondOp = "e"

	// CondGid True if the effective gid of the current process is n.
	CondGid CondOp = "g"

	// CondJobs True if the number of jobs is at least n.
	CondJobs CondOp = "j"

	// CondSHLVLLeastN True if the SHLVL parameter is at least n.
	CondSHLVLLeastN CondOp = "L"

	// CondLineN True if at least n characters have already been printed on the current line.
	// When n is negative, true if at least abs(n) characters remain before the
	// opposite margin (thus the left margin for RPROMPT).
	CondLineN CondOp = "l"

	// CondSECONDSLeastN True if the SECONDS parameter is at least n.
	CondSECONDSLeastN CondOp = "S"

	// CondHours True if the time in hours is equal to n.
	CondHours CondOp = "T"

	// CondMinutes True if the time in minutes is equal to n.
	CondMinutes CondOp = "t"

	// CondPAVARLeastN True if the array psvar has at least n elements.
	CondPAVARLeastN CondOp = "v"

	// CondPSVARNSet True if element n of the array psvar is set and non-empty.
	CondPSVARNSet CondOp = "V"

	// CondWeek True if the day of the week is equal to n (Sunday = 0).
	CondWeek CondOp = "w"
)

type Cond struct {
	Op CondOp `json:"op"`
	N  int
}

func (c Cond) String() string {
	return fmt.Sprintf("%d%s", c.N, c.Op)
}
