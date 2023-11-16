package main

import "fmt"

const (
	PromptEscapesConst          = "CONST"
	PromptEscapesName           = "%m"
	PromptEscapesFullName       = "%M"
	PromptEscapesSimpleUserName = "%n"
	PromptEscapesTypePWD1       = "%~" // ~/Project
	PromptEscapesTypePWD2       = "%d" // /home/root/Project
	PromptEscapesTypePWD3       = "%c" // Project

	PromptEscapesTypeGitBranch   = "$(current_branch)"  // master
	PromptEscapesTypeGitDirty    = "$(parse_git_dirty)" // *
	PromptEscapesTypeGitShortSha = "$(git_prompt_short_sha)"
	PromptEscapesTypeGitLongSha  = "$(git_prompt_long_sha)"

	PromptEscapesTypeDATE1 = "%D{%Y-%m-%d}" // 2023-03-01
	PromptEscapesTypeDATE2 = "%D{%Y/%m/%d}" // 2023/03/01
	PromptEscapesTypeTIME1 = "%*"           // 19:18:12
	PromptEscapesTypeTIME2 = "%t"           // 7:18PM
	PromptEscapesTypeTIME3 = "%T"           // 19:18
)

type PromptEscapes struct {
	Cond          *Cond   `json:"cond"`
	SuccessPrompt *Prompt `json:"success_Prompt"`
	FailPrompt    *Prompt `json:"fail_Prompt"`
}

func (s PromptEscapes) String() string {
	if s.Cond == nil {
		return s.SuccessPrompt.String()
	}
	return "%" + fmt.Sprintf("(%s%s%s%s%s)",
		s.Cond.String(), SplitChar, s.SuccessPrompt.String(), SplitChar, s.FailPrompt)
}

type Prompt struct {
	Type  string `json:"type"`
	Value string `json:"value"`
	Color Color  `json:"color"`
}

func NewPrompt(tp string, v string, color int16, resetColor bool) *Prompt {
	return &Prompt{
		Type:  tp,
		Value: v,
		Color: Color{C: color, Reset: resetColor},
	}
}

func NewConst(v string, color int16, resetColor bool) *PromptEscapes {
	return NewNoCond(PromptEscapesConst, v, color, resetColor)
}

func NewNoCond(tp, v string, color int16, resetColor bool) *PromptEscapes {
	return &PromptEscapes{
		Cond:          nil,
		SuccessPrompt: NewPrompt(tp, v, color, resetColor),
		FailPrompt:    nil,
	}
}

func (s *Prompt) GetValue() string {

	if s.Type == PromptEscapesConst {
		return s.Value
	}
	return s.Type
}

func (s *Prompt) String() string {
	res := s.Color.String() + s.GetValue()
	if s.Color.Reset {
		res += "%{$reset_color%}"
	}
	return res
}
