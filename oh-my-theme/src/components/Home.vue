<template>
  <el-row :gutter="12">
    <el-col :span="2" v-for="part, idx in _p.parts" :key="idx">
      <el-card shadow="hover" :style="part.get_style(true)" @click="on_open_detail(idx)"> {{ part.show(true) }} </el-card>
    </el-col>
    <el-col :span="4">
      <el-card shadow="hover" style="background-color: green;" @click="on_new_part()"> New </el-card>
    </el-col>
  </el-row>

  <!-- Form -->

  <el-dialog v-model="dialogFormVisible" title="oh-my-theme">
    <el-form :model="form">

      <el-form-item label="Cond-Type" :label-width="formLabelWidth">
        <el-select v-model="form.cond_type" placeholder="Please select a cond_type">
          <el-option label="None" value="None" />
          <el-option v-for="cond in global_cond_types" :label="cond.k" :value="cond.v" />
        </el-select>
      </el-form-item>

      <el-form-item label="cond-n" :label-width="formLabelWidth">
        <el-input-number v-model="form.cond_n" autocomplete="off" />
      </el-form-item>

      <!-- success -->
      <el-form-item label="success-Type" :label-width="formLabelWidth">
        <el-select v-model="form.success_type" placeholder="Please select a type">
          <el-option v-for="cond in global_escape_types" :label="cond.k" :value="cond.k" />
        </el-select>
      </el-form-item>

      <el-form-item label="success-value" :label-width="formLabelWidth">
        <el-input v-model="form.success_value" autocomplete="off" :disabled="form.success_type != 'Const'" />
      </el-form-item>

      <el-form-item label="success-color" :label-width="formLabelWidth">
        <el-color-picker v-model="form.success_color" />
      </el-form-item>

      <el-form-item label="success-reset" :label-width="formLabelWidth">
        <el-switch v-model="form.success_reset" />
      </el-form-item>

      <!-- fail -->
      <el-form-item label="fail-Type" :label-width="formLabelWidth">
        <el-select v-model="form.fail_type" placeholder="Please select a type">
          <el-option v-for="cond in global_escape_types" :label="cond.k" :value="cond.k" />
        </el-select>
      </el-form-item>

      <el-form-item label="fail-value" :label-width="formLabelWidth">
        <el-input v-model="form.fail_value" autocomplete="off" :disabled="form.fail_type != 'Const'" />
      </el-form-item>

      <el-form-item label="fail-color" :label-width="formLabelWidth">
        <el-color-picker v-model="form.fail_color" />
      </el-form-item>

      <el-form-item label="fail-reset" :label-width="formLabelWidth">
        <el-switch v-model="form.fail_reset" />
      </el-form-item>

    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="on_cancel_dialog()">Cancel</el-button>
        <el-button type="primary" @click="on_dialog_submit(-1)">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>

  <div class="editor">
    <div class="code" @click="copy()">
      <p>{{ _p.to_string() }}</p>
    </div>
  </div>
</template>
  
<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
import { Prompt, new_part, Cond, Value } from '../core/prompt'
import { global_cond_types, global_escape_types } from '../core/const'
import { hexToAnsi, ansiToHex } from '../core/color'


const dialogFormVisible = ref(false)
const formLabelWidth = '240px'
const _p = ref(new Prompt())

const form = reactive({
  cond_type: '',
  cond_n: 0,

  success_type: '',
  success_value: '',
  success_color: '',
  success_reset: false,

  fail_type: '',
  fail_value: '',
  fail_color: '',
  fail_reset: false,
})

function reset_form() {
  form.cond_type = 'None'
  form.cond_n = 0

  form.success_type = ''
  form.success_value = ''
  form.success_color = ''
  form.success_reset = false

  form.fail_type = ''
  form.fail_value = ''
  form.fail_color = ''
  form.fail_reset = false
}

function set_form(idx: number) {
  let part = _p.value.parts[idx]
  if (!part) {
    return
  }
  if (part.cond) {
    form.cond_type = part.cond.type
    form.cond_n = part.cond.n
  }

  if (part.success_v) {
    form.success_type = part.success_v.t
    form.success_value = part.success_v.v
    form.success_color = ansiToHex(part.success_v.color)
    form.success_reset = part.success_v.reset_color
  }


  if (part.fail_v) {
    form.fail_type = part.fail_v.t
    form.fail_value = part.fail_v.v
    form.fail_color = ansiToHex(part.fail_v.color)
    form.fail_reset = part.fail_v.reset_color
  }
}

function on_dialog_submit(idx: number) {
  dialogFormVisible.value = false
  if (idx != -1) {
    return
  }
  let cond: Cond | undefined
  let fail: Value | undefined
  if (form.cond_type != "None" && form.cond_type != "") {
    cond = new Cond(form.cond_type, form.cond_n)
    fail = new Value(form.fail_type, form.fail_value, hexToAnsi(form.fail_color), form.fail_reset)
  }
  _p.value.push(new_part(form.success_type, form.success_value,
    hexToAnsi(form.success_color), form.success_reset, cond, fail))
  console.log(_p);
}

function on_cancel_dialog() {
  dialogFormVisible.value = false
  reset_form()
}

function on_open_detail(idx: number) {
  reset_form()
  set_form(idx)
  dialogFormVisible.value = true
}

function on_new_part() {
  reset_form()
  dialogFormVisible.value = true
}

function copy() {
  const textarea = document.createElement("textarea")
  textarea.value = _p.value.to_string()
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand("copy")
  document.body.removeChild(textarea)
  success_msg("copy success!")
}



const success_msg = (msg:string) => {
  ElNotification({
    title: 'Success',
    message: msg,
    type: 'success',
  })
}

_p.value.push(new_part("Const", "["))
_p.value.push(new_part("DATE1"))
_p.value.push(new_part("Const", "] "))
_p.value.push(new_part("PWD1", "", 107, true))
_p.value.push(new_part("Const", " >> "))
console.log(_p);
</script>

<style scoped>
.editor {
  background-color: #1b1b1b;
  margin-top: 3%;
  margin-left: 3%;
  width: 94%;
}

.code {
  height: 60px;
  width: 98%;
  margin-left: 1%;
  display: flex;
  align-items: center;
  color: #eeeeee;
  font-size: larger;
}
</style>
  