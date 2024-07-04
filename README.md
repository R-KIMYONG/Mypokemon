<h1>🦄 포켓몬 리스트</h1>

포켓몬의 세부 사항(키, 몸무게, 특성, 타입, 스킬)을 리스트에서 선택하면 자세히 확인할 수 있으며, 페이지 아래로 스크롤하면 무한 스크롤 기능이 제공됩니다. 또한, 고해상도의 선명한 포켓몬 이미지가 보여집니다.

- 배포URL : https://mypokemon-two.vercel.app/
---

## 📜 프로젝트 소개

    
### 사용자 친화적인 큼지막한 UI

- 처음 사용하시는 분들도 쉽게 적응할 수 있도록 직관적이고 시각적으로 편안한 UI를 제공합니다. 큰 버튼과 명확한 아이콘을 사용하여 사용자 경험을 극대화했습니다.


---
<br>

## 📅 개발기간
- 2024.07.02 ~ 2024.07.04

---

<br>

## 🛠️ 기술스택

<br>

<div align='center'>
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white">
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white">
<img src="https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">
<img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
<img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
<img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">
<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white">
<img src="https://img.shields.io/badge/visualstudiocode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white">
</div>

<br>



## ⚙️ 채택한 개발 기술

- **Front-end**: React, tailwind css,React-modal, React-toastify,sweetAlert2
- **Back-end**: Next.js
- **버전 및 이슈 관리**: Github
- **서비스 배포 환경**: Vercel
- [**커밋 컨벤션**](https://teamsparta.notion.site/Github-Rules-6137abb51c654d679a897c4e395cfdb8)을 참고하세요.

----
<br>

## 🪜 프로젝트 구조

```
project-root/
├── README.md
├── package.json
├── .gitignore
├── public/
│   ├── images
│   └── pokemon.ico
├── src/
|   ├── app/
|   |   ├── _components
│   │   ├── api
│   │   └── pokemon/[id]
│   ├── error.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   ├── page.tsx
│   ├── provider.tsx
│   ├── components/
│   │   └── Backbutton.tsx
│   ├── services/
│   │   ├── pokemonApi.ts
│   │   └── pokemonDetailApi.ts
│   ├── types/
│   │   └── pokemon.type.ts
└── .env.local
```

## 📔 기능 소개

**무한 스크롤**: 무한 스크롤 기능은 사용자가 스크롤을 아래로 내릴 때 추가적인 콘텐츠를 자동으로 로드하여 페이지를 계속 확장시키는 기술입니다. 이를 통해 사용자는 페이지 하단에 도달하기 전에도 연속적으로 콘텐츠를 탐색할 수 있어 사용성이 향상됩니다.


## 🔧 트러블슈팅
### 1. 무한 스크롤 기능
#### **오류**: 페이지의 최하단으로 스크롤할 때 설정된 데이터 수를 로드하지 않고 전체 데이터를 다시 불러오는 현상 발생.
#### **조치**: 데이터를 호출하는 로직을 수정하여 한 번에 받아오는 데이터의 양을 조정하였습니다.
### 2. 포켓몬 이미지 로드 오류
#### **오류**: 데이터 호출 후 일부 포켓몬 이미지가 UI에 표시되지 않는 문제 발생.
#### **조치**: 데이터 호출 시에 사용하는 axios와 fetch 방식의 불일치로 인해 발생한 문제를 해결하기 위해 모든 데이터 호출을 axios로 통일하였습니다.
### 3. 배포 시 404 오류 발생
#### **오류**: vercel로 배포 후 페이지에 접속 시 404 오류가 발생.
#### **조치**: 환경 변수 설정 중 로컬 환경 변수 경로 누락으로 인해 페이지가 정상적으로 로드되지 않는 문제를 수정하였습니다.
