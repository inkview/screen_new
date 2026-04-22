import React, { useState } from 'react';
import { 
  ChevronLeft, Save, User, Activity, Loader2, FileCheck, 
  AlertCircle, QrCode, Wallet, Plus, ShieldCheck, LogOut, FileText, CheckCircle2, Users,
  MessageCircle, AlertTriangle
} from 'lucide-react';

const inputClass = "w-full border rounded-xl px-3 py-2.5 outline-none transition-all text-slate-700 placeholder:text-slate-400 border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white disabled:bg-slate-50 disabled:text-slate-400";

const Field = ({ label, required, children, error }: any) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-slate-600 mb-1.5">
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    {children}
    {error && <p className="text-xs text-rose-500 mt-1 flex items-center gap-1"><AlertCircle size={12}/>{error}</p>}
  </div>
);

// --- Phase 1: Login ---
const LoginPage = ({ onLogin }: { onLogin: (user: any) => void }) => {
  const [idCard, setIdCard] = useState('13523242564');
  const [password, setPassword] = useState('123456');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
            <ShieldCheck size={32} />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-slate-800 text-center mb-2">欢迎登录</h1>
        <p className="text-sm text-slate-500 text-center mb-8">新生儿基础筛查系统</p>
        <form onSubmit={(e) => { e.preventDefault(); onLogin({ id: idCard, name: '家属' }); }} className="space-y-4">
          <Field label="手机号" required>
            <input type="text" value={idCard} onChange={e => setIdCard(e.target.value)} className={inputClass} placeholder="请输入身份证号" />
          </Field>
          <div>
            <Field label="密码" required>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className={inputClass} placeholder="请输入密码" />
            </Field>
            <div className="flex justify-end -mt-2 mb-4">
              <button type="button" onClick={() => alert('请联系医院前台或管理员重置密码')} className="text-sm text-blue-600 hover:text-blue-800 font-medium">忘记密码？</button>
            </div>
          </div>
          <button type="submit" className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition-all">
            登录
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-100">
          <button onClick={() => onLogin({ id: 'wx_' + Math.random().toString(36).substr(2, 8), name: '微信用户' })} className="w-full py-3.5 bg-[#07C160] text-white rounded-xl font-medium hover:bg-[#06ad56] shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2">
            <MessageCircle size={20} />
            微信一键登录
          </button>
          <p className="text-xs text-center text-slate-400 mt-3">关联微信ID建立账号</p>
        </div>
      </div>
    </div>
  );
};

// --- Archive Edit ---
const ArchiveEdit = ({ archive, onSave, onBack }: any) => {
  const [formData, setFormData] = useState(archive || {
    name: '', birthDate: '', gender: '', familyType: '母亲', familyName: '', familyId: '',
    personalCertType: '身份证', personalCertNo: '',
    birthWeight: '', birthLength: '', deliveryMethod: '', gestationalAge: '', gravidity: '', parity: '', fetusNumber: '', homeAddress: ''
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="sticky top-0 bg-white/80 backdrop-blur-md px-4 py-3 flex items-center gap-3 border-b border-slate-100 z-50">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full"><ChevronLeft size={20} /></button>
        <h2 className="font-bold text-lg text-slate-800">{archive ? '编辑档案' : '新建档案'}</h2>
      </div>
      <div className="p-4 space-y-4">
        <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-700 mb-4 border-b pb-2">必填信息</h3>
          <Field label="新生儿姓名" required><input value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} className={inputClass}/></Field>
          <Field label="出生日期" required><input type="date" value={formData.birthDate} onChange={e=>setFormData({...formData, birthDate: e.target.value})} className={inputClass}/></Field>
          <Field label="性别" required>
            <select value={formData.gender} onChange={e=>setFormData({...formData, gender: e.target.value})} className={inputClass}>
              <option value="">请选择</option><option value="男">男</option><option value="女">女</option>
            </select>
          </Field>
          <Field label="家属类型" required><input value={formData.familyType} disabled className={inputClass}/></Field>
          <Field label="家属姓名" required><input value={formData.familyName} onChange={e=>setFormData({...formData, familyName: e.target.value})} className={inputClass}/></Field>
          <Field label="家属身份证号" required><input value={formData.familyId} onChange={e=>setFormData({...formData, familyId: e.target.value})} className={inputClass}/></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="本人证件类型" required>
              <select value={formData.personalCertType} onChange={e=>setFormData({...formData, personalCertType: e.target.value})} className={inputClass}>
                <option value="身份证">身份证</option>
                <option value="户口簿">户口簿</option>
                <option value="其他">其他</option>
              </select>
            </Field>
            <Field label="本人证件号" required><input value={formData.personalCertNo} onChange={e=>setFormData({...formData, personalCertNo: e.target.value})} className={inputClass}/></Field>
          </div>
        </section>

        <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-700 mb-4 border-b pb-2">补充信息 (非必填)</h3>
          <div className="grid grid-cols-2 gap-3">
            <Field label="出生体重(g)"><input type="number" value={formData.birthWeight || ''} onChange={e=>setFormData({...formData, birthWeight: e.target.value})} className={inputClass}/></Field>
            <Field label="身长(cm)"><input type="number" value={formData.birthLength || ''} onChange={e=>setFormData({...formData, birthLength: e.target.value})} className={inputClass}/></Field>
            <Field label="分娩方式">
              <select value={formData.deliveryMethod || ''} onChange={e=>setFormData({...formData, deliveryMethod: e.target.value})} className={inputClass}>
                <option value="">请选择</option><option value="顺产">顺产</option><option value="剖宫产">剖宫产</option>
              </select>
            </Field>
            <Field label="孕周"><input type="number" value={formData.gestationalAge || ''} onChange={e=>setFormData({...formData, gestationalAge: e.target.value})} className={inputClass}/></Field>
            <Field label="孕次"><input type="number" value={formData.gravidity || ''} onChange={e=>setFormData({...formData, gravidity: e.target.value})} className={inputClass}/></Field>
            <Field label="产次"><input type="number" value={formData.parity || ''} onChange={e=>setFormData({...formData, parity: e.target.value})} className={inputClass}/></Field>
            <Field label="胎次"><input type="number" value={formData.fetusNumber || ''} onChange={e=>setFormData({...formData, fetusNumber: e.target.value})} className={inputClass}/></Field>
          </div>
          <Field label="家庭地址"><textarea value={formData.homeAddress || ''} onChange={e=>setFormData({...formData, homeAddress: e.target.value})} className={inputClass + " h-20 resize-none"}/></Field>
        </section>

        <button onClick={() => onSave({ ...formData, id: formData.id || Date.now().toString() })} className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700">保存档案</button>
      </div>
    </div>
  );
};

