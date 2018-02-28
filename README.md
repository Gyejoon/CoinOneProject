# CoinOneProject

## 프로그램의 목적

국내 암호화폐 거래소의 시세와 외국 암호화폐 거래소의 시세 차익을
보여주는 웹 사이트 입니다.
그리고 임시로 발급받은 API키를 이용하여 코인원 계정의
내 정보를 조회할 수 있도록 구현하였습니다.

## 프로그램의 설명

Node.js를 활용하여 javascript로 프론트와 백엔드를 구성할 수 있다는 장점을 살리고 Node.js의 request모듈을 활용하여
코인원,폴로닉스,환율등의 API를 호출하여 가공한뒤 좀더 편하고 손쉽게 구현할 수 있는 방안을
모색하여 개발하였습니다.

### 프로그램의 개발 환경

  - Backend: Node.js + express
  - Frontend: html5, css3, javascript, bootstrap, jquery
  - IDE: Atom

### 프로그램의 기능

  - 코인원 암호화폐 시세 조회
    - public api인 ticker를 활용하였습니다.
  - Poloniex 암호화폐 시세 조회
    - public api인 ticker를 활용하였습니다.
  - 코인원과 Poloniex 시세의 차익 조회(%비율)
    - 환율 API를 활용하였습니다.
    - 코인원 시세와 poloniex의 달러원화의 차를 이용하였습니다.
  - 전일 대비 시세 조회(%비율)
    - yesterdaylast값과 현재 값인 last값의 차를 이용하였습니다.
  - 내 정보(코인원) 조회 기능
    - 임시로 발급받은 API키를 이용하였습니다.
    - 보안 레벨
    - 통장 번호 : 인증 상태이어야만 조회가능
    - 이메일 주소 : 인증 상태이어야만 조회가능
    - 휴대폰 번호 : 인증 상태이어야만 조회가능


### 프로그램 이미지

![메인화면](./public/images/main.png)
코인원 프로젝트의 메인화면 입니다. 시세차익, 전일대비, 거래량은 코인원 거래소를 기준으로
하여 계산하였습니다.
![설정적용화면](./public/images/config.png)
적용코인은 체크박스를 선택하고 적용 버튼을 누르면 적용이 되는 방식으로 체크박스를 비워두면
그 코인은 리스트에 출력이 되지 않습니다.
갱신시간은 5초 10초 30초 60초 총 4개로 구성하였습니다.
![API로그인화면](./public/images/login.png)
AccessToken값과 SecretKey값을 입력할 수 있는 로그인 화면입니다.
![내정보조회화면](./public/images/info.png)
정상적으로 인증이 완료되면 위와 같이 내정보를 조회할 수 있습니다.
