const sleep = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms))

const makeId = () => {
  if (crypto?.randomUUID) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

const nowIso = () => new Date().toISOString()

const categories = [
  { id: 'cat-news-1', ten: 'Thong bao', loai: 0, thuTuSapXep: 1, dangHoatDong: true },
  { id: 'cat-news-2', ten: 'Van hoa - Xa hoi', loai: 0, thuTuSapXep: 2, dangHoatDong: true },
  { id: 'cat-news-3', ten: 'Kinh te', loai: 0, thuTuSapXep: 3, dangHoatDong: true },
  { id: 'cat-service-1', ten: 'Ho tich', loai: 1, thuTuSapXep: 1, dangHoatDong: true },
  { id: 'cat-service-2', ten: 'Dat dai', loai: 1, thuTuSapXep: 2, dangHoatDong: true },
  { id: 'cat-service-3', ten: 'Chung thuc', loai: 1, thuTuSapXep: 3, dangHoatDong: true },
]

const services = [
  {
    id: 'svc-001',
    ten: 'Cap ban sao giay khai sinh',
    maDichVu: 'DV-HT-001',
    moTa: 'Cap ban sao trich luc khai sinh cho cong dan.',
    giayToCanThiet: 'CCCD/CMND, to khai theo mau',
    soNgayXuLy: 2,
    lePhi: 8000,
    urlBieuMau: '',
    danhMucId: 'cat-service-1',
    tenDanhMuc: 'Ho tich',
    dangHoatDong: true,
    thuTuSapXep: 1,
    canCuPhapLy: 'Nghi dinh 23/2015/ND-CP',
    quyTrinh: 'Tiep nhan ho so, tham dinh, tra ket qua',
    ngayTao: nowIso(),
  },
  {
    id: 'svc-002',
    ten: 'Xac nhan tinh trang hon nhan',
    maDichVu: 'DV-HT-002',
    moTa: 'Cap giay xac nhan tinh trang hon nhan.',
    giayToCanThiet: 'CCCD/CMND, to khai, so ho khau',
    soNgayXuLy: 3,
    lePhi: 15000,
    urlBieuMau: '',
    danhMucId: 'cat-service-1',
    tenDanhMuc: 'Ho tich',
    dangHoatDong: true,
    thuTuSapXep: 2,
    canCuPhapLy: 'Luat Ho tich 2014',
    quyTrinh: 'Tiep nhan, doi chieu, xac nhan',
    ngayTao: nowIso(),
  },
  {
    id: 'svc-003',
    ten: 'Chung thuc ban sao tu ban chinh',
    maDichVu: 'DV-CT-001',
    moTa: 'Chung thuc ban sao giay to, van bang, chung chi.',
    giayToCanThiet: 'Ban chinh va ban sao giay to can chung thuc',
    soNgayXuLy: 1,
    lePhi: 5000,
    urlBieuMau: '',
    danhMucId: 'cat-service-3',
    tenDanhMuc: 'Chung thuc',
    dangHoatDong: true,
    thuTuSapXep: 3,
    canCuPhapLy: 'Thong tu 226/2016/TT-BTC',
    quyTrinh: 'Kiem tra ban chinh, dong dau chung thuc',
    ngayTao: nowIso(),
  },
]

const articles = [
  {
    id: 'art-001',
    tieuDe: 'Le ra quan tong ve sinh moi truong nam 2026',
    duongDan: 'le-ra-quan-tong-ve-sinh-moi-truong-2026',
    tomTat: 'Phuong to chuc ra quan tong ve sinh, phat dong thang hanh dong vi moi truong.',
    noiDung: '<p>Hoat dong duoc to chuc tai nha van hoa phuong voi su tham gia cua doan vien, thanh nien.</p>',
    anhDaiDien: '',
    tacGiaId: 'user-admin',
    tenTacGia: 'Admin Phuong',
    danhMucId: 'cat-news-2',
    tenDanhMuc: 'Van hoa - Xa hoi',
    trangThai: 2,
    ngayXuatBan: nowIso(),
    soLuotXem: 128,
    noiBat: true,
    tieuDeMeta: '',
    moTaMeta: '',
    theTag: 'moi-truong,cong-dong',
    ngayTao: nowIso(),
    ngayCapNhat: nowIso(),
  },
  {
    id: 'art-002',
    tieuDe: 'Thong bao tiep nhan ho so hanh chinh truc tuyen',
    duongDan: 'thong-bao-tiep-nhan-ho-so-hanh-chinh-truc-tuyen',
    tomTat: 'UBND phuong thong bao tiep nhan ho so qua cong dich vu cong truc tuyen.',
    noiDung: '<p>Nguoi dan co the nop ho so truc tuyen tren cong thong tin cua phuong.</p>',
    anhDaiDien: '',
    tacGiaId: 'user-editor',
    tenTacGia: 'Editor Van phong',
    danhMucId: 'cat-news-1',
    tenDanhMuc: 'Thong bao',
    trangThai: 2,
    ngayXuatBan: nowIso(),
    soLuotXem: 84,
    noiBat: false,
    tieuDeMeta: '',
    moTaMeta: '',
    theTag: 'hanh-chinh,dich-vu-cong',
    ngayTao: nowIso(),
    ngayCapNhat: nowIso(),
  },
  {
    id: 'art-003',
    tieuDe: 'Ke hoach phat trien kinh te phuong nam 2026',
    duongDan: 'ke-hoach-phat-trien-kinh-te-phuong-2026',
    tomTat: 'Cong bo cac chi tieu va giai phap phat trien kinh te dia phuong.',
    noiDung: '<p>Noi dung ke hoach tap trung vao thuong mai, dich vu va chuyen doi so.</p>',
    anhDaiDien: '',
    tacGiaId: 'user-editor',
    tenTacGia: 'Editor Kinh te',
    danhMucId: 'cat-news-3',
    tenDanhMuc: 'Kinh te',
    trangThai: 1,
    ngayXuatBan: null,
    soLuotXem: 0,
    noiBat: false,
    tieuDeMeta: '',
    moTaMeta: '',
    theTag: 'kinh-te,ke-hoach',
    ngayTao: nowIso(),
    ngayCapNhat: nowIso(),
  },
]

const comments = [
  {
    id: 'cmt-001',
    baiVietId: 'art-001',
    tenTacGia: 'Nguyen Van A',
    emailTacGia: 'a@example.com',
    noiDung: 'Hoat dong rat y nghia, de nghi to chuc thuong xuyen.',
    daDuyet: true,
    chaId: null,
    ngayTao: nowIso(),
    danhSachTraLoi: [],
    tenBaiViet: 'Le ra quan tong ve sinh moi truong nam 2026',
  },
  {
    id: 'cmt-002',
    baiVietId: 'art-002',
    tenTacGia: 'Tran Thi B',
    emailTacGia: 'b@example.com',
    noiDung: 'Mong co them huong dan cu the cho nguoi cao tuoi.',
    daDuyet: false,
    chaId: null,
    ngayTao: nowIso(),
    danhSachTraLoi: [],
    tenBaiViet: 'Thong bao tiep nhan ho so hanh chinh truc tuyen',
  },
]

const applications = [
  {
    id: 'app-001',
    maTheoDoi: 'HS20260323A1B2C3D4',
    dichVuId: 'svc-001',
    tenDichVu: 'Cap ban sao giay khai sinh',
    tenNguoiNop: 'Le Minh C',
    emailNguoiNop: 'c@example.com',
    dienThoaiNguoiNop: '0900000001',
    diaChiNguoiNop: 'Phuong Trung Tam',
    ghiChu: 'Can lay ket qua som',
    trangThai: 1,
    ngayNop: nowIso(),
    ngayXuLy: nowIso(),
    ghiChuNguoiXuLy: 'Dang xu ly ho so',
    danhSachTep: [],
  },
]

const authUser = {
  id: 'user-admin',
  hoTen: 'Admin Phuong',
  email: 'admin@phuongxa.local',
  anhDaiDien: null,
  danhSachVaiTro: ['Admin', 'Editor'],
}

const toBoolean = (value) => {
  if (value === true || value === false) return value
  if (value === 'true') return true
  if (value === 'false') return false
  return undefined
}

const paginate = (arr, page = 1, size = 10) => {
  const trang = Math.max(1, Number(page) || 1)
  const kichThuocTrang = Math.max(1, Number(size) || 10)
  const tongSo = arr.length
  const tongTrang = Math.max(1, Math.ceil(tongSo / kichThuocTrang))
  const start = (trang - 1) * kichThuocTrang
  const danhSach = arr.slice(start, start + kichThuocTrang)
  return { danhSach, tongSo, trang, kichThuocTrang, tongTrang }
}

const success = (duLieu, thongDiep = 'Thanh cong') => ({
  thanhCong: true,
  thongDiep,
  duLieu,
  loiDanhSach: null,
})

const fail = (thongDiep = 'That bai') => ({
  thanhCong: false,
  thongDiep,
  duLieu: null,
  loiDanhSach: [thongDiep],
})

const response = (config, status, data) => ({
  data,
  status,
  statusText: status >= 200 && status < 300 ? 'OK' : 'Error',
  headers: {},
  config,
  request: {},
})

const rejectResponse = (config, status, data) =>
  Promise.reject({
    message: data?.thongDiep ?? 'Request failed',
    response: response(config, status, data),
    config,
  })

const getUrlPath = (config) => {
  const rawUrl = config?.url ?? ''
  const clean = rawUrl.split('?')[0]
  return clean.startsWith('http') ? new URL(clean).pathname : clean
}

const match = (path, regexp) => {
  const result = path.match(regexp)
  return result
}

export async function mockApiAdapter(config) {
  await sleep(220)

  const method = (config.method ?? 'get').toLowerCase()
  const path = getUrlPath(config)
  const params = config.params ?? {}
  const body = typeof config.data === 'string' ? JSON.parse(config.data || '{}') : config.data ?? {}

  if (method === 'post' && path === '/api/auth/login') {
    if (!body.email || !body.matKhau) {
      return rejectResponse(config, 400, fail('Email hoac mat khau khong hop le'))
    }
    return response(
      config,
      200,
      success({
        maTruyCap: `mock-token-${Date.now()}`,
        hetHanLuc: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
        nguoiDung: authUser,
      }, 'Dang nhap thanh cong'),
    )
  }

  if (method === 'get' && path === '/api/auth/me') {
    return response(config, 200, success(authUser))
  }

  if (method === 'post' && path === '/api/auth/refresh') {
    return response(config, 200, success({ maTruyCap: `mock-token-${Date.now()}` }))
  }

  if (method === 'post' && path === '/api/auth/logout') {
    return response(config, 200, success(null, 'Dang xuat thanh cong'))
  }

  if (method === 'get' && path === '/api/categories') {
    const loai = params.loai !== undefined ? Number(params.loai) : undefined
    const filtered = categories.filter((item) => item.dangHoatDong && (loai === undefined ? true : item.loai === loai))
    return response(config, 200, success(filtered))
  }

  if (method === 'get' && path === '/api/services') {
    let filtered = [...services]
    if (params.timKiem) {
      const keyword = String(params.timKiem).toLowerCase()
      filtered = filtered.filter((item) => item.ten.toLowerCase().includes(keyword) || item.maDichVu.toLowerCase().includes(keyword))
    }
    if (params.danhMucId) {
      filtered = filtered.filter((item) => item.danhMucId === params.danhMucId)
    }
    filtered.sort((a, b) => a.thuTuSapXep - b.thuTuSapXep)
    return response(config, 200, success(paginate(filtered, params.trang, params.kichThuocTrang)))
  }

  const serviceByIdMatch = match(path, /^\/api\/services\/([^/]+)$/)
  if (method === 'get' && serviceByIdMatch) {
    const item = services.find((x) => x.id === serviceByIdMatch[1])
    if (!item) return rejectResponse(config, 404, fail('Khong tim thay dich vu'))
    return response(config, 200, success(item))
  }

  if (method === 'get' && path === '/api/services/admin') {
    let filtered = [...services]
    if (params.timKiem) {
      const keyword = String(params.timKiem).toLowerCase()
      filtered = filtered.filter((item) => item.ten.toLowerCase().includes(keyword) || item.maDichVu.toLowerCase().includes(keyword))
    }
    if (params.danhMucId) {
      filtered = filtered.filter((item) => item.danhMucId === params.danhMucId)
    }
    const activeFilter = toBoolean(params.dangHoatDong)
    if (activeFilter !== undefined) {
      filtered = filtered.filter((item) => item.dangHoatDong === activeFilter)
    }
    return response(config, 200, success(paginate(filtered, params.trang, params.kichThuocTrang)))
  }

  if (method === 'get' && path === '/api/articles') {
    let filtered = articles.filter((item) => item.trangThai === 2)
    if (params.timKiem) {
      const keyword = String(params.timKiem).toLowerCase()
      filtered = filtered.filter(
        (item) =>
          item.tieuDe.toLowerCase().includes(keyword) ||
          (item.tomTat || '').toLowerCase().includes(keyword) ||
          (item.theTag || '').toLowerCase().includes(keyword),
      )
    }
    if (params.danhMucId) {
      filtered = filtered.filter((item) => item.danhMucId === params.danhMucId)
    }
    const featured = toBoolean(params.noiBat)
    if (featured !== undefined) {
      filtered = filtered.filter((item) => item.noiBat === featured)
    }
    return response(config, 200, success(paginate(filtered, params.trang, params.kichThuocTrang)))
  }

  if (method === 'get' && path === '/api/articles/admin') {
    let filtered = [...articles]
    if (params.timKiem) {
      const keyword = String(params.timKiem).toLowerCase()
      filtered = filtered.filter((item) => item.tieuDe.toLowerCase().includes(keyword))
    }
    if (params.danhMucId) {
      filtered = filtered.filter((item) => item.danhMucId === params.danhMucId)
    }
    if (params.trangThai !== undefined && params.trangThai !== '') {
      filtered = filtered.filter((item) => item.trangThai === Number(params.trangThai))
    }
    return response(config, 200, success(paginate(filtered, params.trang, params.kichThuocTrang)))
  }

  const articleDetailMatch = match(path, /^\/api\/articles\/([^/]+)\/detail$/)
  if (method === 'get' && articleDetailMatch) {
    const item = articles.find((x) => x.id === articleDetailMatch[1])
    if (!item) return rejectResponse(config, 404, fail('Khong tim thay bai viet'))
    return response(config, 200, success(item))
  }

  if (method === 'post' && path === '/api/articles') {
    const category = categories.find((x) => x.id === body.danhMucId)
    if (!category) return rejectResponse(config, 400, fail('Danh muc khong ton tai'))

    const id = makeId()
    const slug = (body.tieuDe || 'bai-viet-moi').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
    const item = {
      id,
      tieuDe: body.tieuDe,
      duongDan: `${slug}-${Date.now().toString().slice(-4)}`,
      tomTat: body.tomTat || '',
      noiDung: body.noiDung || '',
      anhDaiDien: body.anhDaiDien || '',
      tacGiaId: authUser.id,
      tenTacGia: authUser.hoTen,
      danhMucId: body.danhMucId,
      tenDanhMuc: category.ten,
      trangThai: Number(body.trangThai ?? 0),
      ngayXuatBan: Number(body.trangThai) === 2 ? nowIso() : null,
      soLuotXem: 0,
      noiBat: Boolean(body.noiBat),
      tieuDeMeta: body.tieuDeMeta || '',
      moTaMeta: body.moTaMeta || '',
      theTag: body.theTag || '',
      ngayTao: nowIso(),
      ngayCapNhat: nowIso(),
    }
    articles.unshift(item)
    return response(config, 201, success({ id: item.id }, 'Tao bai viet thanh cong'))
  }

  const articleByIdMatch = match(path, /^\/api\/articles\/([^/]+)$/)
  if (method === 'put' && articleByIdMatch) {
    const id = articleByIdMatch[1]
    const item = articles.find((x) => x.id === id)
    if (!item) return rejectResponse(config, 404, fail('Khong tim thay bai viet'))
    const category = categories.find((x) => x.id === body.danhMucId)
    item.tieuDe = body.tieuDe
    item.tomTat = body.tomTat || ''
    item.noiDung = body.noiDung || ''
    item.anhDaiDien = body.anhDaiDien || ''
    item.danhMucId = body.danhMucId
    item.tenDanhMuc = category?.ten || item.tenDanhMuc
    item.trangThai = Number(body.trangThai ?? item.trangThai)
    item.noiBat = Boolean(body.noiBat)
    item.tieuDeMeta = body.tieuDeMeta || ''
    item.moTaMeta = body.moTaMeta || ''
    item.theTag = body.theTag || ''
    item.ngayCapNhat = nowIso()
    if (item.trangThai === 2 && !item.ngayXuatBan) item.ngayXuatBan = nowIso()
    return response(config, 200, success(null, 'Cap nhat bai viet thanh cong'))
  }

  if (method === 'delete' && articleByIdMatch) {
    const id = articleByIdMatch[1]
    const index = articles.findIndex((x) => x.id === id)
    if (index === -1) return rejectResponse(config, 404, fail('Khong tim thay bai viet'))
    articles.splice(index, 1)
    return response(config, 200, success(null, 'Xoa bai viet thanh cong'))
  }

  const publishArticleMatch = match(path, /^\/api\/articles\/([^/]+)\/publish$/)
  if (method === 'patch' && publishArticleMatch) {
    const item = articles.find((x) => x.id === publishArticleMatch[1])
    if (!item) return rejectResponse(config, 404, fail('Khong tim thay bai viet'))
    item.trangThai = 2
    item.ngayXuatBan = item.ngayXuatBan || nowIso()
    item.ngayCapNhat = nowIso()
    return response(config, 200, success(null, 'Xuat ban bai viet thanh cong'))
  }

  const articleBySlugMatch = match(path, /^\/api\/articles\/([^/]+)$/)
  if (method === 'get' && articleBySlugMatch) {
    const item = articles.find((x) => x.duongDan === articleBySlugMatch[1] || x.id === articleBySlugMatch[1])
    if (!item) return rejectResponse(config, 404, fail('Khong tim thay bai viet'))
    item.soLuotXem += 1
    return response(config, 200, success(item))
  }

  const relatedMatch = match(path, /^\/api\/articles\/([^/]+)\/related$/)
  if (method === 'get' && relatedMatch) {
    const slug = relatedMatch[1]
    const source = articles.find((x) => x.duongDan === slug)
    if (!source) return response(config, 200, success([]))
    const list = articles
      .filter((x) => x.id !== source.id && x.trangThai === 2 && x.danhMucId === source.danhMucId)
      .slice(0, Number(params.gioiHan) || 4)
    return response(config, 200, success(list))
  }

  if (method === 'get' && path === '/api/articles/popular') {
    const limit = Number(params.gioiHan) || 5
    const list = [...articles]
      .filter((x) => x.trangThai === 2)
      .sort((a, b) => b.soLuotXem - a.soLuotXem)
      .slice(0, limit)
    return response(config, 200, success(list))
  }

  if (method === 'get' && path === '/api/comments') {
    const list = comments.filter((x) => x.baiVietId === params.baiVietId && x.daDuyet && !x.chaId)
    return response(config, 200, success(paginate(list, params.trang, params.kichThuocTrang)))
  }

  if (method === 'get' && path === '/api/comments/admin') {
    let list = [...comments]
    const daDuyet = toBoolean(params.daDuyet)
    if (daDuyet !== undefined) list = list.filter((x) => x.daDuyet === daDuyet)
    return response(config, 200, success(paginate(list, params.trang, params.kichThuocTrang)))
  }

  if (method === 'post' && path === '/api/comments') {
    const article = articles.find((x) => x.id === body.baiVietId)
    if (!article) return rejectResponse(config, 404, fail('Bai viet khong ton tai'))
    const item = {
      id: makeId(),
      baiVietId: body.baiVietId,
      tenTacGia: body.tenKhach || 'Khach',
      emailTacGia: body.emailKhach || '',
      noiDung: body.noiDung,
      daDuyet: false,
      chaId: body.chaId || null,
      ngayTao: nowIso(),
      danhSachTraLoi: [],
      tenBaiViet: article.tieuDe,
    }
    comments.unshift(item)
    return response(config, 200, success(null, 'Binh luan da duoc gui'))
  }

  const commentApproveMatch = match(path, /^\/api\/comments\/([^/]+)\/approve$/)
  if (method === 'patch' && commentApproveMatch) {
    const item = comments.find((x) => x.id === commentApproveMatch[1])
    if (!item) return rejectResponse(config, 404, fail('Khong tim thay binh luan'))
    item.daDuyet = true
    return response(config, 200, success(null, 'Duyet binh luan thanh cong'))
  }

  const commentDeleteMatch = match(path, /^\/api\/comments\/([^/]+)$/)
  if (method === 'delete' && commentDeleteMatch) {
    const index = comments.findIndex((x) => x.id === commentDeleteMatch[1])
    if (index === -1) return rejectResponse(config, 404, fail('Khong tim thay binh luan'))
    comments.splice(index, 1)
    return response(config, 200, success(null, 'Xoa binh luan thanh cong'))
  }

  if (method === 'post' && path === '/api/applications/submit') {
    const svc = services.find((x) => x.id === body.dichVuId)
    if (!svc) return rejectResponse(config, 400, fail('Dich vu khong ton tai'))
    const maTheoDoi = `HS${new Date().toISOString().slice(0, 10).replace(/-/g, '')}${Math.random().toString(16).slice(2, 10).toUpperCase()}`
    const item = {
      id: makeId(),
      maTheoDoi,
      dichVuId: body.dichVuId,
      tenDichVu: svc.ten,
      tenNguoiNop: body.tenNguoiNop,
      emailNguoiNop: body.emailNguoiNop,
      dienThoaiNguoiNop: body.dienThoaiNguoiNop,
      diaChiNguoiNop: body.diaChiNguoiNop || '',
      ghiChu: body.ghiChu || '',
      trangThai: 0,
      ngayNop: nowIso(),
      ngayXuLy: null,
      ghiChuNguoiXuLy: '',
      danhSachTep: [],
    }
    applications.unshift(item)
    return response(config, 200, success({ id: item.id, maTheoDoi: item.maTheoDoi }, 'Nop don thanh cong'))
  }

  const trackMatch = match(path, /^\/api\/applications\/track\/([^/]+)$/)
  if (method === 'get' && trackMatch) {
    const maTheoDoi = trackMatch[1]
    const email = String(params.emailNguoiNop || '').toLowerCase()
    const item = applications.find((x) => x.maTheoDoi === maTheoDoi && x.emailNguoiNop.toLowerCase() === email)
    if (!item) return rejectResponse(config, 404, fail('Khong tim thay don ung hoac thong tin khong khop'))
    return response(config, 200, success(item))
  }

  if (method === 'get' && path === '/api/applications') {
    let list = [...applications]
    if (params.trangThai !== undefined && params.trangThai !== '') {
      list = list.filter((x) => x.trangThai === Number(params.trangThai))
    }
    if (params.dichVuId) {
      list = list.filter((x) => x.dichVuId === params.dichVuId)
    }
    if (params.timKiem) {
      const keyword = String(params.timKiem).toLowerCase()
      list = list.filter(
        (x) =>
          x.maTheoDoi.toLowerCase().includes(keyword) ||
          x.tenNguoiNop.toLowerCase().includes(keyword) ||
          x.dienThoaiNguoiNop.toLowerCase().includes(keyword),
      )
    }
    return response(config, 200, success(paginate(list, params.trang, params.kichThuocTrang)))
  }

  const appStatusMatch = match(path, /^\/api\/applications\/([^/]+)\/status$/)
  if (method === 'patch' && appStatusMatch) {
    const item = applications.find((x) => x.id === appStatusMatch[1])
    if (!item) return rejectResponse(config, 404, fail('Khong tim thay ho so'))
    item.trangThai = Number(body.trangThai)
    item.ghiChuNguoiXuLy = body.ghiChuNguoiXuLy || ''
    item.ngayXuLy = nowIso()
    return response(config, 200, success(null, 'Cap nhat trang thai thanh cong'))
  }

  if (method === 'get' && path === '/api/search') {
    const keyword = String(params.tuKhoa || '').toLowerCase().trim()
    if (!keyword || keyword.length < 2) {
      return rejectResponse(config, 400, fail('Tu khoa tim kiem phai co it nhat 2 ky tu'))
    }
    const baiViet = articles.filter((x) => x.tieuDe.toLowerCase().includes(keyword) || (x.tomTat || '').toLowerCase().includes(keyword))
    const dichVu = services.filter((x) => x.ten.toLowerCase().includes(keyword) || x.maDichVu.toLowerCase().includes(keyword))
    return response(config, 200, success({ baiViet, dichVu }))
  }

  return rejectResponse(config, 404, fail(`Mock API chua ho tro endpoint: ${method.toUpperCase()} ${path}`))
}
