export class ConstView {
    public k: string
    public v: string
    public desc: string
    constructor(k: string, v: string, d: string) {
        this.k = k
        this.v = v
        this.desc = d
    }
}

export let cond_type_to_value = new Map()
export let prompt_type_to_value = new Map()

function init_prompt(k: string, v: string, d: string):ConstView {
    let res = new ConstView(k, v, d)
    prompt_type_to_value.set(res.k, res)
    return res
}

function init_cond(k: string, v: string, d: string):ConstView {
    let res = new ConstView(k, v, d)
    cond_type_to_value.set(res.k, res)
    return res
}

export const global_cond_types: ConstView[] = [
    init_cond("CondPrivileges", "!", "True if the shell is running with privileges."),
    init_cond("CondEffectiveUid", "#", "True if the effective uid of the current process is n."),
    init_cond("CondExitStatus", "?", "True if the exit status of the last command was n."),
    init_cond("CondShellConstructs", "_", "True if at least n shell constructs were started."),
    init_cond("CondAbsRootDirOffset", "/", "True if the current absolute path has at least n \
     elements relative to the root directory, hence / is counted as 0 elements."),
    init_cond("CondRootDirOffset", ".", "True if the current path, with prefix replacement, \
     has at least n elements relative to the root directory, hence / is counted as 0 elements."),
    init_cond("CondMonth", "D", "True if the month is equal to n (January=0)."),
    init_cond("CondDay", "d", "True if the day of the month is equal to n."),
    init_cond("CondEvalDepth", "e", "True if the evaluation depth is at least n."),
    init_cond("CondGid", "g", "True if the effective gid of the current process is n."),
    init_cond("CondJobs", "j", "True if the number of jobs is at least n."),
    init_cond("CondSHLVLLeastN", "L", "True if the SHLVL parameter is at least n."),
    init_cond("CondLineN", "l", "True if at least n characters have already been printed on\
     the current line. When n is negative, true if at least abs(n) characters remain before\
     the opposite margin (thus the left margin for RPROMPT)."),
    init_cond("CondSECONDSLeastN", "S", "True if the SECONDS parameter is at least n."),
    init_cond("CondHours", "T", "True if the time in hours is equal to n."),
    init_cond("CondMinutes", "t", "True if the time in minutes is equal to n."),
    init_cond("CondPAVARLeastN", "v", "True if the array psvar has at least n elements."),
    init_cond("CondPSVARNSet", "V", "True if element n of the array psvar is set and non-empty."),
    init_cond("CondWeek", "w", "True if the day of the week is equal to n (Sunday=0)."),
]

export const global_escape_types: ConstView[] = [
    init_prompt("Const", "", ""),
    init_prompt("Name", "%m", ""),
    init_prompt("FullName", "%M", ""),
    init_prompt("SimpleUserName", "%n", ""),
    init_prompt("PWD1", "%~", "~/Project"),
    init_prompt("PWD2", "%d", "/home/root/Project"),
    init_prompt("PWD3", "%c", "Project"),
    init_prompt("GitBranch", "$(current_branch)", ""),
    init_prompt("GitDirty", "$(parse_git_dirty)", ""),
    init_prompt("GitShortSha", "$(git_prompt_short_sha)", ""),
    init_prompt("GitLongSha", "$(git_prompt_long_sha)", ""),
    init_prompt("DATE1", "%D{%Y-%m-%d}", "2023-03-01"),
    init_prompt("DATE2", "%D{%Y/%m/%d}", "2023/03/01"),
    init_prompt("TIME1", "%*", "19:18:12"),
    init_prompt("TIME2", "%t", "7:18PM"),
    init_prompt("TIME3", "%T", "19:18"),
]



