### Next_Shop_app

> Next.js 와 Firebase 기반의 회원 인증, 어드민 페이지 (상품 추가/수정/삭제), 상품 결제 모듈이 포함된 serverless 쇼핑몰 웹앱

Next.js Serverless App 구축 실습

## 사용 스택

<img src="https://img.shields.io/badge/Next.JS-000000?style=for-the-badge&logo=Next.js&logoColor=white">

<img src="https://img.shields.io/badge/Recoil-3677E5?style=for-the-badge&logo=recoil&logoColor=white">

<img src="https://img.shields.io/badge/React_Hook_Form-EC5A90?style=for-the-badge&logo=react_hook_form&logoColor=white">

<img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white">

<img src="https://img.shields.io/badge/Iamport-008EF7?style=for-the-badge&logo=iamport&logoColor=white">

## 폴더 구조

```
📦 
├─ .babelrc
├─ .env.development
├─ .env.production
├─ .eslintrc.json
├─ .gitignore
├─ .prettierrc.json
├─ Layouts
│  ├─ Footer
│  │  └─ index.tsx
│  ├─ Header
│  │  └─ index.tsx
│  ├─ Home
│  │  └─ index.tsx
│  └─ index.tsx
├─ README.md
├─ components
│  ├─ Auth
│  │  ├─ AuthAdress.tsx
│  │  ├─ AuthContainer.tsx
│  │  └─ AuthForm.tsx
│  ├─ Category
│  │  ├─ CategoryItem.tsx
│  │  ├─ CategoryList.tsx
│  │  └─ index.tsx
│  ├─ Common
│  │  ├─ DarkToggle.tsx
│  │  ├─ Modal
│  │  │  ├─ index.tsx
│  │  │  └─ styles.tsx
│  │  ├─ NavBar
│  │  │  └─ index.tsx
│  │  ├─ Skeleton.tsx
│  │  └─ Thumbnail
│  │     ├─ ThumbnailItem.tsx
│  │     └─ index.tsx
│  ├─ Home
│  │  ├─ HomeItem.tsx
│  │  └─ HomeList.tsx
│  ├─ Main
│  │  ├─ TimeBoard.tsx
│  │  ├─ TimeBoardSwiper.tsx
│  │  └─ index.tsx
│  ├─ Payment
│  │  └─ Cart
│  │     ├─ CartContainer.tsx
│  │     ├─ CartItem.tsx
│  │     ├─ CartList.tsx
│  │     ├─ CartPayment.tsx
│  │     └─ CartRedirect.tsx
│  ├─ Products
│  │  ├─ ProductButton.tsx
│  │  ├─ ProductInfo.tsx
│  │  ├─ ProductPrice.tsx
│  │  ├─ ProductsDelivery.tsx
│  │  ├─ ProductsForm.tsx
│  │  ├─ ProductsOption.tsx
│  │  ├─ ProductsSize.tsx
│  │  └─ index.tsx
│  ├─ Profile
│  │  ├─ ProfilePaymentsItem.tsx
│  │  └─ ProfileUserForm.tsx
│  ├─ WishList
│  │  ├─ WishListProduct.tsx
│  │  └─ WishListProductItem.tsx
│  └─ admin
│     ├─ AdminNoContents.tsx
│     ├─ Edit
│     │  ├─ EditProductItem.tsx
│     │  └─ EditProductList.tsx
│     ├─ NavBar.tsx
│     └─ Register
│        ├─ RegisterDelivery.tsx
│        ├─ RegisterField.tsx
│        ├─ RegisterForm.tsx
│        ├─ RegisterLoading.tsx
│        └─ ThumbInput.tsx
├─ hooks
│  ├─ useCategory.tsx
│  ├─ useEventListener.ts
│  ├─ useInfiniteScroll.tsx
│  ├─ useIsomorphicLayoutEffect.ts
│  ├─ useLocalStorage.ts
│  ├─ usePathSplit.ts
│  ├─ useQueryParser.ts
│  ├─ useReadLocalStorage.ts
│  └─ useUser.ts
├─ next-env.d.ts
├─ next-sitemap.js
├─ next.config.js
├─ package-lock.json
├─ package.json
├─ pages
│  ├─ _app.tsx
│  ├─ _document.tsx
│  ├─ admin
│  │  ├─ dashboard.tsx
│  │  ├─ edit.tsx
│  │  ├─ receipt.tsx
│  │  └─ register.tsx
│  ├─ api
│  │  ├─ cart
│  │  │  ├─ [id].ts
│  │  │  ├─ create.ts
│  │  │  ├─ remove.ts
│  │  │  └─ removeAll.ts
│  │  ├─ cors.ts
│  │  ├─ delete.ts
│  │  ├─ edit.ts
│  │  ├─ hello.ts
│  │  ├─ home
│  │  │  └─ read.ts
│  │  ├─ join.ts
│  │  ├─ login.ts
│  │  ├─ logout.ts
│  │  ├─ payment
│  │  │  ├─ [id].ts
│  │  │  ├─ pay.ts
│  │  │  ├─ read.ts
│  │  │  ├─ refund.ts
│  │  │  └─ update.ts
│  │  ├─ products
│  │  │  ├─ edit.ts
│  │  │  ├─ product.ts
│  │  │  └─ read.ts
│  │  ├─ remind.ts
│  │  ├─ user.ts
│  │  └─ verify.ts
│  ├─ auth
│  │  ├─ login.tsx
│  │  └─ process
│  │     ├─ join.tsx
│  │     ├─ remind.tsx
│  │     └─ verify.tsx
│  ├─ category
│  │  └─ [category].tsx
│  ├─ index.tsx
│  ├─ payment
│  │  ├─ [id].tsx
│  │  └─ complete.tsx
│  ├─ products
│  │  └─ [...slug].tsx
│  ├─ profile
│  │  ├─ [id].tsx
│  │  └─ payments.tsx
│  └─ wishlist.tsx
├─ public
│  ├─ favicon.ico
│  ├─ images
│  │  └─ shop.png
│  ├─ robots.txt
│  ├─ sitemap-0.xml
│  ├─ sitemap.xml
│  └─ vercel.svg
├─ tsconfig.json
├─ types
│  ├─ auth.type.ts
│  ├─ cart.type.ts
│  ├─ pay.type.ts
│  └─ product.type.ts
└─ utils
   ├─ firebase
   │  └─ clientApp.ts
   ├─ iron
   │  └─ session.ts
   ├─ lib
   │  ├─ convertDate.ts
   │  ├─ fetchJson.ts
   │  └─ navLink.tsx
   └─ styles
      ├─ GlobalStyles.tsx
      ├─ Responsive.tsx
      └─ Theme.ts
```

