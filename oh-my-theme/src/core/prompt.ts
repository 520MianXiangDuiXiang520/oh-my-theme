import * as _const from "./const"
import * as _color from "./color"
export class Cond {
    type: string
    n: number

    constructor(tp: string, n?: number) {
        this.type = tp
        this.n = n ? n : 0
    }

    to_string(): string {
        return this.n == 0 ? this.type : `${this.n}${this.type}`
    }
}

export class Value {
    t: string
    v: string
    color: number = 0
    reset_color: boolean

    constructor(t:string, v?: string, c?: number, resetColor?: boolean) {
        this.t = t
        this.v = v?v:_const.prompt_type_to_value.get(t).v
        this.color = c ? c : 0
        this.reset_color = resetColor ? true : false
    }

    public set_color(c: number) {
        this.color = c
    }

    to_string(): string {
        let res = ""
        if (this.color > 0) {
            res = `$FG[${this.color}]`
        }
        res += this.v
        return this.reset_color ? res + "%{$reset_color%}" : res
    }
}

export class Part {
    cond: Cond | undefined
    success_v: Value
    fail_v: Value | undefined

    constructor(sv: Value, c?: Cond, fv?: Value) {
        this.success_v = sv
        this.fail_v = fv
        this.cond = c
    }

    to_string(): string {
        if (!this.cond) {
            return this.success_v.to_string()
        }
        return `%${this.cond.to_string()}${SPLIT_CHAR}${this.success_v.to_string()}${SPLIT_CHAR}${this.fail_v?.to_string()}`
    }

    public show(success:boolean): string {
        let v = success?this.success_v:this.fail_v
        return v?.t?v.t:"UnKnow"
    }

    public get_style(success:boolean):string {
        let v = success?this.success_v:this.fail_v
        let color = v?.t?v.color:0
        let rgb = _color.ansi256ToRgb(color)
        return color>0?`background-color: RGB(${rgb[0]},${rgb[1]},${rgb[2]})`:""
    }
}

const SPLIT_CHAR = ":"

export function new_part(t: string, v?: string, color?: number, reset_color?: boolean,
    cond?: Cond, fail_v?: Value): Part {
    let sv = new Value(t, v, color, reset_color)
    return new Part(sv, cond, fail_v)
}

export class Prompt {
    public parts: Part[]

    constructor() {
        this.parts = []
    }

    push(p: Part) {
        this.parts.push(p)
    }

    to_string(): string {
        let res = "PROMPT=\""
        this.parts.forEach(function (v: Part) { res += v.to_string() })
        return res+"\""
    }
}