// --- Order Flow (Step 1, Sub-flow for Info Entry) ---
const testItemsOptions = ['新生儿遗传代谢病基础筛查', '新生儿听力筛查', '串联质谱扩展筛查 (48项)'];

const OrderStep1 = ({ archive, orderData, onNext, onSaveDraft, onBack }: any) => {
  const [formData, setFormData] = useState({
    birthWeight: archive?.birthWeight || '', 
    birthLength: archive?.birthLength || '', 
    deliveryMethod: archive?.deliveryMethod || '', 
    gestationalAge: archive?.gestationalAge || '', 
    gravidity: archive?.gravidity || '',
    parity: archive?.parity || '',
    fetusNumber: archive?.fetusNumber || '',
    homeAddress: archive?.homeAddress || '',
    testItems: orderData?.testItems || [] as string[]
  });
  const [errors, setErrors] = useState<any>({});

  const handleNext = () => {
    if (formData.testItems.length === 0) {
      setErrors({ testItems: '请至少选择一项项目' });
      return;
    }
    onNext(formData);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="sticky top-0 bg-white/80 backdrop-blur-md px-4 py-3 flex items-center gap-3 border-b border-slate-100 z-50">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full"><ChevronLeft size={20} /></button>
        <h2 className="font-bold text-lg text-slate-800">第一步：信息录入</h2>
      </div>
      <div className="p-4 space-y-4">
        <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-700 mb-4 border-b pb-2 flex items-center gap-2"><User size={18} className="text-blue-500" /> 基本特征</h3>
          <div className="grid grid-cols-2 gap-4 text-sm text-slate-600 mb-2">
            <div><span className="text-slate-400">姓名:</span> {archive.name}</div>
            <div><span className="text-slate-400">性别:</span> {archive.gender}</div>
            <div><span className="text-slate-400">出生日期:</span> {archive.birthDate}</div>
            <div><span className="text-slate-400">{archive.familyType}姓名:</span> {archive.familyName}</div>
          </div>
          <div className="text-sm text-slate-600"><span className="text-slate-400">家属证件号:</span> {archive.familyId}</div>
          <div className="text-sm text-slate-600 mt-1"><span className="text-slate-400">本人证件:</span> {archive.personalCertType || '-'} / {archive.personalCertNo || '-'}</div>
        </section>

        <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <Field label="检测项目 (多选)" required error={errors.testItems}>
            <div className="space-y-2 mt-1">
              {testItemsOptions.map(item => (
                <label key={item} className="flex items-center gap-3 p-3 border rounded-xl border-slate-200 cursor-pointer hover:bg-slate-50">
                  <input type="checkbox" checked={formData.testItems.includes(item)} 
                    onChange={() => {
                      const newItems = formData.testItems.includes(item) 
                        ? formData.testItems.filter(i => i !== item) 
                        : [...formData.testItems, item];
                      setFormData({...formData, testItems: newItems});
                      if (newItems.length > 0) setErrors({});
                    }} className="w-4 h-4 text-blue-600 rounded" />
                  <span className="text-sm text-slate-700">{item}</span>
                </label>
              ))}
            </div>
          </Field>
        </section>

        <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-700 mb-4 border-b pb-2">补充信息 (可编辑，自动更新档案)</h3>
          <div className="grid grid-cols-2 gap-3">
            <Field label="出生体重(g)"><input type="number" value={formData.birthWeight} onChange={e=>setFormData({...formData, birthWeight: e.target.value})} className={inputClass}/></Field>
            <Field label="身长(cm)"><input type="number" value={formData.birthLength} onChange={e=>setFormData({...formData, birthLength: e.target.value})} className={inputClass}/></Field>
            <Field label="分娩方式">
              <select value={formData.deliveryMethod} onChange={e=>setFormData({...formData, deliveryMethod: e.target.value})} className={inputClass}>
                <option value="">请选择</option><option value="顺产">顺产</option><option value="剖宫产">剖宫产</option>
              </select>
            </Field>
            <Field label="孕周"><input type="number" value={formData.gestationalAge} onChange={e=>setFormData({...formData, gestationalAge: e.target.value})} className={inputClass}/></Field>
            <Field label="孕次"><input type="number" value={formData.gravidity} onChange={e=>setFormData({...formData, gravidity: e.target.value})} className={inputClass}/></Field>
            <Field label="产次"><input type="number" value={formData.parity} onChange={e=>setFormData({...formData, parity: e.target.value})} className={inputClass}/></Field>
            <Field label="胎次"><input type="number" value={formData.fetusNumber} onChange={e=>setFormData({...formData, fetusNumber: e.target.value})} className={inputClass}/></Field>
          </div>
          <Field label="家庭地址"><textarea value={formData.homeAddress} onChange={e=>setFormData({...formData, homeAddress: e.target.value})} className={inputClass + " h-20 resize-none"}/></Field>
        </section>
        
        <div className="flex gap-3 pt-2">
          <button onClick={() => onSaveDraft(formData)} className="flex-1 py-4 bg-white text-blue-600 border border-blue-600 rounded-xl font-bold shadow-sm hover:bg-blue-50">保存草稿</button>
          <button onClick={handleNext} className="flex-1 py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700">下一步</button>
        </div>
      </div>
    </div>
  );
};