## Install

```
npm i
```

## 구현 기능

#### ✔Main

![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/66871265/191629817-0585de5c-d75f-4bb4-b72a-3598546fc413.gif)

##### 1. DarkMode Toggle

토글 버튼을 사용하여 다크 모드와 라이트 모드 선택

##### 2. Recommend Products

Firebase의 DB를 사용하여, 제일 많이 팔리 상품과 신제품 순으로 추천 리스트 제공

#### ✔Payment

![ezgif com-gif-maker (3)](https://user-images.githubusercontent.com/66871265/191629918-f93576e5-1d51-4986-8e89-cd90dae92f3f.gif)

##### 1. Import Payment

IAMPORT 모듈이 클라이언트 환경에서 밖에 제공이 안되어 CSR 환경의 결제 시스템 제공

#### ✔Auth

##### 1. Firebase Authentication

로컬 로그인/회원가입과 비밀번호 찾기와 이메일 인증

#### ✔Admin

![ezgif com-gif-maker (4)](https://user-images.githubusercontent.com/66871265/191629950-ff55814b-763c-493b-807b-452efaa381ab.gif)

##### 1. Dashboard

어드민에게만 접근 가능한 페이지, 상품 관리를 위한 페이지와 상품 등록 페이지

## Etc

#### 배포

Vercel을 통해 호스팅과 동시에 Google 도메인과 연결하여 사용하고, Google Analytics를 사용해 사이트 분석

SEO 최적화를 위해 robots.txt, sitemap등을 네이버, 구글 서치 콘솔에 제출

#### 아쉬웠던 점

자율주제 프로젝트였지만, 과제에서 요구하는 스펙에 비해 과도한 기능을 넣었다.. 이로인해 생각해볼 점이 많아 디테일을 신경 쓰지 못했다..

예를 들어 상품 등록을 하고 매번 빌드를 다시 해줘서 SSG를 통해 상품을 갱신해줘야한다. 
이건 ISR로 바꿔 강화할 예정

또 실수를 한 점은 생각치도 못하게 비밀번호 변경 기능을 누구나 다 이메일만 알고 있다면 변경이 가능하도록 한 것..
이건 추가적인 회원 정보를 요구하여 인증 과정을 추가하여 강화를 해야될 것 같다