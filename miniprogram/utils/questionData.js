// 问卷数据
const questionData = {
  dimensions: [
    {
      id: 1,
      name: '术语管理',
      icon: '📚',
      color: '#2B5CE6',
      lightColor: '#EEF2FF',
      questions: [
        {
          id: 'Q1',
          text: '企业是否有统一的产品/技术术语表？',
          options: [
            { label: 'A', text: '没有术语表，各团队自行决定用语', score: 1 },
            { label: 'B', text: '有术语表，但仅存于个别员工的个人文档中', score: 2 },
            { label: 'C', text: '有术语表，部门内可访问，但更新不及时', score: 3 },
            { label: 'D', text: '有集中的术语库，且与翻译流程关联，定期评审', score: 4 },
            { label: 'E', text: '术语库全公司可见，新项目强制引用，并有版本记录', score: 5 }
          ]
        },
        {
          id: 'Q2',
          text: '术语表覆盖的内容范围是？',
          options: [
            { label: 'A', text: '无术语表', score: 1 },
            { label: 'B', text: '仅有产品名称/品牌词', score: 2 },
            { label: 'C', text: '覆盖产品名称、技术参数、常用术语', score: 3 },
            { label: 'D', text: '覆盖产品、技术、市场关键词及品牌语调', score: 4 },
            { label: 'E', text: '覆盖行业专业术语、品牌语调、禁用词库、文化敏感词', score: 5 }
          ]
        },
        {
          id: 'Q3',
          text: '新术语的添加和变更是否有规范流程？',
          options: [
            { label: 'A', text: '无流程，谁想加就加', score: 1 },
            { label: 'B', text: '由个别人员决定，无书面记录', score: 2 },
            { label: 'C', text: '有流程但审批周期长，影响项目进度', score: 3 },
            { label: 'D', text: '有清晰流程，通常一周内完成审批', score: 4 },
            { label: 'E', text: '流程自动化，相关人员在线提交/投票/审批，实时生效', score: 5 }
          ]
        },
        {
          id: 'Q4',
          text: '团队在使用术语时如何确保一致性？',
          options: [
            { label: 'A', text: '不检查，经常出现同物异名', score: 1 },
            { label: 'B', text: '人工抽查，发现不一致再修改', score: 2 },
            { label: 'C', text: '翻译人员在项目中遵守，但其他部门不执行', score: 3 },
            { label: 'D', text: '翻译管理系统自动提示术语，审校环节强制检查', score: 4 },
            { label: 'E', text: '所有对外内容（文档、网站、客服脚本）都经过术语合规扫描', score: 5 }
          ]
        }
      ]
    },
    {
      id: 2,
      name: '翻译记忆库',
      icon: '💾',
      color: '#7C3AED',
      lightColor: '#F3EEFF',
      questions: [
        {
          id: 'Q5',
          text: '企业是否建立翻译记忆库（TM）？',
          options: [
            { label: 'A', text: '没有TM，每次翻译从零开始', score: 1 },
            { label: 'B', text: '有个别项目的TM文件，分散存储', score: 2 },
            { label: 'C', text: '有统一的TM库，但并非所有项目都入库', score: 3 },
            { label: 'D', text: '所有翻译项目强制使用TM并入库，复用率30%~60%', score: 4 },
            { label: 'E', text: '全公司统一TM库，复用率超过60%，且与内容管理系统联动', score: 5 }
          ]
        },
        {
          id: 'Q6',
          text: 'TM库的质量维护情况如何？',
          options: [
            { label: 'A', text: '从未清洗，存在大量错误或过时内容', score: 1 },
            { label: 'B', text: '偶尔手动清理，但效率低', score: 2 },
            { label: 'C', text: '每年集中清洗一次', score: 3 },
            { label: 'D', text: '每季度自动去重/对齐，并有质量评分', score: 4 },
            { label: 'E', text: '实时自动维护，版本可追溯，错误率低于1%', score: 5 }
          ]
        },
        {
          id: 'Q7',
          text: '是否利用TM进行成本/效率分析？',
          options: [
            { label: 'A', text: '从不分析', score: 1 },
            { label: 'B', text: '偶尔估算节省字数', score: 2 },
            { label: 'C', text: '每个项目后统计复用率和节省成本', score: 3 },
            { label: 'D', text: '定期分析TM资产价值并汇报管理层', score: 4 },
            { label: 'E', text: '通过BI看板实时展示TM带来的节省，作为绩效指标', score: 5 }
          ]
        },
        {
          id: 'Q8',
          text: '旧翻译内容（如历史文档、PDF）是否被导入TM？',
          options: [
            { label: 'A', text: '从未导入', score: 1 },
            { label: 'B', text: '仅少量重要文档人工对齐导入', score: 2 },
            { label: 'C', text: '有计划地对主要产品线文档进行批量对齐', score: 3 },
            { label: 'D', text: '使用自动对齐工具，覆盖80%以上存量内容', score: 4 },
            { label: 'E', text: '所有存量多语言内容已完成对齐入库，且持续更新', score: 5 }
          ]
        }
      ]
    },
    {
      id: 3,
      name: '风格指南与规范',
      icon: '✍️',
      color: '#059669',
      lightColor: '#ECFDF5',
      questions: [
        {
          id: 'Q9',
          text: '企业是否有书面的语言风格指南？',
          options: [
            { label: 'A', text: '无任何风格指南', score: 1 },
            { label: 'B', text: '仅有简单格式规范（如日期、数字、标点）', score: 2 },
            { label: 'C', text: '有品牌语调描述，但内容简略', score: 3 },
            { label: 'D', text: '有详细的风格指南，包含语态、术语选用、多媒体字幕规范等', score: 4 },
            { label: 'E', text: '风格指南按语言/市场分别定制，且包含文化适配和禁忌说明', score: 5 }
          ]
        },
        {
          id: 'Q10',
          text: '风格指南的更新频率和执行力如何？',
          options: [
            { label: 'A', text: '多年不变，或从未执行', score: 1 },
            { label: 'B', text: '不定期更新，员工执行靠自觉', score: 2 },
            { label: 'C', text: '每年更新一次，审校环节会参考', score: 3 },
            { label: 'D', text: '每季度根据市场反馈更新，新项目强制引用', score: 4 },
            { label: 'E', text: '风格指南嵌入写作/翻译工具，实时检查违规项，并有审计报告', score: 5 }
          ]
        },
        {
          id: 'Q11',
          text: '不同市场（如中美日德）的内容是否遵循统一品牌语调？',
          options: [
            { label: 'A', text: '各市场完全自由发挥', score: 1 },
            { label: 'B', text: '总部有建议，但实际执行差异很大', score: 2 },
            { label: 'C', text: '核心品牌词统一，语气可不同', score: 3 },
            { label: 'D', text: '全球统一语调框架，允许适当本地化微调', score: 4 },
            { label: 'E', text: '通过本地化测试和用户调研验证语调一致性', score: 5 }
          ]
        },
        {
          id: 'Q12',
          text: '是否有针对"避免使用"的词或表达的清单？',
          options: [
            { label: 'A', text: '没有', score: 1 },
            { label: 'B', text: '个别敏感词口头提醒', score: 2 },
            { label: 'C', text: '有简单列表，但未正式管理', score: 3 },
            { label: 'D', text: '有明确的禁用词库，并定期更新', score: 4 },
            { label: 'E', text: '禁用词库与术语库集成，自动扫描所有输出内容', score: 5 }
          ]
        }
      ]
    },
    {
      id: 4,
      name: '技术集成与自动化',
      icon: '⚙️',
      color: '#DC2626',
      lightColor: '#FEF2F2',
      questions: [
        {
          id: 'Q13',
          text: '企业使用什么工具管理语言资产？',
          options: [
            { label: 'A', text: '仅用 Excel / Word 本地文件', score: 1 },
            { label: 'B', text: '使用免费/轻量翻译工具，但资产分散', score: 2 },
            { label: 'C', text: '有专业翻译管理系统（TMS）或术语库工具', score: 3 },
            { label: 'D', text: 'TMS 与公司内部 CMS / OA 系统部分集成', score: 4 },
            { label: 'E', text: '资产平台与 ERP、开发环境（Git）、客服系统等全链路打通', score: 5 }
          ]
        },
        {
          id: 'Q14',
          text: '是否利用机器翻译（MT）结合语言资产？',
          options: [
            { label: 'A', text: '不使用机器翻译', score: 1 },
            { label: 'B', text: '随机使用公开MT，不结合术语', score: 2 },
            { label: 'C', text: '使用定制化MT，但未接入术语和TM', score: 3 },
            { label: 'D', text: 'MT 引擎已加载术语库和风格指南，输出质量明显提升', score: 4 },
            { label: 'E', text: '采用自适应MT，每次人工修正后自动优化引擎', score: 5 }
          ]
        },
        {
          id: 'Q15',
          text: '语言资产在内容创建和发布流程中的自动化程度？',
          options: [
            { label: 'A', text: '完全人工操作', score: 1 },
            { label: 'B', text: '部分环节有自动化脚本（如批量导入导出）', score: 2 },
            { label: 'C', text: '翻译项目自动分配、资产自动匹配', score: 3 },
            { label: 'D', text: '内容更新时自动触发翻译工作流，资产自动复用', score: 4 },
            { label: 'E', text: '智能内容管理系统：新内容生成后自动预翻译、合规检查，一键发布', score: 5 }
          ]
        },
        {
          id: 'Q16',
          text: '是否利用 AI 能力提升语言资产管理效率？',
          options: [
            { label: 'A', text: '无', score: 1 },
            { label: 'B', text: '尝试过但未推广', score: 2 },
            { label: 'C', text: '使用 AI 进行术语自动抽取或重复句识别', score: 3 },
            { label: 'D', text: 'AI 辅助质量检查（术语违规、风格偏离等）', score: 4 },
            { label: 'E', text: 'AI 驱动整个资产生命周期：自动更新、智能推荐、预测性维护', score: 5 }
          ]
        }
      ]
    },
    {
      id: 5,
      name: '组织与文化',
      icon: '🏢',
      color: '#D97706',
      lightColor: '#FFFBEB',
      questions: [
        {
          id: 'Q17',
          text: '语言资产是否被视为公司正式资产，并有明确负责人？',
          options: [
            { label: 'A', text: '无专人负责，资产散落各处', score: 1 },
            { label: 'B', text: '由翻译供应商兼职管理', score: 2 },
            { label: 'C', text: '有内部岗位（如语言经理）兼职负责', score: 3 },
            { label: 'D', text: '有专职的语言资产管理者，并纳入部门KPI', score: 4 },
            { label: 'E', text: '设立"语言资产委员会"，跨部门高管共同决策预算和战略', score: 5 }
          ]
        },
        {
          id: 'Q18',
          text: '语言资产的可见性和可访问性如何？',
          options: [
            { label: 'A', text: '只有个别人知道资产存在', score: 1 },
            { label: 'B', text: '部门内部通过共享盘可访问', score: 2 },
            { label: 'C', text: '全公司有权限的员工均可在线查询', score: 3 },
            { label: 'D', text: '不仅可查询，员工可便捷提交新术语或建议修改', score: 4 },
            { label: 'E', text: '资产平台嵌入日常工作界面（如写文档时自动提示术语），并定期培训', score: 5 }
          ]
        },
        {
          id: 'Q19',
          text: '高管层对语言资产的重视程度体现在哪些方面？',
          options: [
            { label: 'A', text: '从不提及', score: 1 },
            { label: 'B', text: '仅在翻译预算审批时关注', score: 2 },
            { label: 'C', text: '年度战略会中作为成本控制议题', score: 3 },
            { label: 'D', text: '作为提升全球化效率的重点项目，给予预算支持', score: 4 },
            { label: 'E', text: '将语言资产成熟度纳入公司级 OKR，并定期向董事会汇报', score: 5 }
          ]
        },
        {
          id: 'Q20',
          text: '公司是否定期评估语言资产的投资回报率（ROI）？',
          options: [
            { label: 'A', text: '从不评估', score: 1 },
            { label: 'B', text: '偶尔估算节省的翻译费', score: 2 },
            { label: 'C', text: '每年计算一次ROI', score: 3 },
            { label: 'D', text: '每季度分析成本节省、发布加速等效益', score: 4 },
            { label: 'E', text: '建立持续仪表板，实时展示资产价值，并用于决策优化', score: 5 }
          ]
        }
      ]
    }
  ],

  levels: [
    { min: 20, max: 40, level: '初始级', emoji: '🌱', color: '#EF4444', desc: '语言资产意识薄弱，管理散乱，存在大量重复劳动和品牌风险。建议从术语表和翻译记忆库建设入手。' },
    { min: 41, max: 60, level: '重复级', emoji: '🌿', color: '#F59E0B', desc: '有基础资产，但流程不规范，跨部门协同不足。需建立统一平台和标准流程。' },
    { min: 61, max: 80, level: '规范级', emoji: '🌳', color: '#10B981', desc: '管理体系较完善，降本增效明显，但仍依赖人工。建议探索自动化和 AI 集成。' },
    { min: 81, max: 90, level: '优秀级', emoji: '⭐', color: '#2B5CE6', desc: '资产整合良好，工具集成度高，数据驱动决策。可进一步优化多语言覆盖和动态更新。' },
    { min: 91, max: 100, level: '领先级', emoji: '🏆', color: '#7C3AED', desc: '语言资产成为企业核心竞争力和全球化加速器，具备智能化和自适应能力。' }
  ]
}

module.exports = questionData