// --- Order Flow (Step 2, Confirmation & Payment) ---
const OrderStep2 = ({ orderData, onNext, onSaveDraft, onBack, onRefund }: any) => {
  const [formData, setFormData] = useState({
    submissionMethod: orderData?.submissionMethod || 'hospital', 
    paymentMethod: orderData?.paymentMethod || '手机新支付', 
    sendingHospital: orderData?.sendingHospital || '',
    consent: orderData?.consent || false
  });
  const [errors, setErrors] = useState<any>({});
  const [isPaid, setIsPaid] = useState(orderData?.isPaid || false);
  const [isPaying, setIsPaying] = useState(false);
  const [isRefunding, setIsRefunding] = useState(false);
  const [refundNote, setRefundNote] = useState(orderData?.refundNote || '');

  const handleSubmit = (paidStatus: boolean = isPaid) => {
    let errs: any = {};
    if (formData.submissionMethod === 'hospital' && !formData.sendingHospital) errs.sendingHospital = '请填写医院';
    if (!formData.consent) errs.consent = '须同意知情同意书';
    if (Object.keys(errs).length > 0) return setErrors(errs);
    
    // Check if it's online payment and not yet paid
    if (formData.paymentMethod === '手机新支付' && formData.submissionMethod !== 'personal' && !isPaid) {
      if (formData.paymentMethod === '手机新支付') {
        // Just enforcing it
      }
    }
    
    onNext({ ...orderData, ...formData, isPaid: paidStatus, refundNote });
  };

  const handlePayAndSubmit = () => {
    if (formData.paymentMethod !== '手机新支付' || isPaid) {
      handleSubmit(isPaid);
      return;
    }
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setIsPaid(true);
      setRefundNote('');
      handleSubmit(true);
    }, 1200);
  };

  const handleRefund = () => {
    setIsRefunding(true);
    setTimeout(() => {
      setIsRefunding(false);
      setIsPaid(false);
      const note = `已退款(${new Date().toLocaleString()})`;
      setRefundNote(note);
      onRefund?.({ ...orderData, ...formData, isPaid: false, refundNote: note, status: 'step2' });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="sticky top-0 bg-white/80 backdrop-blur-md px-4 py-3 flex items-center gap-3 border-b border-slate-100 z-50">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full"><ChevronLeft size={20} /></button>
        <h2 className="font-bold text-lg text-slate-800">第二步：确认与支付</h2>
      </div>
      <div className="p-4 space-y-4">
        <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <Field label="送检方式" required>
            <select value={formData.submissionMethod} onChange={e => {
              const val = e.target.value;
              setFormData({ ...formData, submissionMethod: val, paymentMethod: val === 'personal' ? '手机新支付' : formData.paymentMethod });
            }} className={inputClass}>
              <option value="hospital">医院</option>
              <option value="personal">个人</option>
            </select>
          </Field>
          
          {formData.submissionMethod === 'hospital' && (
            <Field label="送检医院" required error={errors.sendingHospital}>
              <input value={formData.sendingHospital} onChange={e=>setFormData({...formData, sendingHospital: e.target.value})} className={inputClass} placeholder="输入送检医院名称" />
            </Field>
          )}

          <Field label="支付方式" required>
            <select value={formData.paymentMethod} onChange={e=>setFormData({...formData, paymentMethod: e.target.value})} className={inputClass} disabled={formData.submissionMethod === 'personal' || isPaid}>
              <option value="手机新支付">在线支付</option>
              {formData.submissionMethod === 'hospital' && <option value="院内已支付">院内已支付</option>}
            </select>
          </Field>
        </section>

        <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-700 mb-4 border-b pb-2">额外信息</h3>
          
          <label className="flex items-start gap-3 p-3 border rounded-xl border-slate-200 cursor-pointer hover:bg-slate-50">
            <input type="checkbox" checked={formData.consent} onChange={e => {
              setFormData({...formData, consent: e.target.checked});
              if(e.target.checked) setErrors({...errors, consent: null});
            }} className="w-4 h-4 mt-1 border-slate-300 text-blue-600 rounded focus:ring-blue-500" />
            <div className="flex-1">
              <span className={`text-sm ${errors.consent ? 'text-rose-500' : 'text-slate-700'}`}>本人已阅读并签署知情同意书</span>
              {errors.consent && <p className="text-xs text-rose-500 mt-1">{errors.consent}</p>}
            </div>
          </label>
        </section>

        {formData.paymentMethod === '手机新支付' && !isPaid && (
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center">
            <div className="text-rose-600"><span className="text-sm font-bold mr-0.5">¥</span><span className="text-3xl font-bold font-mono">280.00</span></div>
            <p className="text-xs text-slate-500 mt-2">点击下方按钮后将直接完成支付并进入下一步</p>
          </section>
        )}
        {formData.paymentMethod === '手机新支付' && isPaid && (
          <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-emerald-600">支付成功</p>
                {refundNote && <p className="text-xs text-amber-600 mt-1">{refundNote}</p>}
              </div>
              <button onClick={handleRefund} disabled={isRefunding} className="px-4 py-2 bg-rose-600 text-white text-sm rounded-lg hover:bg-rose-700 disabled:opacity-60">
                {isRefunding ? '退款中...' : '申请退费'}
              </button>
            </div>
          </section>
        )}

        <div className="flex gap-3 pt-2">
          <button onClick={() => onSaveDraft({ ...orderData, ...formData, isPaid, refundNote })} className="flex-1 py-4 bg-white text-blue-600 border border-blue-600 rounded-xl font-bold shadow-sm hover:bg-blue-50">保存草稿</button>
          <button onClick={handlePayAndSubmit} disabled={isPaying} className="flex-1 py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 disabled:opacity-50 disabled:bg-slate-400 flex items-center justify-center gap-2">
            {isPaying && <Loader2 size={18} className="animate-spin" />}
            {formData.paymentMethod === '手机新支付' && !isPaid ? '支付并提交采样' : '提交采样'}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Order Flow (Step 3, Sampling) ---
const nurses = ['张护士', '李护士', '王护士'];
const OrderStep3 = ({ archive, orderData, onComplete, onBack, onRefund }: any) => {
  const [formData, setFormData] = useState({ sampleNumber: '', sampler: '', admissionNumber: '' });
  const [errors, setErrors] = useState<any>({});
  const [showRefundForm, setShowRefundForm] = useState(false);
  const [refundReason, setRefundReason] = useState('');

  const handleSubmit = () => {
    let errs: any = {};
    if (!formData.sampleNumber) errs.sampleNumber = '请输入样本编号';
    if (!formData.sampler) errs.sampler = '请输入或选择采样人';
    if (Object.keys(errs).length > 0) return setErrors(errs);
    onComplete({ ...orderData, ...formData, status: 'processing' });
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="sticky top-0 bg-white/80 backdrop-blur-md px-4 py-3 flex items-center gap-3 border-b border-slate-100 z-50">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full"><ChevronLeft size={20} /></button>
        <h2 className="font-bold text-lg text-slate-800">
          {orderData.status === 're_sampling' ? '重采血录入' : '第三步：采样确认'}
        </h2>
      </div>
      <div className="p-4 space-y-4">
        {orderData.status === 're_sampling' && (
          <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm border border-red-100 mb-2">
            该订单已被标记为“重采血”，请重新完成采样条码和人员绑定。
          </div>
        )}

        <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-2 text-sm text-slate-600">
          <h3 className="font-bold text-slate-800 mb-2">订单确认信息</h3>
          <div><span className="text-slate-400">新生儿:</span> {archive?.name} ({archive?.gender} · {archive?.birthDate})</div>
          <div><span className="text-slate-400">送检方式:</span> {orderData?.submissionMethod === 'hospital' ? '医院送检' : '自行送检'}</div>
          <div><span className="text-slate-400">支付方式:</span> {orderData?.paymentMethod} {orderData?.isPaid ? '(已付)' : ''}</div>
          <div><span className="text-slate-400">检测项目:</span> {orderData?.testItems?.join('、')}</div>
        </section>

        <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <Field label="样本编号" required error={errors.sampleNumber}>
            <input value={formData.sampleNumber} onChange={e=>setFormData({...formData, sampleNumber: e.target.value})} className={inputClass} placeholder="输入条码号"/>
          </Field>
          {orderData.submissionMethod === 'hospital' ? (
            <>
              <Field label="采样护士" required error={errors.sampler}>
                <select value={formData.sampler} onChange={e=>setFormData({...formData, sampler: e.target.value})} className={inputClass}>
                  <option value="">请选择护士</option>
                  {nurses.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </Field>
              <Field label="住院号 (条件输入)">
                <input value={formData.admissionNumber} onChange={e=>setFormData({...formData, admissionNumber: e.target.value})} className={inputClass} placeholder="输入住院号（如有）"/>
              </Field>
            </>
          ) : (
            <Field label="采样人" required error={errors.sampler}>
              <input value={formData.sampler} onChange={e=>setFormData({...formData, sampler: e.target.value})} className={inputClass} placeholder="输入采样人姓名"/>
            </Field>
          )}
        </section>
        <button onClick={handleSubmit} className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold shadow-lg hover:bg-emerald-700">完成采样</button>
        {!orderData?.refundInfo ? (
          <section className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            {!showRefundForm ? (
              <button onClick={() => setShowRefundForm(true)} className="w-full py-3 text-rose-600 border border-rose-200 rounded-xl font-medium hover:bg-rose-50">申请退费</button>
            ) : (
              <div className="space-y-3">
                <div className="text-sm text-slate-600">退费项目：{orderData?.testItems?.join('、') || '当前筛查项目'}</div>
                <div className="text-sm text-slate-600">退费金额：¥280.00</div>
                <textarea value={refundReason} onChange={(e) => setRefundReason(e.target.value)} className={inputClass + " h-20 resize-none"} placeholder="请输入退费原因" />
                <button onClick={() => onRefund(refundReason)} disabled={!refundReason.trim()} className="w-full py-3 bg-rose-600 text-white rounded-xl disabled:opacity-50">确认退费</button>
              </div>
            )}
          </section>
        ) : (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 text-sm py-3 px-4 rounded-xl font-medium">已退费</div>
        )}
      </div>
    </div>
  );
};

const StatusDetailPage = ({ order, archive, onBack, onMarkProcessing, onMarkCompleted, onPrevStep, onRefund }: any) => {
  const [showRefundForm, setShowRefundForm] = useState(false);
  const [refundReason, setRefundReason] = useState('');
  const history = order?.history || [];
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="sticky top-0 bg-white/90 backdrop-blur-md px-4 py-3 flex items-center gap-3 border-b border-slate-100 z-50">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full"><ChevronLeft size={20} /></button>
        <h2 className="font-bold text-lg text-slate-800">订单进度详情</h2>
      </div>
      <div className="p-4 space-y-4">
        <section className="bg-white p-5 rounded-2xl border border-slate-100">
          <div className="text-sm text-slate-600 space-y-1">
            <div>新生儿：{archive?.name}</div>
            <div>当前状态：{order?.status === 'pending_receive' ? '待接收' : order?.status === 'processing' ? '检测中' : '已发布'}</div>
            <div>缴费方式：{order?.paymentMethod || '未记录'} {order?.isPaid ? '(已支付)' : ''}</div>
            <div>申请时间：{order?.submittedAt || '-'}</div>
          </div>
        </section>
        <section className="bg-white p-5 rounded-2xl border border-slate-100">
          <h3 className="font-bold text-slate-700 mb-3">历史状态节点</h3>
          <div className="space-y-2">
            {history.length === 0 ? <p className="text-sm text-slate-400">暂无节点</p> : history.map((h: any, idx: number) => (
              <div key={idx} className="text-sm flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-700">{h.label}</span><span className="text-slate-500">{h.time}</span>
              </div>
            ))}
          </div>
        </section>
        {order?.status === 'pending_receive' && order?.paymentMethod === '院内已支付' && (
          <button onClick={onPrevStep} className="w-full py-3 bg-white border border-slate-300 rounded-xl text-slate-700 font-medium">上一步</button>
        )}
        {order?.status === 'pending_receive' && <button onClick={onMarkProcessing} className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold">确认样本接收</button>}
        {order?.status === 'processing' && <button onClick={onMarkCompleted} className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold">发布检测报告</button>}
        {!order?.refundInfo ? (
          <section className="bg-white p-4 rounded-2xl border border-slate-100">
            {!showRefundForm ? (
              <button onClick={() => setShowRefundForm(true)} className="w-full py-3 text-rose-600 border border-rose-200 rounded-xl font-medium hover:bg-rose-50">申请退费</button>
            ) : (
              <div className="space-y-3">
                <div className="text-sm text-slate-600">退费项目：{order?.testItems?.join('、') || '筛查项目'}</div>
                <div className="text-sm text-slate-600">退费金额：¥280.00</div>
                <textarea value={refundReason} onChange={(e) => setRefundReason(e.target.value)} className={inputClass + " h-20 resize-none"} placeholder="请输入退费原因" />
                <button onClick={() => onRefund(refundReason)} disabled={!refundReason.trim()} className="w-full py-3 bg-rose-600 text-white rounded-xl disabled:opacity-50">确认退费</button>
              </div>
            )}
          </section>
        ) : <div className="bg-rose-50 border border-rose-200 text-rose-700 text-sm py-3 px-4 rounded-xl font-medium">已退费</div>}
      </div>
    </div>
  );
};

// --- Dashboard ---
const terminalEventStatuses = ['已终止', '终止', 'terminated'];
const Dashboard = ({ user, archives, events, orders, onNewArchive, onEditArchive, onNewOrder, onClickOrder, onLogout }: any) => {
  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <div className="bg-blue-600 text-white px-6 py-8 rounded-b-[2rem] shadow-md relative">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-blue-100 text-sm">账号: {user.id}</p>
          </div>
          <button onClick={onLogout} className="p-2 bg-blue-500/50 text-white rounded-full hover:bg-red-500/80 transition-colors">
            <LogOut size={18} />
          </button>
        </div>
      </div>

      <div className="px-5 -mt-6 relative z-10 space-y-6">
        <div className="flex justify-between items-center mb-2 px-1">
          <h2 className="text-slate-800 font-bold flex items-center gap-2"><Users size={18} className="text-blue-600"/> 新生儿档案</h2>
          <button onClick={onNewArchive} className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg flex items-center gap-1"><Plus size={16}/>新增档案</button>
        </div>

        {archives.length === 0 ? (
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-slate-100">
            <p className="text-slate-500 text-sm">暂无档案，请先新建档案</p>
          </div>
        ) : (
          archives.map((archive: any) => {
            const archiveEvents = events.filter((e: any) => e.archiveId === archive.id);
            return (
              <div key={archive.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">{archive.name[0]}</div>
                    <div>
                      <h3 className="font-bold text-slate-800">{archive.name} <span className="text-xs text-slate-500 font-normal ml-2">{archive.gender} · {archive.birthDate}</span></h3>
                      <p className="text-xs text-slate-500">家属: {archive.familyName} ({archive.familyType})</p>
                    </div>
                  </div>
                  <button onClick={() => onEditArchive(archive)} className="text-blue-600 text-sm font-medium">编辑</button>
                </div>
                
                <div className="p-0">
                  {archiveEvents.length === 0 ? (
                    <p className="text-xs text-slate-400 text-center py-5">暂无筛查事件</p>
                  ) : (
                    <div className="divide-y divide-slate-100">
                      {archiveEvents.map((event: any) => {
                        const eventOrders = orders.filter((o: any) => o.eventId === event.id);
                        const isTerminalEvent = terminalEventStatuses.includes(event.status);
                        return (
                          <div key={event.id} className="p-4 bg-white">
                            <div className="flex justify-between items-center mb-3">
                              <span className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                                <Activity size={14} className="text-blue-500"/>
                                筛查事件: {event.title}
                              </span>
                              <span className="bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded border border-indigo-100">
                                {event.status}
                              </span>
                            </div>
                            
                            <div className="space-y-2 mb-3">
                              {eventOrders.map((order: any) => (
                                <div key={order.id} onClick={() => onClickOrder(order)} className="flex justify-between items-center p-3 rounded-xl border border-slate-200 cursor-pointer hover:border-blue-300 bg-slate-50/50">
                                  <div>
                                    <div className="text-sm font-bold text-slate-800 line-clamp-1">{order.testItems?.join('、') || '信息录入中...'}</div>
                                    <div className="text-xs text-slate-500 mt-0.5">单号: {order.id.slice(-6)}</div>
                                    <div className="text-xs text-slate-400 mt-0.5">送检时间: {order.submittedAt || '-'}</div>
                                  </div>
                                  <div>
                                    {order.status === 'step1' && <span className="bg-slate-200 text-slate-600 text-xs px-2 py-1 rounded-md">待录入</span>}
                                    {order.status === 'step2' && <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-md">待收费(选项目)</span>}
                                    {order.status === 'step2_pay' && <span className="bg-rose-100 text-rose-600 text-xs px-2 py-1 rounded-md">待收费</span>}
                                    {order.status === 'step3' && <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-md">待采样</span>}
                                    {order.status === 'pending_receive' && <span className="bg-cyan-100 text-cyan-700 text-xs px-2 py-1 rounded-md">待接收</span>}
                                    {order.status === 're_sampling' && <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-md font-bold shadow-sm shadow-red-200 border border-red-200">重采血</span>}
                                    {order.status === 'processing' && <span className="bg-indigo-100 text-indigo-600 text-xs px-2 py-1 rounded-md">检测中</span>}
                                    {order.status === 'completed' && <span className="bg-emerald-100 text-emerald-600 text-xs px-2 py-1 rounded-md">已发布</span>}
                                    {order.status === 'recall_pending' && <span className="bg-rose-100 text-rose-700 text-xs px-2 py-1 rounded-md font-bold shadow-sm shadow-rose-200 border border-rose-200">已发布 ❗</span>}
                                    {order.refundInfo && <span className="ml-1 bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-md">已退费</span>}
                                  </div>
                                </div>
                              ))}
                            </div>
                            <button onClick={() => onNewOrder(event)} className="w-full py-2.5 border border-dashed border-blue-200 text-blue-600 rounded-xl text-sm font-medium hover:bg-blue-50">
                              {isTerminalEvent ? '+ 新申请检验（新筛查事件）' : '+ 新增检验订单'}
                            </button>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

// --- Report View (For completed & recall_pending) ---
const ReportView = ({ order, event, archive, onBack, onNewRetest, onRefund }: any) => {
  const isAbnormal = order.status === 'recall_pending';
  const canCreateRetest = isAbnormal && !order?.retestRequested;
  return (
    <div className="min-h-screen bg-slate-100 pb-20">
      <div className="sticky top-0 bg-white/80 backdrop-blur-md px-4 py-3 flex items-center gap-3 border-b border-slate-200 z-50">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full"><ChevronLeft size={20} /></button>
        <h2 className="font-bold text-lg text-slate-800">检验报告单 (PDF预览)</h2>
      </div>
      <div className="p-4">
        <div className="bg-white p-6 rounded-sm shadow-md border border-slate-200 min-h-[60vh] relative">
          <div className="text-center mb-6 border-b border-slate-800 pb-4">
            <h1 className="text-xl font-bold text-slate-900">某某生殖遗传专科医院</h1>
            <h2 className="text-lg font-bold text-slate-800 tracking-widest mt-1">新生儿疾病筛查报告单</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-y-2 text-sm text-slate-800 mb-6 font-medium">
            <div>姓名：{archive?.name || '未知'}</div>
            <div>性别：{archive?.gender || '未知'}</div>
            <div>条码：{order?.id?.slice(-6).toUpperCase() || 'N/A'}</div>
            <div>送检项：{order?.testItems?.[0] || '基础筛查'}</div>
          </div>

          <div className="border-t-2 border-b-2 border-slate-800 py-2 mb-6">
            <div className="flex justify-between text-sm font-bold mb-2 px-1">
              <span className="w-1/3">检测项目</span>
              <span className="w-1/3 text-center">结果</span>
              <span className="w-1/3 text-right">参考值</span>
            </div>
            <div className="flex justify-between text-sm mb-1 px-1">
              <span className="w-1/3">TSH (促甲状腺素)</span>
              <span className={`w-1/3 text-center font-bold ${isAbnormal ? 'text-rose-600' : 'text-slate-700'}`}>{isAbnormal ? '15.4 ↑' : '4.2'}</span>
              <span className="w-1/3 text-right">&lt; 10.0 uIU/ml</span>
            </div>
            <div className="flex justify-between text-sm px-1">
              <span className="w-1/3">PHE (苯丙氨酸)</span>
              <span className="w-1/3 text-center">1.2</span>
              <span className="w-1/3 text-right">&lt; 2.0 mg/dL</span>
            </div>
          </div>

          <div className="mb-6 border p-4 rounded bg-slate-50">
            <h3 className="font-bold mb-2 text-slate-800">筛查结论：</h3>
            {isAbnormal ? (
              <div>
                <p className="text-rose-600 font-bold mb-1 flex items-center gap-1"><AlertTriangle size={18}/> 异常 (筛查阳性，待召回！)</p>
                <p className="text-xs text-slate-600 leading-relaxed">说明：TSH指标偏高，疑似先天性甲状腺功能减低症。当前处于待召回阶段，请尽快点击下方按钮操作新增复查项目订单以明确诊断。</p>
              </div>
            ) : (
              <div>
                <p className="text-emerald-600 font-bold mb-1 flex items-center gap-1"><CheckCircle2 size={18}/> 正常 (未见明显异常)</p>
                <p className="text-xs text-slate-600 leading-relaxed">说明：本次筛查暂未见明显发育异常或代谢异常疾病指征，建议家长继续关注新生儿健康状况并定期保健。</p>
              </div>
            )}
          </div>
          
          <div className="text-xs text-slate-400 absolute bottom-4 right-6">
            报告医师：[电子签名]<br/>发布日期：{new Date().toLocaleDateString()}
          </div>
        </div>

        {canCreateRetest && (
          <button onClick={() => onNewRetest(event?.id)} className="w-full py-4 mt-6 bg-rose-600 text-white rounded-xl font-bold shadow-lg shadow-rose-600/30 hover:bg-rose-700 transition-all flex justify-center items-center gap-2">
            <Plus size={20}/> 新增复查项目订单
          </button>
        )}
        {!order?.refundInfo ? (
          <section className="bg-white p-4 rounded-xl mt-4 border border-slate-100">
            {!showRefundForm ? (
              <button onClick={() => setShowRefundForm(true)} className="w-full py-3 text-rose-600 border border-rose-200 rounded-xl font-medium hover:bg-rose-50">申请退费</button>
            ) : (
              <div className="space-y-3">
                <div className="text-sm text-slate-600">退费项目：{order?.testItems?.join('、') || '筛查项目'}</div>
                <div className="text-sm text-slate-600">退费金额：¥280.00</div>
                <textarea value={refundReason} onChange={(e) => setRefundReason(e.target.value)} className={inputClass + " h-20 resize-none"} placeholder="请输入退费原因" />
                <button onClick={() => onRefund(refundReason)} disabled={!refundReason.trim()} className="w-full py-3 bg-rose-600 text-white rounded-xl disabled:opacity-50">确认退费</button>
              </div>
            )}
          </section>
        ) : <div className="bg-rose-50 border border-rose-200 text-rose-700 text-sm py-3 px-4 rounded-xl mt-4 font-medium">已退费</div>}
      </div>
    </div>
  );
};


// --- App Root ---
export default function App() {
  const [viewStack, setViewStack] = useState<string[]>(['login']);
  const view = viewStack[viewStack.length - 1];
  const [user, setUser] = useState<any>(null);
  
  const [archives, setArchives] = useState<any[]>([
    { id: 'a1', name: '大宝', birthDate: '2023-10-01', gender: '男', familyType: '母亲', familyName: '王丽', familyId: '310105199001011234', personalCertType: '身份证', personalCertNo: '310105202310011234' }
  ]);
  const [events, setEvents] = useState<any[]>([
    { id: 'e1', archiveId: 'a1', title: '新生儿代谢及听力基础筛查', status: '待召回' }
  ]);
  const [orders, setOrders] = useState<any[]>([
    { id: 'o1', eventId: 'e1', status: 'completed', testItems: ['听力筛查'] },
    { id: 'o2', eventId: 'e1', status: 're_sampling', testItems: ['耳聋基因筛查'], submissionMethod: 'hospital' },
    { id: 'o3', eventId: 'e1', status: 'recall_pending', testItems: ['遗传代谢病初筛'] }
  ]);

  const [activeArchive, setActiveArchive] = useState<any>(null);
  const [activeOrder, setActiveOrder] = useState<any>(null);

  const navigate = (nextView: string, options: { replace?: boolean; reset?: boolean } = {}) => {
    setViewStack((prev) => {
      if (options.reset) return [nextView];
      if (options.replace) return [...prev.slice(0, -1), nextView];
      return [...prev, nextView];
    });
  };

  const goBack = (fallbackView = 'dashboard') => {
    setViewStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : [fallbackView]));
  };

  const handleOrderAction = (order: any) => {
    setActiveOrder(order);
    // routes 're_sampling' into step3 to reuse the form
    navigate(order.status === 're_sampling' ? 'step3' : order.status);
  };

  const updateOrder = (updates: any, nextView: string = 'dashboard') => {
    setOrders(orders.map(o => o.id === updates.id ? updates : o));
    setActiveOrder(updates);
    navigate(nextView, nextView === 'dashboard' ? { reset: true } : { replace: true });
  };

  if (view === 'login') return <LoginPage onLogin={(u) => { setUser(u); navigate('dashboard', { reset: true }); }} />;
  if (view === 'dashboard') return (
    <Dashboard user={user} archives={archives} events={events} orders={orders} 
      onLogout={() => navigate('login', { reset: true })}
      onNewArchive={() => { setActiveArchive(null); navigate('archiveEdit'); }}
      onEditArchive={(a: any) => { setActiveArchive(a); navigate('archiveEdit'); }}
      onNewOrder={(event: any) => {
        const shouldCreateNewEvent = terminalEventStatuses.includes(event.status);
        const eventId = shouldCreateNewEvent ? `e_${Date.now()}` : event.id;
        if (shouldCreateNewEvent) {
          setEvents([...events, { id: eventId, archiveId: event.archiveId, title: `${event.title}-新申请`, status: '待筛查' }]);
        }
        const newOrder = { id: 'order_' + Date.now().toString().slice(-6), eventId, status: 'step1' };
        setOrders([...orders, newOrder]);
        handleOrderAction(newOrder);
      }}
      onClickOrder={handleOrderAction}
    />
  );
  if (view === 'archiveEdit') return (
    <ArchiveEdit archive={activeArchive} onBack={() => goBack()} onSave={(a: any) => {
      const isNew = !activeArchive;
      setArchives(isNew ? [...archives, a] : archives.map(arch => arch.id === a.id ? a : arch));
      // Optionally auto-create an event if it's a new archive
      if (isNew) {
        setEvents([...events, { id: 'e_' + Date.now(), archiveId: a.id, title: '常规新生儿遗传病筛查', status: '待筛查' }]);
      }
      navigate('dashboard', { reset: true });
    }}/>
  );

  // Order Steps Routing
  const eventRef = activeOrder ? events.find(e => e.id === activeOrder.eventId) : null;
  const archiveRef = eventRef ? archives.find(a => a.id === eventRef.archiveId) : null;
  
  if (view === 'step1') return <OrderStep1 archive={archiveRef} orderData={activeOrder} onBack={() => goBack()} 
    onSaveDraft={(data: any) => updateOrder({...activeOrder, ...data, status: 'step1'}, 'dashboard')} 
    onNext={(data: any) => {
      setArchives(archives.map(a => a.id === archiveRef?.id ? { ...a, ...data } : a));
      updateOrder({...activeOrder, ...data, status: 'step2'}, 'step2');
    }}
  />;
  if (view === 'step2') return <OrderStep2 orderData={activeOrder} onBack={() => goBack()} 
    onSaveDraft={(data: any) => updateOrder({...activeOrder, ...data, status: 'step2'}, 'dashboard')}
    onNext={(data: any) => {
      const submitTime = nowText();
      updateOrder({
        ...activeOrder,
        ...data,
        submittedAt: submitTime,
        status: 'step3',
        history: [...(activeOrder?.history || []), { label: '订单提交/缴费完成', time: submitTime }, { label: '待采样', time: submitTime }]
      }, 'step3');
    }}
    onRefund={(data: any) => updateOrder(data, 'step2')}
  />;
  if (view === 'step3') return <OrderStep3 archive={archiveRef} orderData={activeOrder} onBack={() => goBack()} onComplete={(data: any) => updateOrder({...activeOrder, ...data, status: 'processing'}, 'processing')} />;
  
  // generic fallback for processing/completed
  if (view === 'processing' || view === 'completed' || view === 'recall_pending') {
    if (view === 'processing') return (
      <div className="min-h-screen bg-slate-50 flex flex-col pt-20 items-center px-4">
        <Loader2 size={64} className="text-blue-500 mb-4 animate-spin" />
        <h2 className="text-xl font-bold mb-6 text-slate-800">检测正在进行中</h2>
        <p className="text-slate-500 mb-8 text-center text-sm">实验室已接收样本，正在化验分析，请耐心等待。</p>
        <button onClick={() => navigate('dashboard', { reset: true })} className="px-8 py-3 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl shadow-sm">返回首页</button>
      </div>
    );

    return <ReportView order={activeOrder} event={eventRef} archive={archiveRef} onBack={() => goBack()} 
      onNewRetest={(eventId: string) => {
        const newOrder = { id: 'order_retest_' + Date.now().toString().slice(-6), eventId, status: 'step1' };
        setOrders(orders.map((o) => (o.id === activeOrder?.id ? { ...o, retestRequested: true } : o)).concat(newOrder));
        setActiveOrder({ ...activeOrder, retestRequested: true });
        handleOrderAction(newOrder);
      }}
      onRefund={(reason: string) => updateOrder({ ...activeOrder, refundInfo: { items: activeOrder?.testItems || [], amount: 280, reason, refundedAt: nowText() }, history: [...(activeOrder?.history || []), { label: '退费成功', time: nowText() }] }, view)}
    />;
  }

  return null;
}
