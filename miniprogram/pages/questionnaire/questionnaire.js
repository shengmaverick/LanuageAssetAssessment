// pages/questionnaire/questionnaire.js
const questionData = require('../../utils/questionData.js')
const app = getApp()

Page({
  data: {
    dimensions: [],
    currentDimIndex: 0,
    currentQuestions: [],
    answers: {},
    totalAnswered: 0,
    totalQuestions: 20,
    progressPercent: 0,
    canPrev: false,
    canNext: false,
    isLastDim: false,
    submitting: false,
    dimStatus: [], // 每个维度的完成状态和答题数
    currentDimAnswered: 0
  },

  onLoad() {
    this.initQuestionnaire()
  },

  initQuestionnaire() {
    const dims = questionData.dimensions
    const answers = app.globalData.answers || {}

    let totalAnswered = Object.keys(answers).length
    const dimStatus = this.calcDimStatus(dims, answers)

    this.setData({
      dimensions: dims,
      answers: answers,
      totalAnswered: totalAnswered,
      progressPercent: Math.round(totalAnswered / 20 * 100),
      dimStatus: dimStatus
    })

    this.loadDimension(0)
  },

  calcDimStatus(dims, answers) {
    return dims.map(dim => {
      const answered = dim.questions.filter(q => answers[q.id] !== undefined).length
      return {
        answered,
        total: dim.questions.length,
        done: answered === dim.questions.length
      }
    })
  },

  loadDimension(index) {
    const dims = this.data.dimensions
    const dim = dims[index]
    const answers = this.data.answers

    const questions = dim.questions.map(q => ({
      ...q,
      selectedOption: answers[q.id] ? answers[q.id].label : null
    }))

    const currentDimAnswered = questions.filter(q => q.selectedOption !== null).length

    this.setData({
      currentDimIndex: index,
      currentQuestions: questions,
      canPrev: index > 0,
      canNext: this.isDimCompleteFromAnswers(index, answers),
      isLastDim: index === dims.length - 1,
      currentDimAnswered
    })
  },

  isDimCompleteFromAnswers(dimIndex, answers) {
    const dim = this.data.dimensions[dimIndex]
    return dim.questions.every(q => answers[q.id] !== undefined)
  },

  selectOption(e) {
    const { qid, score, optionLabel } = e.currentTarget.dataset
    const answers = { ...this.data.answers }
    const wasAnswered = answers[qid] !== undefined

    answers[qid] = { score: parseInt(score), label: optionLabel }

    const questions = this.data.currentQuestions.map(q => {
      if (q.id === qid) {
        return { ...q, selectedOption: optionLabel }
      }
      return q
    })

    let totalAnswered = this.data.totalAnswered
    if (!wasAnswered) {
      totalAnswered += 1
    }

    const dimStatus = this.calcDimStatus(this.data.dimensions, answers)
    const currentDimAnswered = questions.filter(q => q.selectedOption !== null).length

    app.globalData.answers = answers

    this.setData({
      answers,
      currentQuestions: questions,
      totalAnswered,
      progressPercent: Math.round(totalAnswered / 20 * 100),
      canNext: this.isDimCompleteFromAnswers(this.data.currentDimIndex, answers),
      dimStatus,
      currentDimAnswered
    })
  },

  goNext() {
    const next = this.data.currentDimIndex + 1
    if (next < this.data.dimensions.length) {
      this.loadDimension(next)
      wx.pageScrollTo({ scrollTop: 0, duration: 200 })
    }
  },

  goPrev() {
    const prev = this.data.currentDimIndex - 1
    if (prev >= 0) {
      this.loadDimension(prev)
      wx.pageScrollTo({ scrollTop: 0, duration: 200 })
    }
  },

  goToDim(e) {
    const index = parseInt(e.currentTarget.dataset.index)
    this.loadDimension(index)
    wx.pageScrollTo({ scrollTop: 0, duration: 200 })
  },

  submitQuestionnaire() {
    const { answers, dimensions } = this.data
    const allQIds = dimensions.flatMap(d => d.questions.map(q => q.id))
    const unansweredCount = allQIds.filter(id => !answers[id]).length

    if (unansweredCount > 0) {
      wx.showModal({
        title: '还有题目未完成',
        content: `还有 ${unansweredCount} 道题未作答，请完成全部题目后提交。`,
        showCancel: true,
        cancelText: '继续作答',
        confirmText: '我知道了'
      })
      return
    }

    this.setData({ submitting: true })

    let totalScore = 0
    const dimScores = dimensions.map(dim => {
      let dimScore = 0
      dim.questions.forEach(q => {
        const ans = answers[q.id]
        if (ans) dimScore += ans.score
      })
      totalScore += dimScore
      return {
        name: dim.name,
        icon: dim.icon,
        color: dim.color,
        lightColor: dim.lightColor,
        score: dimScore,
        maxScore: dim.questions.length * 5,
        percent: Math.round(dimScore / (dim.questions.length * 5) * 100)
      }
    })

    app.globalData.result = {
      totalScore,
      dimScores,
      formData: app.globalData.formData,
      answers: app.globalData.answers,
      submitTime: new Date().toLocaleString('zh-CN')
    }

    wx.redirectTo({ url: '/pages/result/result' })
  }
})
