# Nim-Room-Hwang
<br>

## 패키지 관련 정책
repo를 전반적으로 관리하고, 각종 cli script를 사용하는건 lerna를 이용합니다. \
패키지 관리자로는 yarn을 사용합니다.
<br><br>

## 처음 세팅할 때
node 설치 후 yarn을 설치하고, yarn으로 모든 dependencies를 다운 받습니다.
```
npm i -g yarn
yarn install
```
<br>

## 패키지를 다운로드할때
1. 특정 패키지에 외부 라이브러리 설치
```
yarn workspace [my-package] add [package] --<options>
```
2. 특정 패키지에 외부 라이브러리 제거
```
yarn workspace [my-package] remove [package] --<options>
```
3. 루트에 외부 라이브러리 설치
```
yarn add [package] -W
```
