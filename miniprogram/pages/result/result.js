// pages/result/result.js
const questionData = require('../../utils/questionData.js')
const app = getApp()

Page({
  data: {
    result: null,
    levelInfo: null,
    dimScores: [],
    totalScore: 0,
    formData: {},
    submitTime: '',
    suggestions: '',
    radarReady: false,
    showSuggestions: false
  },

  onLoad() {
    const result = app.globalData.result
    if (!result) {
      wx.redirectTo({ url: '/pages/index/index' })
      return
    }

    const levelInfo = this.getLevelInfo(result.totalScore)

    this.setData({
      result,
      levelInfo,
      dimScores: result.dimScores,
      totalScore: result.totalScore,
      formData: result.formData,
      submitTime: result.submitTime
    })

    // 延迟绘制雷达图
    setTimeout(() => this.drawRadar(), 300)
  },

  getLevelInfo(score) {
    return questionData.levels.find(l => score >= l.min && score <= l.max) || questionData.levels[0]
  },

  drawRadar() {
    const { dimScores } = this.data
    const query = wx.createSelectorQuery()
    query.select('#radarCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        if (!res || !res[0]) return
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')
        const dpr = wx.getWindowInfo().pixelRatio
        const width = res[0].width
        const height = res[0].height
        canvas.width = width * dpr
        canvas.height = height * dpr
        ctx.scale(dpr, dpr)
        this.renderRadar(ctx, width, height, dimScores)
        this.setData({ radarReady: true })
      })
  },

  renderRadar(ctx, W, H, dimScores) {
    const cx = W / 2
    const cy = H / 2
    const R = Math.min(W, H) / 2 - 60
    const n = dimScores.length
    const maxScore = 20 // 每维度最高20分(4题×5分)
    const levels = 4

    ctx.clearRect(0, 0, W, H)

    // 绘制网格（多层多边形）
    for (let l = 1; l <= levels; l++) {
      const r = R * (l / levels)
      ctx.beginPath()
      for (let i = 0; i < n; i++) {
        const angle = (Math.PI * 2 * i / n) - Math.PI / 2
        const x = cx + r * Math.cos(angle)
        const y = cy + r * Math.sin(angle)
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.closePath()
      ctx.strokeStyle = l === levels ? '#c5d0f5' : '#e0e6fb'
      ctx.lineWidth = l === levels ? 2 : 1
      ctx.stroke()

      // 分数标注（最外圈显示满分）
      if (l === levels) {
        ctx.fillStyle = '#aaa'
        ctx.font = '20px PingFang SC'
        ctx.fillText('20', cx + r * Math.cos(-Math.PI / 2) - 10, cy + r * Math.sin(-Math.PI / 2) - 10)
      }
    }

    // 绘制轴线和标签
    const colors = dimScores.map(d => d.color)
    for (let i = 0; i < n; i++) {
      const angle = (Math.PI * 2 * i / n) - Math.PI / 2
      const x = cx + R * Math.cos(angle)
      const y = cy + R * Math.sin(angle)

      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(x, y)
      ctx.strokeStyle = '#dde4f8'
      ctx.lineWidth = 1
      ctx.stroke()

      // 图标和标签
      const labelR = R + 50
      const lx = cx + labelR * Math.cos(angle)
      const ly = cy + labelR * Math.sin(angle)

      ctx.fillStyle = colors[i]
      ctx.font = 'bold 22px PingFang SC'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(dimScores[i].icon || '', lx, ly - 14)

      ctx.fillStyle = '#333'
      ctx.font = '20px PingFang SC'
      ctx.fillText(dimScores[i].name, lx, ly + 14)
    }

    // 绘制得分区域
    ctx.beginPath()
    for (let i = 0; i < n; i++) {
      const ratio = dimScores[i].score / maxScore
      const angle = (Math.PI * 2 * i / n) - Math.PI / 2
      const x = cx + R * ratio * Math.cos(angle)
      const y = cy + R * ratio * Math.sin(angle)
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.closePath()
    ctx.fillStyle = 'rgba(43, 92, 230, 0.18)'
    ctx.fill()
    ctx.strokeStyle = '#2B5CE6'
    ctx.lineWidth = 3
    ctx.stroke()

    // 绘制数据点
    for (let i = 0; i < n; i++) {
      const ratio = dimScores[i].score / maxScore
      const angle = (Math.PI * 2 * i / n) - Math.PI / 2
      const x = cx + R * ratio * Math.cos(angle)
      const y = cy + R * ratio * Math.sin(angle)
      ctx.beginPath()
      ctx.arc(x, y, 8, 0, Math.PI * 2)
      ctx.fillStyle = '#2B5CE6'
      ctx.fill()
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 3
      ctx.stroke()

      // 分值标注
      ctx.fillStyle = '#2B5CE6'
      ctx.font = 'bold 22px PingFang SC'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      const labelX = cx + (R * ratio + 24) * Math.cos(angle)
      const labelY = cy + (R * ratio + 24) * Math.sin(angle)
      ctx.fillText(dimScores[i].score, labelX, labelY)
    }
  },

  onSuggestionsInput(e) {
    this.setData({ suggestions: e.detail.value })
    app.globalData.result.suggestions = e.detail.value
  },

  toggleSuggestions() {
    this.setData({ showSuggestions: !this.data.showSuggestions })
  },

  restartSurvey() {
    wx.showModal({
      title: '重新评估',
      content: '确定要清空当前答题记录并重新开始吗？',
      success(res) {
        if (res.confirm) {
          app.globalData.answers = {}
          app.globalData.result = null
          wx.reLaunch({ url: '/pages/index/index' })
        }
      }
    })
  },

  saveResult() {
    wx.showToast({ title: '结果已保存', icon: 'success', duration: 2000 })
  }
})
