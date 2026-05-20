// pages/index/index.js (添加 dimensions 数据)
const app = getApp()

Page({
  data: {
    dimensions: [
      { id: 1, icon: '📚', name: '术语管理', count: 4, color: '#2B5CE6', bg: '#EEF2FF' },
      { id: 2, icon: '💾', name: '翻译记忆库', count: 4, color: '#7C3AED', bg: '#F3EEFF' },
      { id: 3, icon: '✍️', name: '风格指南', count: 4, color: '#059669', bg: '#ECFDF5' },
      { id: 4, icon: '⚙️', name: '技术集成', count: 4, color: '#DC2626', bg: '#FEF2F2' },
      { id: 5, icon: '🏢', name: '组织与文化', count: 4, color: '#D97706', bg: '#FFFBEB' }
    ],
    department: '',
    position: '',
    companyType: '',
    companyTypeOptions: ['纯国内业务', '有出口业务', '多国本地化运营'],
    companyTypeIndex: -1,
    languagePair: '',
    formValid: false
  },

  onLoad() {},

  onDepartmentInput(e) {
    this.setData({ department: e.detail.value })
    this.checkFormValid()
  },

  onPositionInput(e) {
    this.setData({ position: e.detail.value })
    this.checkFormValid()
  },

  onCompanyTypeChange(e) {
    const index = parseInt(e.detail.value)
    this.setData({
      companyTypeIndex: index,
      companyType: this.data.companyTypeOptions[index]
    })
    this.checkFormValid()
  },

  onLanguagePairInput(e) {
    this.setData({ languagePair: e.detail.value })
    this.checkFormValid()
  },

  checkFormValid() {
    const { department, position, companyType } = this.data
    this.setData({
      formValid: department.trim() !== '' && position.trim() !== '' && companyType !== ''
    })
  },

  startQuestionnaire() {
    if (!this.data.formValid) {
      wx.showToast({ title: '请完善带 * 的必填信息', icon: 'none', duration: 1500 })
      return
    }
    const app = getApp()
    app.globalData.formData = {
      department: this.data.department,
      position: this.data.position,
      companyType: this.data.companyType,
      languagePair: this.data.languagePair
    }
    app.globalData.answers = {}
    wx.navigateTo({ url: '/pages/questionnaire/questionnaire' })
  }
})
