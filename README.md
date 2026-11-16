# Hoàng Đinh Wine — Frontend

Website B2B của nhà phân phối rượu nhập khẩu Hoàng Đinh Wine (Khánh Hòa). Trang giới thiệu sản phẩm, danh sách báo giá, tạp chí và form liên hệ cho doanh nghiệp. Không bán hàng online, không hiển thị giá, không có tài khoản người dùng.

## Yêu cầu

- Node.js 18+
- npm (hoặc yarn)

## Biến môi trường

Sao chép `.env.example` thành `.env.local` và điền giá trị:

```
NEXT_PUBLIC_GOOGLE_ANALYTICS=
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_API_URL_SSR=
NEXT_PUBLIC_FILE_URL=
```

Backend chạy song song ở repository `../dh-wine-be`.

## Lệnh

```bash
# Cài đặt dependencies
npm install

# Chạy dev (http://localhost:3000)
npm run dev

# Build producción
npm run build

# Chạy production
npm start

# Lint
npm run lint
```

## Cấu trúc chính

- `src/app` — App Router (trang chủ, sản phẩm, báo giá, tin tức, liên hệ,…)
- `src/services` — gọi API (news, feedback, wine)
- `src/data` — dữ liệu mẫu sản phẩm/thương hiệu/giai pháp
- `src/contexts/QuoteContext.tsx` — danh sách báo giá (localStorage)
- `next.config.ts` — rewrite URL tiếng Việt
