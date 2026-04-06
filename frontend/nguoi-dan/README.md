# Nguoi Dan Frontend (Next.js)

Giao dien frontend danh cho nguoi dan cua he thong PhuongXa.

Phan nay **khong bao gom giao dien admin**.

## Yeu cau

- Node.js 20+
- npm 10+

## Chay local

1. Cai dependencies:

```bash
npm install
```

2. Chay development server:

```bash
npm run dev
```

3. Mo trinh duyet tai dia chi:

```text
http://localhost:3000
```

## Scripts

- `npm run dev`: chay local
- `npm run build`: build production
- `npm run start`: chay ban build
- `npm run lint`: lint source

## Cau truc chinh

- `src/app/layout.tsx`: metadata va global layout
- `src/app/page.tsx`: trang chu portal nguoi dan
- `src/app/globals.css`: theme, animation va utility style
