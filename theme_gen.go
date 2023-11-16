package main

import (
	"bytes"
	"fmt"
)

type CondOp string

const SplitChar = ":"

type PromptGenerator struct {
	PromptEscapesList []*PromptEscapes `json:"PromptEscapes_list"`
}

func (p *PromptGenerator) String() string {
	buffer := bytes.NewBufferString("PROMPT=\"")
	for _, PromptEscapes := range p.PromptEscapesList {
		buffer.WriteString(PromptEscapes.String())
	}
	buffer.WriteByte('"')
	return buffer.String()
}

func main() {
	ps := &PromptGenerator{PromptEscapesList: []*PromptEscapes{
		NewConst("[", -1, false),
		NewNoCond(PromptEscapesTypeDATE2, "", -1, false),
		NewConst("] ", -1, false),
		NewNoCond(PromptEscapesTypePWD1, "", 107, true),
		NewConst(" (", -1, false),
		NewNoCond(PromptEscapesTypeGitBranch, "", 207, true),
		NewNoCond(PromptEscapesTypeGitDirty, "", 207, true),
		NewConst(")", -1, false),
		{
			Cond:          &Cond{Op: CondExitStatus},
			SuccessPrompt: NewPrompt(PromptEscapesConst, " >> ", 90, true),
			FailPrompt:    NewPrompt(PromptEscapesConst, " >> ", 190, true),
		},
	}}
	fmt.Println(ps.String())

}
